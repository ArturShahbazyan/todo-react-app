import React from 'react';
import s from "./addtask.module.css";
import {Col} from 'react-bootstrap';

class AddTask extends React.Component {

    state = {
        value: ''
    }

    handleChange = (e) => {
        const {value} = e.target;
        this.setState({
            value
        })
    }

    render() {

        const {value} = this.state;
        const {onSubmit} = this.props;

        const handleSubmit = () => {
            onSubmit(value);
            this.setState({
                value: ''
            })
        }

        return (
            <Col md={12} className={`${s.add_task_col} d-flex justify-content-center mb-4`}>
                <input onChange={this.handleChange} type="text" placeholder="add a new todo..." value={value}/>
                <button onClick={handleSubmit}>Add</button>
            </Col>

        )
    }
}

export default AddTask;