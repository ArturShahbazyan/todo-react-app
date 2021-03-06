import React from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import PropTypes from "prop-types";

class AddEditModal extends React.Component {
    constructor(props) {
        super(props);

        const isEdit = this.props.isEdit;

        this.state = {
            title: isEdit ? this.props.editableTask.title : '',
            description: isEdit ? this.props.editableTask.description : '',
            _id: isEdit ? this.props.editableTask._id : ''
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

        const {onSubmit, onHide, isEdit} = this.props;
        const {title, description} = this.state;

        if(isEdit){

            const editedTask = this.state;

            onSubmit(editedTask);
            onHide();

        }else{

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
    }

    componentDidMount() {
        this.addTaskInput.current.focus();
    }

    render() {

        const {title, description} = this.state;
        const {onHide, isEdit} = this.props;

        return (

            <Modal show={true} onHide={onHide} >
                <Modal.Header closeButton>
                    { isEdit ? 'Edit Task' : 'Add Task' }
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
                            { isEdit ? 'Edit Task' : 'Add Task' }
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
    isEdit:PropTypes.bool.isRequired,
    onHide:PropTypes.func.isRequired,
    onSubmit:PropTypes.func.isRequired
}

export default AddEditModal;