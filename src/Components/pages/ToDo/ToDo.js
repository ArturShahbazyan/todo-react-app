import React, {Component} from 'react';
import Task from '../../Task/Task';
import {Row, Container, Col, Button} from 'react-bootstrap';
import Confirm from '../../Modals/Confirm/Confirm';
import ActionsModal from "../../Modals/ActionsModal/ActionsModal";
import dateFormatter from '../../../helpers/date';
import Preloader from "../../Preloader/Preloader";
import {connect} from "react-redux";
import actionTypes from "../../../redux/actionTypes";


class ToDo extends Component {

    handleAdd = (taskData) => {
        if (!taskData.title || !taskData.description) return;

        const {loading, toggleAddModal, isAdd, addTask} = this.props;

        taskData.date = dateFormatter(taskData.date);

        loading(true);

        fetch("http://localhost:3001/task", {
            method: "POST",
            body: JSON.stringify(taskData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) throw data.error;
                addTask(data);
                isAdd && toggleAddModal();
            })
            .catch(err => console.error("Create Task Request Error::", err))
            .finally(() => {
                loading(false);
            });
    }

    handleDelete = (task_id) => {

        const {loading, deleteSingleTask} = this.props;

        loading(true);

        fetch(`http://localhost:3001/task/${task_id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                deleteSingleTask(task_id);
            })
            .catch(err => console.error("Delete Task Request Error::", err))
            .finally(() => {
                loading(false);
            });

    }

    handleRemoveSelectedTasks = () => {

        const {loading, checkedTasks, removeSelectedTasks} = this.props;

        loading(true);

        fetch("http://localhost:3001/task", {
            method: "PATCH",
            body: JSON.stringify({tasks: Array.from(checkedTasks)}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) throw data.error;
                removeSelectedTasks(checkedTasks);

            })
            .catch(err => console.error("Delete Tasks Request Error::", err))
            .finally(() => {
                loading(false);
            });
    }


    handleReceivedEditTask = (editedTask) => {

        const {loading, editTask, editableTask, toggleEditModal} = this.props;

        loading(true);

        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: "PUT",
            body: JSON.stringify(editedTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                editTask(editedTask);
                editableTask && toggleEditModal(null);
            })
            .catch(err => console.error("Edit Task Request Error::", err))
            .finally(() => {
                loading(false);
            });
    }


    componentDidMount() {

        const {loading, setTasks} = this.props;

        loading(true);

        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                setTasks(data);
            })
            .catch(error => console.error(error))
            .finally(() => {
                loading(false);
            });
    }

    render() {

        const {
            tasks,
            isLoad,
            isAdd,
            isConfirmModalOpen,
            checkedTasks,
            editableTask,
            toggleAddModal,
            toggleCheckedTask,
            toggleSelectTasks,
            toggleConfirmModal,
            toggleEditModal
        } = this.props;

        const Tasks = tasks.map((task) => {
            return (
                <Col key={task._id}
                     xs={12}
                     md={6}
                     xl={4}
                     className="d-flex justify-content-center"
                >
                    <Task task={task}
                          handleDelete={this.handleDelete}
                          toggleCheckedTask={toggleCheckedTask}
                          disabled={!!checkedTasks.size}
                          checked={checkedTasks.has(task._id)}
                          toggleEditModal={toggleEditModal}
                    />
                </Col>
            )
        })

        return (
            <>
                <Container>
                    <Row>
                        <Col md={12} className="d-flex justify-content-center">
                            <Button
                                variant="secondary"
                                onClick={toggleAddModal}
                            >
                                Add task
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {!tasks.length && <div>Tasks is Empty</div>}
                        {Tasks}
                    </Row>
                    <Row className="mt-4">
                        <Col className="d-flex justify-content-center">
                            <Button
                                variant="danger"
                                onClick={toggleConfirmModal}
                                disabled={!!!checkedTasks.size}
                            >
                                Remove Selected
                            </Button>
                            <Button
                                variant="info"
                                className="ml-3"
                                onClick={toggleSelectTasks}
                                disabled={!tasks.length}
                            >
                                {!checkedTasks.size ? "Select All" : "Unselect"}
                            </Button>
                        </Col>
                    </Row>
                </Container>
                {
                    isConfirmModalOpen && <Confirm
                        onHide={toggleConfirmModal}
                        tasksCount={`Do you want to delete ${checkedTasks.size} tasks?`}
                        onDeleteTasks={this.handleRemoveSelectedTasks}

                    />
                }

                {
                    (isAdd || editableTask) && <ActionsModal
                        editableTask={editableTask}
                        onHide={isAdd ? toggleAddModal : toggleEditModal}
                        onSubmit={isAdd ? this.handleAdd : this.handleReceivedEditTask}
                    />
                }

                {
                    isLoad && <Preloader/>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {

    const {
        tasks,
        isAdd,
        checkedTasks,
        isConfirmModalOpen,
        editableTask
    } = state.todoState;

    const {isLoad} = state;

    return {
        tasks,
        isLoad,
        isAdd,
        checkedTasks,
        isConfirmModalOpen,
        editableTask
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTasks: (data) => dispatch({type: actionTypes.SET_TASKS, data}),
        loading: (isLoad) => dispatch({type: actionTypes.LOADING, isLoad}),
        toggleAddModal: () => dispatch({type: actionTypes.TOGGLE_ADD_MODAL}),
        addTask: (data) => dispatch({type: actionTypes.ADD_TASK, data}),
        deleteSingleTask: (task_id) => dispatch({type: actionTypes.DELETE_SINGLE_TASK, task_id}),
        editTask: (editedTask) => dispatch({type: actionTypes.EDIT_TASK, editedTask}),
        toggleCheckedTask: (task_id) => dispatch({type: actionTypes.TOGGLE_CHECKED_TASK, task_id}),
        removeSelectedTasks: (checkedTasks) => dispatch({type: actionTypes.REMOVE_SELECTED_TASKS, checkedTasks}),
        toggleSelectTasks: (checkedTasks) => dispatch({type: actionTypes.TOGGLE_SELECT_TASKS, checkedTasks}),
        toggleConfirmModal: () => dispatch({type: actionTypes.TOGGLE_CONFIRM_MODAL}),
        toggleEditModal: (task) => dispatch({type: actionTypes.TOGGLE_EDIT_MODAL, task})

    }
}

const TodoProvider = connect(mapStateToProps, mapDispatchToProps)(ToDo);

export default TodoProvider;