import actionTypes from "../actionTypes";

const initialSate = {
    search: "",
    status: null,
    sort: null,
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null

}

const searchReducer = (state = initialSate, action) => {
    switch (action.type) {
        case actionTypes.SET_DROPDOWN:
            const {value, dropDownType} = action;

            return {
                ...state,
                [dropDownType]: value
            }

        case actionTypes.SET_SEARCH:

            return {
                ...state,
                search: action.value
            }
        case actionTypes.SET_DATE:
            const {dataType, date} = action;

            return {
                ...state,
                [dataType]: date
            }
        case actionTypes.RESET_SEARCH:
            return {
                ...initialSate
            }
        default:
            return state;
    }
}

export default searchReducer;
