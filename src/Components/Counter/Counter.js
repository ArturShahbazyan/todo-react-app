import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import React from "react";

const Counter = ({incrementCounter, decrementCounter, resetCounter, counter}) => {

    return (
        <div>
            <h2>Counter</h2>
            <p className="m-3">{counter}</p>

            <div className="w-25 m-auto d-flex flex-column flex-lg-row justify-content-center">
                <Button
                    variant="outline-secondary"
                    className="mr-xl-3 mr-lg-3"
                    onClick={incrementCounter}
                >
                    Increment
                </Button>
                <Button variant="outline-danger "
                        className="mr-xl-3 mr-lg-3 mt-3 mt-lg-0"
                        onClick={decrementCounter}
                >
                    Decrement
                </Button>
                <Button
                    className="mt-3 mt-lg-0"
                    variant="outline-info"
                    onClick={resetCounter}
                >
                    Reset
                </Button>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        incrementCounter: () => dispatch({type: "incrementCounter"}),
        decrementCounter: () => dispatch({type: "decrementCounter"}),
        resetCounter: () => dispatch({type: "resetCounter"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);