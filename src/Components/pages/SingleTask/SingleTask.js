import React from "react";
import {Button, Card} from "react-bootstrap";
import s from "./singletask.module.css"
import dateFormatter from "../../../helpers/date";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import ActionsModal from "../../Modals/ActionsModal/ActionsModal";
import Preloader from "../../Preloader/Preloader";

class SingleTask extends React.Component {
    state = {
        singleTask: null,
        hasError: false,
        isEditTask: false,
        isLoading: false
    }

    loading = (isLoad) => {
        this.setState({
            isLoading: !isLoad
        });
    }

    componentDidMount() {

        const {id} = this.props.match.params;

        this.loading(this.state.isLoading);

        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                this.setState({
                    singleTask: data
                })
            }).catch(err => {
            this.setState({
                hasError: true
            })
            console.error("Single Task Response Error::", err);
        })
            .finally(() => {
                this.loading(this.state.isLoading);
            });
    }

    handleGoBack = () => {
        const {history} = this.props;
        history.goBack();
    }

    handleDeleteSingleTask = () => {
        const singleTaskId = this.state.singleTask._id;
        const {history} = this.props;

        this.loading(this.state.isLoading);

        fetch(`http://localhost:3001/task/${singleTaskId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                history.push("/");
            }).catch(err => {
            console.error("Delete Single Task Request Error::", err)
        });
    }

    handleToggleEditTask = () => {
        this.setState({
            isEditTask: !this.state.isEditTask
        })
    }

    handleReceivedEditTask = (editedTask) => {

        this.loading(this.state.isLoading);

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
                this.setState({
                    singleTask: data
                })
            })
            .catch(err => console.error("Single Task Response Error::", err))
            .finally(() => {
                this.loading(this.state.isLoading);
            });
    }

    render() {

        const {singleTask, isEditTask, hasError, isLoading} = this.state;

        if (hasError) {
            return <Redirect to="/404"/>
        }

        if (!singleTask || isLoading) return <Preloader/>;


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
                        <div className="mt-5">
                            <Button
                                variant="outline-secondary"
                                className="mr-3"
                                onClick={this.handleGoBack}>
                                Go Back
                            </Button>
                            <Button variant="outline-danger"
                                    className="mr-3"
                                    onClick={this.handleDeleteSingleTask}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="outline-info"
                                onClick={this.handleToggleEditTask}
                            >
                                Edit
                            </Button>
                        </div>
                    </Card.Body>
                </Card>

                {
                    isEditTask && <ActionsModal
                        editableTask={singleTask}
                        onHide={this.handleToggleEditTask}
                        onSubmit={this.handleReceivedEditTask}
                    />
                }
            </>
        )
    }
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

export default SingleTask;