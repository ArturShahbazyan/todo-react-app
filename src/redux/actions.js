import actionTypes from "./actionTypes";
import dateFormatter from "../helpers/dateFormatter";
import {beautyErrMsg} from "../helpers/beautyErrMsg";

export const setTasksThunk = (dispatch) => {

    dispatch({type: actionTypes.LOADING, isLoad: true});

    fetch("http://localhost:3001/task")
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({type: actionTypes.SET_TASKS, data});
        })
        .catch(err => dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: err.message}))
        .finally(() => {
            dispatch({type: actionTypes.LOADING, isLoad: false});
        });
}

export const addTaskThunk = (taskData) => (dispatch) => {

    if (!taskData.title || !taskData.description) return;

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
            if (data.error) throw data.error;
            dispatch({type: actionTypes.ADD_TASK, data});
            dispatch({type: actionTypes.SET_SUCCESS_MESSAGE, successMessage: "Tasks was added successfully !"});

        })
        .catch(err => dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: err.message}))
        .finally(() => dispatch({type: actionTypes.LOADING, isLoad: false}));
}


export const deleteSingleTaskThunk = (task_id, history = null) => (dispatch) => {

    dispatch({type: actionTypes.LOADING, isLoad: true});

    fetch(`http://localhost:3001/task/${task_id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            if (history) history.push("/");
            dispatch({type: actionTypes.DELETE_SINGLE_TASK, task_id});
            dispatch({type: actionTypes.SET_SUCCESS_MESSAGE, successMessage: "Task was deleted successfully !"});
        })
        .catch(err => dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: err.message}))
        .finally(() => dispatch({type: actionTypes.LOADING, isLoad: false}));

}

export const editTaskThunk = (editedTask, page="todo") => (dispatch) => {


    editedTask.date = dateFormatter(editedTask.date);
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

            if (page === "todo") {
                dispatch({type: actionTypes.EDIT_TASK, data});
                dispatch({type: actionTypes.SET_SUCCESS_MESSAGE, successMessage: "Task was edited successfully !"});
            } else if (page === "singleTask") {
                dispatch({type: actionTypes.SET_SINGLE_TASK, data});
                dispatch({type: actionTypes.SET_SUCCESS_MESSAGE, successMessage: "Task was edited successfully !"});
            } else {
                throw new Error( `${page} Not Found` );
            }
        })
        .catch(err => dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: err.message}))
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
            dispatch({type: actionTypes.SET_SUCCESS_MESSAGE, successMessage: "Tasks was deleted successfully !"});
        })
        .catch(err => dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: err.message}))
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
            dispatch({type: actionTypes.LOADING, isLoad: false});
            console.error("Single Task Response Error::", err);
        })
}


export const toggleTaskStatusThunk = (task) => (dispatch) => {

    const status = task.status === "active" ? "done" : "active";
    dispatch({type: actionTypes.LOADING, isLoad: true});
    fetch(`http://localhost:3001/task/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({status}),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({type: actionTypes.TOGGLE_TASK_STATUS, task: data});
        })
        .catch(error => {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message});
        })
        .finally(() => {
            dispatch({type: actionTypes.LOADING, isLoad: false});
        });

}

export const searchTasksThunk = (queryData) => (dispatch) => {

    let queryParam = `?`;
    for (let key in queryData) {
        queryParam += `${key}=${queryData[key]}&`;
    }

    queryParam = queryParam.slice(0, queryParam.length - 1);

    dispatch({type: actionTypes.LOADING, isLoad: true});
    fetch(`http://localhost:3001/task${queryParam}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            console.log(data);
            dispatch({type: actionTypes.SET_TASKS, data})
        })
        .catch(error => {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message});
        })
        .finally(() => {
            dispatch({type: actionTypes.LOADING, isLoad: false});
        });
}

export const submitFormDataThunk = (formData) => (dispatch) => {

    const sendingFormData = {...formData};

    for (let key in sendingFormData) {
        if (sendingFormData.hasOwnProperty(key)) {
            sendingFormData[key] = sendingFormData[key].value;
        }
    }

    const {name, email, message} = formData;
    const isTouched = name.touched || email.touched || message.touched;

    if (!isTouched) {
        dispatch({type: actionTypes.SET_SUCCESS, success: "Fields is required"});
        return;
    }

    dispatch({type: actionTypes.LOADING, isLoad: true});

    fetch('http://localhost:3001/form', {
        method: "POST",
        body: JSON.stringify(sendingFormData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            const emptyData = {
                ...formData,
                name: {value: ""},
                email: {value: ""},
                message: {value: ""}
            };
            dispatch({type: actionTypes.SET_SUCCESS, success: data.success});
            dispatch({type: actionTypes.SET_FORM_DATA_EMPTY, emptyData});
            setTimeout(() => {
                dispatch({type: actionTypes.SET_SUCCESS_OR_ERROR_EMPTY})
            }, 2000);
        })
        .catch(err => {
            dispatch({type: actionTypes.SET_ERROR, error: beautyErrMsg(err.message)})
            dispatch({type: actionTypes.SET_SUCCESS, success: false});
            console.error("Contact Submit Request Error", err);
        })
        .finally(() => dispatch({type: actionTypes.LOADING, isLoad: false}));
}

export const toggleEditModalThunk = (task, page="todo") => (dispatch) => {
    dispatch({type: actionTypes.SET_EDIT_TASK, task});
    if(page==="todo"){
        dispatch({type: actionTypes.TOGGLE_EDIT_MODAL, task});
    } else if(page==="singleTask") {
        dispatch({type: actionTypes.TOGGLE_EDIT_TASK});
    }
}



