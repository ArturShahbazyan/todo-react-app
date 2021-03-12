import React, {Component} from 'react';
import Task from '../../Task/Task';
import {Row, Container, Col, Button} from 'react-bootstrap';
import Confirm from '../../Modals/Confirm/Confirm';
import ActionsModal from "../../Modals/ActionsModal/ActionsModal";
import dateFormatter from '../../../helpers/date';

class ToDo extends Component {

    state = {
        tasks: [],
        checkedTasks: new Set(),
        isConfirmModalOpen: false,
        editableTask: null,
        isAdd: false
    }

    handleAdd = (taskData) => {
        if (!taskData.title || !taskData.description) return;

        taskData.date = dateFormatter(taskData.date);
        const tasks = [...this.state.tasks];

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
                tasks.push(data);
                this.setState({
                    tasks
                });
            })
            .catch(err => console.error("Create Task Request Error::", err));
    }

    handleDelete = (task_id) => {

        fetch(`http://localhost:3001/task/${task_id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                let tasks = [...this.state.tasks];
                tasks = tasks.filter((task) => task_id !== task._id)
                this.setState({
                    tasks
                });
            })
            .catch(err => console.error("Delete Task Request Error::", err));

    }

    handleCheckedTasks = (task_id) => {

        let checkedTasks = this.state.checkedTasks;
        checkedTasks = new Set(checkedTasks);

        checkedTasks.has(task_id) ? checkedTasks.delete(task_id) : checkedTasks.add(task_id);

        this.setState({
            checkedTasks
        })
    }

    handleRemoveSelectedTasks = () => {

        fetch("http://localhost:3001/task", {
            method: "PATCH",
            body: JSON.stringify({tasks: Array.from(this.state.checkedTasks)}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) throw data.error;
                const {checkedTasks} = this.state;
                let tasks = [...this.state.tasks];
                tasks = tasks.filter((task) => !checkedTasks.has(task._id));

                this.setState({
                    tasks,
                    checkedTasks: new Set()
                })
            })
            .catch(err => console.error("Delete Tasks Request Error::", err))
    }

    handleSelectTasks = () => {

        const tasks = this.state.tasks;
        let checkedTasks = new Set(this.state.checkedTasks);

        !checkedTasks.size ?
            tasks.forEach((task) => {
                checkedTasks.add(task._id);
                this.setState({
                    checkedTasks
                })
            }) :
            this.setState({
                checkedTasks: new Set()
            })
    }

    handleToggleModal = () => {
        this.setState({
            isConfirmModalOpen: !this.state.isConfirmModalOpen
        })
    }

    handleReceivedEditTask = (editedTask) => {

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

                let tasks = [...this.state.tasks];
                const idx = tasks.findIndex((task) => editedTask._id === task._id);
                tasks[idx] = editedTask;

                this.setState({
                    tasks
                })
            })
            .catch(err => console.error("Edit Task Request Error::", err));
    }

    handleToggleEditModal = (task) => {
        this.setState({
            editableTask: !this.state.editableTask ? task : null
        })
    }

    handleToggleAddModal = () => {
        this.setState({
            isAdd: !this.state.isAdd
        })
    }

    componentDidMount() {

        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                this.setState({
                    tasks: data
                });
            })
            .catch(error => console.error(error));
    }

    render() {

        const {
            checkedTasks,
            tasks,
            isConfirmModalOpen,
            editableTask,
            isAdd
        } = this.state;

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
                          handleCheckedTasks={this.handleCheckedTasks}
                          disabled={!!checkedTasks.size}
                          checked={checkedTasks.has(task._id)}
                          handleToggleEditModal={this.handleToggleEditModal}
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
                                onClick={this.handleToggleAddModal}
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
                                onClick={this.handleToggleModal}
                                disabled={!!!checkedTasks.size}
                            >
                                Remove Selected
                            </Button>
                            <Button
                                variant="info"
                                className="ml-3"
                                onClick={this.handleSelectTasks}
                                disabled={!tasks.length}
                            >
                                {!checkedTasks.size ? "Select All" : "Unselect"}
                            </Button>
                        </Col>
                    </Row>
                </Container>
                {
                    isConfirmModalOpen && <Confirm
                        onHide={this.handleToggleModal}
                        tasksCount={`Do you want to delete ${checkedTasks.size} tasks?`}
                        onDeleteTasks={this.handleRemoveSelectedTasks}

                    />
                }

                {
                    (isAdd || editableTask) && <ActionsModal
                        editableTask={editableTask}
                        onHide={isAdd ? this.handleToggleAddModal : this.handleToggleEditModal}
                        onSubmit={isAdd ? this.handleAdd : this.handleReceivedEditTask}
                    />
                }
            </>
        )
    }
}

export default ToDo;