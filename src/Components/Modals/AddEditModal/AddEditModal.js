import React from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import PropTypes from "prop-types";

class AddEditModal extends React.Component {
    constructor(props) {
        super(props);

        const editableTask = props.editableTask ? { ...props.editableTask } : {};
        this.state = {
            title: '',
            description: '',
            _id: '',
            ...editableTask
        }

        this.addTaskInput = React.createRef();
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }

    handleSend = (e) => {

        if (e.type === 'keypress' && e.key !== 'Enter') return;

        const {onSubmit, onHide, editableTask} = this.props;
        const {title, description} = this.state;

        editableTask ? onSubmit(this.state) : onSubmit({title, description});
        onHide();
    }

    componentDidMount() {
        this.addTaskInput.current.focus();
    }

    render() {

        const {title, description} = this.state;
        const {onHide, editableTask} = this.props;

        return (

            <Modal show={true} onHide={onHide} >
                <Modal.Header closeButton>
                    { !!editableTask ? 'Edit Task' : 'Add Task' }
                </Modal.Header>
                <div className="p-3 d-flex flex-column justify-content-center">
                    <Form.Control
                        type="text"
                        placeholder="title"
                        ref={this.addTaskInput}
                        name="title"
                        value={title}
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
                        onKeyPress={this.handleSend}
                    />
                    <div className="d-flex justify-content-center">
                        <Button variant="secondary"
                                className="mr-3"
                                onClick={onHide}
                        >
                            Cancel
                        </Button>
                        <Button variant="info"
                                onClick={this.handleSend}
                                disabled={!(!!title && !!description)}
                        >
                            { !!editableTask ? 'Edit Task' : 'Add Task' }
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

AddEditModal.propTypes = {
    editableTask: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    onHide:PropTypes.func.isRequired,
    onSubmit:PropTypes.func.isRequired
}

export default AddEditModal;