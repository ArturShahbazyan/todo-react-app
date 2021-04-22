import {Button, Card} from "react-bootstrap";
import s from "./singletask.module.css"
import dateFormatter from "../../../helpers/dateFormatter";
import PropTypes from "prop-types";
import ActionsModal from "../../Modals/ActionsModal/ActionsModal";
import Preloader from "../../Preloader/Preloader";
import {useCallback, useEffect} from "react";
import {connect} from "react-redux";
import {
    deleteSingleTaskThunk,
    editTaskThunk,
    setSingleTaskThunk, toggleEditModalThunk
} from "../../../redux/actions";


const SingleTask = (props) => {

    const {
        match,
        isEditTask,
        history,
        setSingleTask,
        singleTask,
        toggleEditModal,
        editTask,
        deleteSingleTask
    } = props;

    const {id} = match.params;

    useEffect(() => {
        setSingleTask(id, history);
    }, [id, history, setSingleTask]);


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
                                onClick={()=>deleteSingleTask(singleTask._id, history)}
                        >
                            Delete
                        </Button>
                        <Button
                            className="mt-3 mt-lg-0"
                            variant="outline-info"
                            onClick={() => toggleEditModal(singleTask, "singleTask")}
                        >
                            Edit
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {
                isEditTask && <ActionsModal
                    editableTask={singleTask}
                    onHide={() => toggleEditModal(singleTask, "singleTask")}
                    onSubmit={editTask}
                />
            }

        </>
    )
}

SingleTask.propTypes = {
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleEditModal: (singleTask, page) => dispatch(toggleEditModalThunk(singleTask, page)),
        setSingleTask: (id, history) => dispatch(setSingleTaskThunk(id, history)),
        editTask: (singleTask,page) => dispatch(editTaskThunk(singleTask, page)),
        deleteSingleTask: (singleTaskId, history) => dispatch(deleteSingleTaskThunk(singleTaskId, history))
    }
}

const SingleTaskWithHooksProvider = connect(mapStateToProps, mapDispatchToProps)(SingleTask);

export default SingleTaskWithHooksProvider;