import React from 'react';
import {Form, Button} from 'react-bootstrap';

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

    handleSubmit = (e) => {

        if (e.type === 'keypress' && e.key !== 'Enter') return;

        const {value} = this.state;
        const {onSubmit} = this.props;
        onSubmit(value);
        this.setState({
            value: ''
        })
    }

    render() {

        const {value} = this.state;
        const {disabled} = this.props;

        return (

            <div className="d-flex justify-content-center mb-4">
                <Form.Control
                    type="text"
                    placeholder="add a new task..."
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                    value={value}
                    style={{width: "40%"}}
                    disabled={disabled}

                />
                <Button
                    variant="info"
                    onClick={this.handleSubmit}
                    disabled={!!!value}
                    className="ml-2"
                >
                    Add Task
                </Button>

            </div>
        )
    }
}

export default AddTask;