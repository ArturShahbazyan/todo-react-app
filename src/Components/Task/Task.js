import s from './task.module.css';
import logo from '../../logo.svg';
import {memo} from "react";
import {Card, Button, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import dateFormatter from '../../helpers/date'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Task = (props) => {

    const {
        task,
        checked,
        disabled,
        handleDelete,
        toggleCheckedTask,
        toggleEditModal
    } = props;


    return (

        <Card className={`${s.card} ${checked && s.checked}`}>
            <Card.Img variant="top" src={logo} alt="logo" className={s.logo}/>
            <Form.Check type="checkbox"
                        className={s.checkbox}
                        onChange={() => toggleCheckedTask(task._id)}
                        checked={checked}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>
                    <Link className={s.singleTaskLink}  to={`/task/${task._id}`}>
                        {task.title}
                    </Link>

                </Card.Title>
                <Card.Text>
                    {task.description}
                </Card.Text>
                <Card.Text className="mt-auto">
                    Created: {dateFormatter(task.date)}
                </Card.Text>
                <div className="mt-2">
                    <Button variant="outline-danger"
                            className="mr-3"
                            onClick={() => handleDelete(task._id)}
                            disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faTrash}/></Button>
                    <Button variant="outline-info"
                            onClick={() => toggleEditModal(task)}
                            disabled={disabled}
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
    toggleCheckedTask: PropTypes.func.isRequired,
    toggleEditModal: PropTypes.func.isRequired,
}

export default memo(Task);