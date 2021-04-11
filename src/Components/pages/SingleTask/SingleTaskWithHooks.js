import {Button, Card} from "react-bootstrap";
import s from "./singletask.module.css"
import dateFormatter from "../../../helpers/date";
import PropTypes from "prop-types";
import ActionsModal from "../../Modals/ActionsModal/ActionsModal";
import Preloader from "../../Preloader/Preloader";
import {useCallback, useEffect} from "react";
import {connect} from "react-redux";
import actionTypes from "../../../redux/actionTypes";
import {
    deleteTaskDetails,
    editSingleTaskThunk,
    setSingleTaskThunk
} from "../../../redux/actions";


const SingleTaskWithHooks = (props) => {

    const {
        match,
        isEditTask,
        isLoad,
        history,
        setSingleTask,
        singleTask,
        toggleEditTask,
        editSingleTask,
        deleteSingleTask
    } = props;

    useEffect(() => {
        const {id} = match.params;

        setSingleTask(id, history);

    }, [match.params, history, setSingleTask]);


    const handleDeleteSingleTask = useCallback(() => {

        const singleTaskId = singleTask._id;

        deleteSingleTask(singleTaskId, history)

    }, [singleTask, history, deleteSingleTask]);


    const handleReceivedEditTask = useCallback((editedTask) => {
        editSingleTask(editedTask);
    }, [editSingleTask]);


    const handleGoBack = useCallback(() => {
        history.goBack();
    }, [history]);


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
                            onClick={() => toggleEditTask()}
                        >
                            Edit
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {
                isEditTask && <ActionsModal
                    editableTask={singleTask}
                    onHide={() => toggleEditTask()}
                    onSubmit={handleReceivedEditTask}
                />
            }
            {
                isLoad && <Preloader/>
            }

        </>
    )
}

SingleTaskWithHooks.propTypes = {
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

const mapStateToProps = (state) => {
    return {
        singleTask: state.singleTaskState.singleTask,
        isEditTask: state.singleTaskState.isEditTask,
        isLoad: state.commonState.isLoad
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleEditTask: () => dispatch({type: actionTypes.TOGGLE_EDIT_TASK}),
        setSingleTask: (id, history) => dispatch(setSingleTaskThunk(id, history)),
        editSingleTask: (editedTask) => dispatch(editSingleTaskThunk(editedTask)),
        deleteSingleTask: (singleTaskId, history) => dispatch(deleteTaskDetails(singleTaskId, history))
    }
}


const SingleTaskWithHooksProvider = connect(mapStateToProps, mapDispatchToProps)(SingleTaskWithHooks);

export default SingleTaskWithHooksProvider;