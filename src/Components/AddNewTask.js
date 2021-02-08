import React from 'react';

class AddNewTask extends React.Component {

    state = {
        inputValue: ''
    }

    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleSubmit = () => {
        const { inputValue } = this.state;
        const { onSubmit } = this.props;
        onSubmit(inputValue);
        
    } 

    render(){

        const { inputValue } = this.state;

        return(
            <div className="add_task_col">
            <input onChange={this.handleChange} type="text" placeholder="add a new todo..." value={inputValue}/>
            <button onClick={this.handleSubmit}>Add</button>
        </div>
        )
    }
}

export default AddNewTask;