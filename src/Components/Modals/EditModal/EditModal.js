import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import PropTypes from "prop-types";

class EditModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.editableTask
        }
    }

    handleEditedTask = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSend = ({type, key}) => {

        if (type === 'keypress' && key !== 'Enter') return;

        const {handleReceivedEditTask, handleToggleEditTask} = this.props;
        const editedTask = this.state;

        handleReceivedEditTask(editedTask);
        handleToggleEditTask()

    }

    render() {

        const {handleToggleEditTask} = this.props;
        const {title, description} = this.state;

        return (
            <Modal show={true} onHide={handleToggleEditTask}>
                <Modal.Header closeButton>Edit Task </Modal.Header>
                <div className="p-3 d-flex d-flex flex-column">
                    <Form.Control
                        type="text"
                        placeholder="title"
                        ref={this.addTaskInput}
                        name="title"
                        value={title}
                        onChange={this.handleEditedTask}
                        onKeyPress={this.handleSend}
                    />
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="description"
                        className="my-2"
                        style={{resize: 'none'}}
                        name="description"
                        value={description}
                        onChange={this.handleEditedTask}
                        onKeyPress={this.handleSend}
                    />
                    <Button variant="secondary"
                            className="mb-2"
                            onClick={handleToggleEditTask}
                    >
                        Close
                    </Button>
                    <Button variant="info"
                            onClick={this.handleSend}
                    >
                        Save
                    </Button>
                </div>
            </Modal>
        )
    }
}

EditModal.propTypes = {
    editableTask: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    handleReceivedEditTask: PropTypes.func.isRequired,
    handleToggleEditTask: PropTypes.func.isRequired,
}

export default EditModal;