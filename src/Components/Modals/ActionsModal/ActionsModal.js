import React, {useCallback, useEffect, useRef} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import dateFormatter from "../../../helpers/dateFormatter";
import {connect} from "react-redux";
import actionTypes from "../../../redux/actionTypes";


const ActionsModal = (props) => {

    const {
        onHide,
        editableTask,
        onSubmit,
        taskData,
        changeDate,
        changeData,
        resetTaskModalFields
    } = props;
    const {description, title, date} = taskData;
    const addTaskInput = useRef(null);


    const handleSend = useCallback(({type, key}) => {
        if (type === 'keypress' && key !== 'Enter') return;

        const newTaskData = {...taskData};
        newTaskData.date = dateFormatter(newTaskData.date);
        const {title, description, date} = newTaskData;

        editableTask ? onSubmit(newTaskData) : onSubmit({title, description, date});
    }, [editableTask, taskData, onSubmit]);


    useEffect(() => {
        addTaskInput.current.focus();
        return () => {
            resetTaskModalFields();
        }
    }, [resetTaskModalFields]);


    return (

        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                {!!editableTask ? 'Edit Task' : 'Add Task'}
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    type="text"
                    placeholder="title"
                    ref={addTaskInput}
                    name="title"
                    value={title}
                    onChange={(e) => changeData(e)}
                    onKeyPress={handleSend}
                />
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="description"
                    className="my-2"
                    style={{resize: 'none'}}
                    name="description"
                    value={description}
                    onChange={(e) => changeData(e)}
                    onKeyPress={handleSend}
                />
                <DatePicker
                    selected={date}
                    onChange={date => changeDate(date)}
                    className="form-control"
                />
            </Modal.Body>
            <div className="d-flex justify-content-center mb-3">
                <Button variant="secondary"
                        className="mr-3"
                        onClick={() => onHide(null)}
                >
                    Cancel
                </Button>
                <Button variant="info"
                        onClick={handleSend}
                        disabled={!(!!title && !!description)}
                >
                    {!!editableTask ? 'Save Task' : 'Add Task'}
                </Button>
            </div>
        </Modal>
    )
}

ActionsModal.propTypes = {
    editableTask: PropTypes.object,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    const taskData = state.actionsModalState;
    return {
        taskData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeData: (e) => dispatch({type: actionTypes.CHANGE_DATA, e}),
        changeDate: (date) => dispatch({type: actionTypes.CHANGE_DATE, date}),
        editData: (data) => dispatch({type: actionTypes.EDIT_DATA, data}),
        resetTaskModalFields: () => dispatch({type: actionTypes.RESET_TASK_MODAL_FIELDS}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsModal);
