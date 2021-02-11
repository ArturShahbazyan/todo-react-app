import s from './task.module.css'
import logo from '../../logo.svg';

const Task = ({task}) => {
    return (
        <div className={s.task_item}>
            <p>{task}</p>
            <img src={logo} className={s.logo} alt="logo"/>
        </div>


    )
}

export default Task;