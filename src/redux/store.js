import {createStore} from "redux";

const initialState = {
    text:'',
    counter: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "incrementCounter":
            return {
                ...state,
                counter: state.counter + 1
            }
        case "decrementCounter":
            return {
                ...state,
                counter: state.counter - 1
            }
        case "resetCounter":
            return {
                ...state,
                counter: 0
            }
        case "setText":
            return {
                ...state,
                text: action.text
            }
        case "resetInput":
            return {
                ...state,
                text: ""
            }
        default: return state;
    }
}

const store = createStore(reducer);

export default store;