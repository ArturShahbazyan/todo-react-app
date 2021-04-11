import actionTypes from "../actionTypes";

const initialState = {
    isLoad: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.LOADING:
            return {
                ...state,
                isLoad: action.isLoad
            }

        default:
            return state;
    }
}

export default reducer;