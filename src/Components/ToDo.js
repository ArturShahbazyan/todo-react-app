import React, {Component} from 'react';
import Task from './Task'

class ToDo extends Component {
    state = {
        tasks:["Task1", "Task2", "Task3"]
    }

    render(){
        return (
            <div>
                <div className="add_task_col">
                    <input type="text" placeholder="add a new todo..."/>
                    <button>Add</button>
                </div>
                <div className="tasks_container">
                    {
                        this.state.tasks.map((task,index)=>{
                            return <Task task={task} key={index} />
                        })
                    }
                </div>
            </div>

        )
    }
}

export default ToDo;