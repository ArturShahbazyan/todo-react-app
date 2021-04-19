import actionTypes from "../actionTypes";

const initialState = {
    text: '',
    counter: 0
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
        default:
            return state;
    }
}

export default reducer;