import React, {Component} from 'react';
import Task from './Task'
import AddNewTask from './AddNewTask'

class ToDo extends Component {
    state = {
        tasks:["Task1", "Task2", "Task3"],
        inputValue:''
    }

    handleCatchValue = (inputValue) => {
        this.setState({
            inputValue
        })
    }

    render(){

        const { inputValue } = this.state;

        return (
            <div>
                
                <AddNewTask onSubmit={this.handleCatchValue}/>
                <p>{inputValue}</p>
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