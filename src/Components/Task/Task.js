import s from './task.module.css';
import logo from '../../logo.svg';
import {memo} from "react";
import {Card, Button, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Task = (props) => {

    const {
        task,
        checked,
        disabled,
        handleDelete,
        handleCheckedTasks,
        handleEditTask,
        handleOpenEditModal
    } = props;

    const handleOpenAndEdit = () => {
        handleOpenEditModal();
        handleEditTask(task)
    }

    return (

        <Card className={`${s.card} ${checked && s.checked}`}>
            <Card.Img variant="top" src={logo} alt="logo" className={s.logo}/>
            <Form.Check type="checkbox"
                        className={s.checkbox}
                        onChange={() => handleCheckedTasks(task._id)}
                        checked={checked}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <div className={s.card_buttons}>
                    <Button variant="outline-danger"
                            className="mr-3"
                            onClick={() => handleDelete(task._id)}
                            disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faTrash}/></Button>
                    <Button variant="outline-info"
                            onClick={handleOpenAndEdit}

                    >
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

Task.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleCheckedTasks: PropTypes.func.isRequired,
    handleEditTask: PropTypes.func.isRequired,
    handleOpenEditModal: PropTypes.func.isRequired,
}

export default memo(Task);