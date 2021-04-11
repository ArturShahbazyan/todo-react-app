import React, {Component} from 'react';
import Task from '../../Task/Task';
import {Row, Container, Col, Button} from 'react-bootstrap';
import Confirm from '../../Modals/Confirm/Confirm';
import ActionsModal from "../../Modals/ActionsModal/ActionsModal";
import Preloader from "../../Preloader/Preloader";
import {connect} from "react-redux";
import actionTypes from "../../../redux/actionTypes";
import {
    addTaskThunk,
    deleteSingleTaskThunk,
    editTaskThunk,
    removeSelectedTasksThunk,
    setTasksThunk
} from "../../../redux/actions";


class ToDo extends Component {

    componentDidMount() {

        const {setTasks} = this.props;
        setTasks();
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
            toggleEditModal,
            deleteSingleTask,
            addTask,
            editTask,
            removeSelectedTasks
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
                          handleDelete={deleteSingleTask}
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
                        onDeleteTasks={() => removeSelectedTasks(checkedTasks)}

                    />
                }

                {
                    (isAdd || editableTask) && <ActionsModal
                        editableTask={editableTask}
                        onHide={isAdd ? toggleAddModal : toggleEditModal}
                        onSubmit={isAdd ? addTask : editTask}
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

    const {isLoad} = state.commonState;


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
        setTasks: () => dispatch(setTasksThunk),
        toggleAddModal: () => dispatch({type: actionTypes.TOGGLE_ADD_MODAL}),
        addTask: (taskData) => dispatch(addTaskThunk(taskData)),
        deleteSingleTask: (task_id) => dispatch(deleteSingleTaskThunk(task_id)),
        editTask: (editedTask) => dispatch(editTaskThunk(editedTask)),
        toggleCheckedTask: (task_id) => dispatch({type: actionTypes.TOGGLE_CHECKED_TASK, task_id}),
        removeSelectedTasks: (checkedTasks) => dispatch(removeSelectedTasksThunk(checkedTasks)),
        toggleSelectTasks: (checkedTasks) => dispatch({type: actionTypes.TOGGLE_SELECT_TASKS, checkedTasks}),
        toggleConfirmModal: () => dispatch({type: actionTypes.TOGGLE_CONFIRM_MODAL}),
        toggleEditModal: (task) => dispatch({type: actionTypes.TOGGLE_EDIT_MODAL, task})

    }
}

const TodoProvider = connect(mapStateToProps, mapDispatchToProps)(ToDo);

export default TodoProvider;