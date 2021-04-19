import actionTypes from "../actionTypes";

const initialState = {
    isLoad: false,
    successMessage: false,
    errorMessage:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_ERROR_MESSAGE: {

            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }

        case actionTypes.SET_SUCCESS_MESSAGE: {
            return {
                ...state,
                successMessage: action.successMessage
            }
        }

        case actionTypes.LOADING:
            return {
                ...state,
                isLoad: action.isLoad,
                errorMessage: action.isLoad ? "" : state.errorMessage,
                successMessage: action.isLoad ? "" : state.successMessage
            }


        default:
            return state;
    }
}

export default reducer;