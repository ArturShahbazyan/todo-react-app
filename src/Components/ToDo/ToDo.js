import React, {Component} from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import {Row, Container, Col} from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator'
import s from "../AddTask/addtask.module.css";

class ToDo extends Component {
    state = {
        tasks: ["Task1", "Task2", "Task3", "Task4"],
    }

    handleAdd = (value) => {
        if (!value) return;
        const tasks = [...this.state.tasks];
        tasks.push(value);
        this.setState({
            tasks: tasks
        })
    }

    render() {

        const Tasks = this.state.tasks.map((task, index) => {
            return (
                <Col key={idGenerator()}
                     xs={12}
                     md={6}
                     xl={4}
                     className="d-flex justify-content-center"
                >
                    <Task task={task}/>
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