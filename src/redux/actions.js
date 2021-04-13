import actionTypes from "./actionTypes";
import dateFormatter from "../helpers/date";

export const setTasksThunk = (dispatch) => {

    dispatch({type: actionTypes.LOADING, isLoad: true});

    fetch("http://localhost:3001/task")
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({type: actionTypes.SET_TASKS, data});
        })
        .catch(err => dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: err.message }))
        .finally(() => {
            dispatch({type: actionTypes.LOADING, isLoad: false});
        });
}

export const addTaskThunk = (taskData) => (dispatch) => {

    if (!taskData.title || !taskData.description) return;

    taskData.date = dateFormatter(taskData.date);

    dispatch({type: actionTypes.LOADING, isLoad: true});

    fetch("http://localhost:3001/task", {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if (data.error) throw data.error;
            dispatch({type: actionTypes.ADD_TASK, data});
            dispatch({type: actionTypes.SET_SUCCESS_MESSAGE, success:"Tasks was added successfully !"});
        })
        .catch(err => dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: err.message }))
        .finally(() => dispatch({type: actionTypes.LOADING, isLoad: false}));
}


export const deleteSingleTaskThunk = (task_id) => (dispatch) => {

    dispatch({type: actionTypes.LOADING, isLoad: true});

    fetch(`http://localhost:3001/task/${task_id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({type: actionTypes.DELETE_SINGLE_TASK, task_id});
            dispatch({type: actionTypes.SET_SUCCESS_MESSAGE, success:"Task was deleted successfully !"});
        })
        .catch(err => dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: err.message }))
        .finally(() => dispatch({type: actionTypes.LOADING, isLoad: false}));

}

export const editTaskThunk = (editedTask) => (dispatch) => {

    dispatch({type: actionTypes.LOADING, isLoad: true});

    fetch(`http://localhost:3001/task/${editedTask._id}`, {
        method: "PUT",
        body: JSON.stringify(editedTask),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({type: actionTypes.EDIT_TASK, editedTask});
            dispatch({type: actionTypes.SET_SUCCESS_MESSAGE, success:"Task was edited successfully !"});
        })
        .catch(err => dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: err.message }))
        .finally(() => dispatch({type: actionTypes.LOADING, isLoad: false}));

}

export const removeSelectedTasksThunk = (checkedTasks) => (dispatch) => {

    dispatch({type: actionTypes.LOADING, isLoad: true});

    fetch("http://localhost:3001/task", {
        method: "PATCH",
        body: JSON.stringify({tasks: Array.from(checkedTasks)}),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({type: actionTypes.REMOVE_SELECTED_TASKS, checkedTasks});
            dispatch({type: actionTypes.SET_SUCCESS_MESSAGE, success:"Tasks was deleted successfully !"});
        })
        .catch(err => dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: err.message }))
        .finally(() => dispatch({type: actionTypes.LOADING, isLoad: false}));
}

export const setSingleTaskThunk = (id, history) => (dispatch) => {

    dispatch({type: actionTypes.LOADING, isLoad: true});

    fetch(`http://localhost:3001/task/${id}`)
        .then(res => res.json())
        .then(data => {

            if (data.error) throw data.error;
            dispatch({type: actionTypes.LOADING, isLoad: false});
            dispatch({type: actionTypes.SET_SINGLE_TASK, data});
        })
        .catch(err => {
            history.push("/404");
            console.error("Single Task Response Error::", err);
        })
}

export const editSingleTaskThunk = (editedTask) => (dispatch) => {

    dispatch({type: actionTypes.LOADING, isLoad: true});

    fetch(`http://localhost:3001/task/${editedTask._id}`, {
        method: "PUT",
        body: JSON.stringify(editedTask),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({type: actionTypes.SET_SINGLE_TASK, data});
            dispatch({type: actionTypes.TOGGLE_EDIT_TASK});
        })
        .catch(err => console.error("Single Task Response Error::", err))
        .finally(() => dispatch({type: actionTypes.LOADING, isLoad: false}));
}

export const deleteTaskDetails = (singleTaskId, history) => (dispatch) => {

    dispatch({type: actionTypes.LOADING, isLoad: true});

    fetch(`http://localhost:3001/task/${singleTaskId}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            history.push("/");
        }).catch(err => {
        console.error("Delete Single Task Request Error::", err)
    });

}

export const toggleTaskStatusThunk = (task) => (dispatch) => {

    const status = task.status === "active" ? "done" : "active";
    dispatch({type: actionTypes.LOADING, isLoad: true});
    fetch(`http://localhost:3001/task/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: actionTypes.TOGGLE_TASK_STATUS, task: data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
        })
        .finally(() => {
            dispatch({type: actionTypes.LOADING, isLoad: false});
        });

}



