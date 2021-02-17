import React, {Component} from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import {Row, Container, Col} from 'react-bootstrap';
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

    handleDelete = (task_id) =>{
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((task) => task_id !== task.id)
        this.setState({
             tasks
        })
    }

    render() {

        const Tasks = this.state.tasks.map((task, index) => {
            return (
                <Col key={task.id}
                     xs={12}
                     md={6}
                     xl={4}
                     className="d-flex justify-content-center"
                >
                    <Task task={task} handleDelete={this.handleDelete}/>
                </Col>
            )
        })

        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <AddTask onSubmit={this.handleAdd}/>
                    </Col>
                </Row>
                <Row className="mt-3">
                    {Tasks}
                </Row>
            </Container>

        )
    }
}

export default ToDo;