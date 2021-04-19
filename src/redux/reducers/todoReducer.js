import actionTypes from "../actionTypes";

const initialState = {
    tasks: [],
    isAdd: false,
    checkedTasks: new Set(),
    isConfirmModalOpen: false,
    editableTask: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TASKS:
            return {
                ...state,
                tasks: action.data,

            }
        case actionTypes.TOGGLE_ADD_MODAL:
            return {
                ...state,
                isAdd: !state.isAdd
            }
        case actionTypes.ADD_TASK:
            let tasks = [...state.tasks];
            tasks.push(action.data);

            return {
                ...state,
                tasks,
                isAdd: false
            }
        case actionTypes.DELETE_SINGLE_TASK: {
            let tasks = [...state.tasks];
            tasks = tasks.filter((task) => action.task_id !== task._id);

            return {
                ...state,
                tasks
            }
        }
        case actionTypes.EDIT_TASK: {
            let tasks = [...state.tasks];
            const idx = tasks.findIndex((task) => action.data._id === task._id);
            tasks[idx] = action.data;

            return {
                ...state,
                tasks,
                editableTask: null
            }
        }
        case actionTypes.TOGGLE_CHECKED_TASK: {
            const checkedTasks = new Set(state.checkedTasks);

            checkedTasks.has(action.task_id) ?
                checkedTasks.delete(action.task_id) :
                checkedTasks.add(action.task_id);

            return {
                ...state,
                checkedTasks
            }
        }
        case actionTypes.REMOVE_SELECTED_TASKS: {
            let tasks = [...state.tasks];
            tasks = tasks.filter((task) => !action.checkedTasks.has(task._id));

            return {
                ...state,
                tasks,
                checkedTasks: new Set(),
                isConfirmModalOpen: false
            }
        }
        case actionTypes.TOGGLE_SELECT_TASKS: {
            let {tasks, checkedTasks} = state;
            checkedTasks = new Set(checkedTasks);

            !checkedTasks.size ?
                tasks.forEach((task) => {
                    checkedTasks.add(task._id);
                }) : checkedTasks = new Set();

            return {
                ...state,
                tasks,
                checkedTasks
            }
        }
        case actionTypes.TOGGLE_CONFIRM_MODAL: {
            return {
                ...state,
                isConfirmModalOpen: !state.isConfirmModalOpen
            }
        }

        case actionTypes.TOGGLE_EDIT_MODAL: {
            return {
                ...state,
                editableTask: action.task
            }
        }

        case actionTypes.TOGGLE_TASK_STATUS: {
            let tasks = [...state.tasks];
            const idx = tasks.findIndex((task) => task._id === action.task._id);
            tasks[idx] = action.task;

            return {
                ...state,
                tasks
            }
        }
        default:
            return state;
    }
}

export default reducer;