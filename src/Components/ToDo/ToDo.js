import React, {Component} from 'react';
import s from './todo.module.css';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';

class ToDo extends Component {
    state = {
        tasks:["Task1", "Task2", "Task3", "Task4"],
    }

    handleAdd = (value) => {
        if(!value) return;
        const tasks = [...this.state.tasks];
        tasks.push(value);
        this.setState({
            tasks:tasks
        })
    }

    render(){

        const Tasks = this.state.tasks.map((task,index)=>{
            return <Task task={task} key={index} />
        })

        return (
            <div>
                <AddTask onSubmit={this.handleAdd}/>
                <div className={s.tasks}>
                    { Tasks }
                </div>
            </div>
        )
    }
}

export default ToDo;