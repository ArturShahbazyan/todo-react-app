import actionTypes from "../actionTypes";
import {isRequired, maxLength, minLength, validEmail} from "../../helpers/validators";

const initialState = {
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

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_SUCCESS:
            return {
                ...state,
                success: action.success
            }
        case actionTypes.SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage
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
                ...state.formData,
                [name]: {
                    value,
                    touched: !!value,
                    valid: !!!error,
                    error
                }
            }

            return {
                ...state,
                formData
            }

        case actionTypes.SET_FORM_DATA_EMPTY:

            return {
                ...state,
                formData: action.emptyData
            }

        default:
            return state;
    }
}

export default reducer;