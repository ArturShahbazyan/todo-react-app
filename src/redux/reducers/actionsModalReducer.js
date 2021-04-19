import actionTypes from "../actionTypes";

const initialState = {
            title:'',
            description: '',
            date: new Date()
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CHANGE_DATA:
            const {name, value} = action.e.target;
            return {
                ...state,
                [name]: value
            }
        case actionTypes.CHANGE_DATE:
            return {
                ...state,
                date: action.date
            }
        case actionTypes.SET_EDIT_TASK:
            return {
                ...state,
                ...action.task,
                date: action.task ? new Date((action.task.date)) : state.date
            }
        case actionTypes.RESET_TASK_MODAL_FIELDS:
            return {
                ...state,
                title:"",
                description:"",
                date:new Date()
            }
        default:
            return state;
    }
}

export default reducer;