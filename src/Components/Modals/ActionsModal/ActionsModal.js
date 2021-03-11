import React from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import dateFormatter from "../../../helpers/date";

class ActionsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            _id: '',
            date: new Date(),
            ...props.editableTask,
        }

        this.addTaskInput = React.createRef();
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }

    handleSend = ({type, key}) => {

        if (type === 'keypress' && key !== 'Enter') return;

        const {onSubmit, onHide, editableTask} = this.props;
        const taskData = {...this.state};
        taskData.date = dateFormatter(taskData.date);

        editableTask ? onSubmit(this.state) : onSubmit(taskData);
        onHide();
    }

    handleSetDate = (date) => {
        this.setState({
            date
        })
    }

    componentDidMount() {
        this.addTaskInput.current.focus();
    }

    render() {

        const {title, description, date} = this.state;
        const {onHide, editableTask} = this.props;

        return (

            <Modal show={true} onHide={onHide} >
                <Modal.Header closeButton>
                    { !!editableTask ? 'Edit Task' : 'Add Task' }
                </Modal.Header>
                <Modal.Body>
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
                    <DatePicker
                        selected={new Date(date)}
                        onChange={date => this.handleSetDate(date)}
                        className="form-control"
                    />
                </Modal.Body>
                    <div className="d-flex justify-content-center mb-3">
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
                            { !!editableTask ? 'Save Task' : 'Add Task' }
                        </Button>
                    </div>
            </Modal>
        )
    }
}

ActionsModal.propTypes = {
    editableTask: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    onHide:PropTypes.func.isRequired,
    onSubmit:PropTypes.func.isRequired
}

export default ActionsModal;