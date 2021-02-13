import s from './task.module.css';
import logo from '../../logo.svg';
import {Col} from 'react-bootstrap';


const Task = ({task}) => {
    return (
        <Col xs={4} md={3}>
            <div className={s.task_item}>
                <p>{task}</p>
                <img src={logo} className={s.logo} alt="logo"/>
            </div>
        </Col>
    )
}

export default Task;