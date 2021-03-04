import React from 'react';
import {Form, Button} from 'react-bootstrap';
import PropTypes from "prop-types";

class AddTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: ''
        }

        this.addTaskInput = React.createRef();
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (e) => {

        if (e.type === 'keypress' && e.key !== 'Enter') return;

        const {title, description} = this.state;
        const {onSubmit} = this.props;

        const taskData = {
            title,
            description
        }

        onSubmit(taskData);

        this.setState({
            title: '',
            description: ''
        })
    }

    componentDidMount() {
        this.addTaskInput.current.focus();
    }

    render() {

        const {title, description} = this.state;
        const {disabled} = this.props;

        return (

            <div className="d-flex flex-column align-items-center mb-4">
                <Form.Control
                    type="text"
                    placeholder="title"
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                    value={title}
                    style={{width: "60%"}}
                    disabled={disabled}
                    ref={this.addTaskInput}
                    name="title"
                />
                <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="description"
                    className="my-2"
                    style={{width: "60%", resize:"none"}}
                    disabled={disabled}
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                />
                <Button
                    variant="info"
                    onClick={this.handleSubmit}
                    disabled={!(!!title && !!description)}
                    className="ml-2"
                >
                    Add Task
                </Button>
            </div>
        )
    }
}

AddTask.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default AddTask;