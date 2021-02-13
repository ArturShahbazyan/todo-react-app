import React, {Component} from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import {Row, Container} from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator'

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
            return <Task task={task} key={idGenerator()}/>
        })

        return (
            <Container>
                <Row>
                    <AddTask onSubmit={this.handleAdd}/>
                </Row>
                <Row className="justify-content-center">
                    {Tasks}
                </Row>
            </Container>

        )
    }
}

export default ToDo;