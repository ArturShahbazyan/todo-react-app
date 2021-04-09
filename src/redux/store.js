import {createStore} from "redux";
import actionTypes from "./actionTypes";
import {isRequired, maxLength, minLength, validEmail} from "../helpers/validators";

const initialState = {
    text: '',
    counter: 0,
    isLoad: false,
    todoState: {
        tasks: [],
        isAdd: false,
        checkedTasks: new Set(),
        isConfirmModalOpen: false,
        editableTask: null
    },
    contactState: {
        success: false,
        errorMessage: "",
        formData: {
            name: {
                value: "",
                touched: false,
                valid: false,
                error: null
            },
            email: {
                value: "",
                touched: false,
                valid: false,
                error: null
            },
            message: {
                value: "",
                touched: false,
                valid: false,
                error: null
            }
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter + 1
            }
        case actionTypes.DECREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.RESET_COUNTER:
            return {
                ...state,
                counter: 0
            }
        case actionTypes.SET_TEXT:
            return {
                ...state,
                text: action.text
            }
        case actionTypes.RESET_INPUT:
            return {
                ...state,
                text: ""
            }
        case actionTypes.SET_TASKS:
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: action.data
                }
            }
        case actionTypes.LOADING:
            return {
                ...state,
                    isLoad: action.isLoad
            }
        case actionTypes.TOGGLE_ADD_MODAL:
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isAdd: !state.todoState.isAdd
                }
            }
        case actionTypes.ADD_TASK:
            let tasks = [...state.todoState.tasks];
            tasks.push(action.data);

            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks
                }
            }

        case actionTypes.DELETE_SINGLE_TASK: {
            let tasks = [...state.todoState.tasks];
            tasks = tasks.filter((task) => action.task_id !== task._id);

            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks
                }
            }
        }

        case actionTypes.EDIT_TASK: {
            let tasks = [...state.todoState.tasks];
            const idx = tasks.findIndex((task) => action.editedTask._id === task._id);
            tasks[idx] = action.editedTask;

            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks
                }
            }
        }

        case actionTypes.TOGGLE_CHECKED_TASK: {

            const checkedTasks = new Set(state.todoState.checkedTasks);

            checkedTasks.has(action.task_id) ?
                checkedTasks.delete(action.task_id) :
                checkedTasks.add(action.task_id);

            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    checkedTasks
                }
            }
        }

        case actionTypes.REMOVE_SELECTED_TASKS: {

            let tasks = [...state.todoState.tasks];
            tasks = tasks.filter((task) => !action.checkedTasks.has(task._id));

            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks,
                    checkedTasks: new Set(),
                    isConfirmModalOpen: false
                }
            }
        }

        case actionTypes.TOGGLE_SELECT_TASKS: {

            let {tasks, checkedTasks} = state.todoState;

            checkedTasks = new Set(checkedTasks);

            !checkedTasks.size ?
                tasks.forEach((task) => {
                    checkedTasks.add(task._id);
                }) : checkedTasks = new Set();
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks,
                    checkedTasks
                }
            }
        }

        case actionTypes.TOGGLE_CONFIRM_MODAL: {

            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isConfirmModalOpen: !state.todoState.isConfirmModalOpen
                }
            }
        }

        case actionTypes.TOGGLE_EDIT_MODAL: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    editableTask: action.task
                }
            }
        }

        case actionTypes.SET_SUCCESS:
            return {
                ...state,
                contactState: {
                    ...state.contactState,
                    success: action.success
                }
            }
        case actionTypes.SET_ERROR_MESSAGE:
            return {
                ...state,
                contactState: {
                    ...state.contactState,
                    errorMessage: action.errorMessage
                }
            }
        case actionTypes.SET_FORM_DATA:
            return {
                ...state,
                contactState: {
                    ...state.contactState,
                        formData: action.formData
                    }
            }

        case actionTypes.SET_CHANGES:

            const {name, value} = action.data.target;

            let error = null;

            const maxLength30 = maxLength(30);
            const minLength3 = minLength(3);

            switch (name) {
                case "name" :
                case "email" :
                case "message" :
                    error = isRequired(value)
                        || maxLength30(value)
                        || minLength3(value)
                        || (name === "email" && validEmail(value));
                    break;
                default :
            }

           const formData = {
                ...state.contactState.formData,
                [name]: {
                    value,
                    touched: !!value,
                    valid: !!!error,
                    error
                }
            }

            return {
                ...state,
                contactState: {
                    ...state.contactState,
                    formData
                }
            }

        case actionTypes.SET_FORM_DATA_EMPTY:

            return {
                ...state,
                contactState: {
                    ...state.contactState,
                    formData: action.emptyData
                }
            }

        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;