import s from './task.module.css';
import logo from '../../logo.svg';
import {Card, Button, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';

const Task = ({task, disabled, handleDelete, handleCheckedTasks}) => {
    return (

        <Card className={s.card}>
            <Card.Img variant="top" src={logo} alt="logo" className={s.logo}/>
            <Form.Check type="checkbox"
                        className={s.checkbox}
                        onClick={() => handleCheckedTasks(task.id)}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{task.title.slice(0, 6)}</Card.Title>
                <Card.Text>{task.title}</Card.Text>
                <div className={s.card_buttons}>
                    <Button variant="danger"
                            className="mr-3"
                            onClick={() => handleDelete(task.id)}
                            disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faTrash}/></Button>
                    <Button variant="info" disabled={disabled}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Task;