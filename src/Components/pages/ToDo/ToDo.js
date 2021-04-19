import React, {useEffect} from 'react';
import Task from '../../Task/Task';
import {Row, Container, Col, Button} from 'react-bootstrap';
import Confirm from '../../Modals/Confirm/Confirm';
import ActionsModal from "../../Modals/ActionsModal/ActionsModal";
import Search from "../../Search/Search"
import {connect} from "react-redux";
import actionTypes from "../../../redux/actionTypes";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    addTaskThunk,
    deleteSingleTaskThunk,
    editTaskThunk,
    removeSelectedTasksThunk,
    setTasksThunk, toggleEditModalThunk, toggleTaskStatusThunk
} from "../../../redux/actions";


const ToDo = (props) => {

    const {
        tasks,
        isAdd,
        isConfirmModalOpen,
        checkedTasks,
        editableTask,
        errorMessage,
        successMessage,
        toggleAddModal,
        toggleCheckedTask,
        toggleSelectTasks,
        toggleConfirmModal,
        toggleEditModal,
        deleteSingleTask,
        addTask,
        editTask,
        removeSelectedTasks,
        setTasks,
        toggleTaskStatus
    } = props;


    useEffect(() => {
        setTasks();
    }, [setTasks]);


    useEffect(() => {
        errorMessage && toast.error(`🦄 ${errorMessage}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [errorMessage]);

    useEffect(() => {
        successMessage && toast.success(`🦄 ${successMessage}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [successMessage]);


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
                      toggleTaskStatus={toggleTaskStatus}
                />
            </Col>
        )
    });

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Search/>
                    </Col>
                </Row>
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
                (successMessage || errorMessage) && <ToastContainer/>
            }
        </>
    )
}

const mapStateToProps = (state) => {

    const {
        tasks,
        isAdd,
        checkedTasks,
        isConfirmModalOpen,
        editableTask
    } = state.todoState;

    const {errorMessage, successMessage} = state.globalState;


    return {
        tasks,
        isAdd,
        checkedTasks,
        isConfirmModalOpen,
        editableTask,
        errorMessage,
        successMessage
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
        toggleTaskStatus: (task) => dispatch(toggleTaskStatusThunk(task)),
        toggleEditModal: (task) => dispatch(toggleEditModalThunk(task)),
    }
}

const TodoProvider = connect(mapStateToProps, mapDispatchToProps)(ToDo);

export default TodoProvider;