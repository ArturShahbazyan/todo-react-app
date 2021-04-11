import actionTypes from "../actionTypes";

const initialState = {
    singleTask: null,
    isEditTask: false,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_EDIT_TASK:
            return {
                ...state,
                isEditTask: !state.isEditTask
            }

        case actionTypes.SET_SINGLE_TASK:
            return {
                ...state,
                singleTask: action.data
            }
        default:
            return state;
    }
}

export default reducer;