import {Button, Card} from "react-bootstrap";
import s from "./singletask.module.css"
import dateFormatter from "../../../helpers/date";
import PropTypes from "prop-types";
import ActionsModal from "../../Modals/ActionsModal/ActionsModal";
import Preloader from "../../Preloader/Preloader";
import {useCallback, useEffect, useReducer} from "react";


const initialState = {
    singleTask: null,
    isEditTask: false,
    loading: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "handleToggleEditTask":
            return {
                ...state,
                isEditTask: !state.isEditTask
            }
        case 'setLoading':
            return {
                ...state,
                loading: action.loading
            }
        case 'setSingleTask':
            return {
                ...state,
                singleTask: action.data
            }
        default:
            throw new Error();
    }
}


const SingleTaskWithReducer = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const {singleTask, isEditTask, loading} = state;

    useEffect(() => {

        const {id} = props.match.params;

        dispatch({type: "setLoading", loading: true});

        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                dispatch({type: "setLoading", loading: false});
                dispatch({type: "setSingleTask", data})
            })
            .catch(err => {
                props.history.push("/404");
                console.error("Single Task Response Error::", err);
            })
    }, [props.match.params, props.history]);


    const handleDeleteSingleTask = useCallback(() => {
        const singleTaskId = state.singleTask._id;

        dispatch({type: "setLoading", loading: true});

        fetch(`http://localhost:3001/task/${singleTaskId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                props.history.push("/");
            }).catch(err => {
            console.error("Delete Single Task Request Error::", err)
        });
    }, [state.singleTask, props.history]);


    const handleReceivedEditTask = useCallback((editedTask) => {

        dispatch({type: "setLoading", loading: true});

        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: "PUT",
            body: JSON.stringify(editedTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                dispatch({type: "handleToggleEditTask"});
                dispatch({type: "setSingleTask", data})
            })
            .catch(err => console.error("Single Task Response Error::", err))
            .finally(() => {
                dispatch({type: "setLoading", loading: false});
            });
    }, []);


    const handleGoBack = useCallback(() => {
        props.history.goBack();
    }, [props.history]);


    if (!singleTask) return <Preloader/>;

    return (
        <>
            <Card className={`text-center mt-5 ${s.singleTask}`}>
                <Card.Body>
                    <Card.Title>
                        {singleTask.title}
                    </Card.Title>
                    <Card.Text>
                        {singleTask.description}
                    </Card.Text>
                    <Card.Text>
                        Date: {dateFormatter(singleTask.date)}
                    </Card.Text>
                    <Card.Text>
                        Created: {dateFormatter(singleTask.created_at)}
                    </Card.Text>
                    <div className="mt-5 d-flex flex-column flex-lg-row justify-content-center">
                        <Button
                            variant="outline-secondary"
                            className="mr-xl-3 mr-lg-3"
                            onClick={handleGoBack}>
                            Go Back
                        </Button>
                        <Button variant="outline-danger "
                                className="mr-xl-3 mr-lg-3 mt-3 mt-lg-0"
                                onClick={handleDeleteSingleTask}
                        >
                            Delete
                        </Button>
                        <Button
                            className="mt-3 mt-lg-0"
                            variant="outline-info"
                            onClick={() => dispatch({type: "handleToggleEditTask"})}
                        >
                            Edit
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {
                isEditTask && <ActionsModal
                    editableTask={singleTask}
                    onHide={() => dispatch({type: "handleToggleEditTask"})}
                    onSubmit={handleReceivedEditTask}
                />
            }
            {
                loading && <Preloader/>
            }

        </>
    )
}

SingleTaskWithReducer.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    }),
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
    })

}

export default SingleTaskWithReducer;