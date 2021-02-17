import s from './task.module.css';
import logo from '../../logo.svg';
import {Card, Button, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';

const Task = ({task, handleDelete}) => {
    return (

        <Card className={s.card}>
            <Card.Img variant="top" src={logo} alt="logo" className={s.logo}/>
            <Form.Check type="checkbox" className={s.checkbox}/>
            <Card.Body className="d-flex flex-column">
                <Card.Title>{task.title.slice(0, 6)}</Card.Title>
                <Card.Text>{task.title}</Card.Text>
                <div className={s.card_buttons}>
                    <Button variant="danger" className="mr-3" onClick={() => handleDelete(task.id)}>
                        <FontAwesomeIcon icon={faTrash}/></Button>
                    <Button variant="info"> <FontAwesomeIcon icon={faEdit}/></Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Task;