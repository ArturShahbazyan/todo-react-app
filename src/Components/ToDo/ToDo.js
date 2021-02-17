import React, {Component} from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import {Row, Container, Col, Button} from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';

class ToDo extends Component {

    state = {
        tasks: [
            {
                id: idGenerator(),
                title: `React  is an open-source, front end, JavaScript library.`
            },
            {
                id: idGenerator(),
                title: `Vue   is an open-source model–view–viewmodel front end
                        JavaScript framework.`
            },
            {
                id: idGenerator(),
                title: `Angular is a TypeScript-based open-source web application framework.`
            }
        ],
        checkedTasks: []
    }

    handleAdd = (value) => {
        if (!value) return;
        const tasks = [...this.state.tasks];
        tasks.push({
                id: idGenerator(),
                title: value
            }
        );

        this.setState({
            tasks: tasks
        })
    }

    handleDelete = (task_id) => {
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((task) => task_id !== task.id)
        this.setState({
            tasks
        })
    }

    handleCheckedTasks = (task_id) => {

        let checkedTasks = [...this.state.checkedTasks];

        if (checkedTasks.includes(task_id)) {
            checkedTasks = checkedTasks.filter(checkedTaskId => task_id !== checkedTaskId)
        } else {
            checkedTasks.push(task_id);
        }
        this.setState({
            checkedTasks
        })

    }

    handleRemoveSelectedTasks = () => {
        let tasks = [...this.state.tasks];
        const checkedTasks = [...this.state.checkedTasks];

        tasks = tasks.filter((task) =>
            !checkedTasks.includes(task.id)
        )

        this.setState({
            tasks,
            removeTasks:[]
        })
    }

    render() {

        const checkedTasks = this.state.checkedTasks;
        const tasks = this.state.tasks;

        const Tasks = this.state.tasks.map((task, index) => {
            return (
                <Col key={task.id}
                     xs={12}
                     md={6}
                     xl={4}
                     className="d-flex justify-content-center"
                >
                    <Task task={task}
                          handleDelete={this.handleDelete}
                          handleCheckedTasks={this.handleCheckedTasks}
                          disabled={!!checkedTasks.length}
                    />
                </Col>
            )
        })

        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <AddTask onSubmit={this.handleAdd} />
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
                            onClick={this.handleRemoveSelectedTasks}
                            disabled={!!!checkedTasks.length}
                        >
                            Remove Selected
                        </Button>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default ToDo;