import React from "react";
import {Button, Card} from "react-bootstrap";
import s from "./singletask.module.css"
import dateFormatter from "../../../helpers/date";
import PropTypes from "prop-types";

class SingleTask extends React.Component {
    state = {
        singleTask: null
    }

    componentDidMount() {

        const {id} = this.props.match.params;

        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                this.setState({
                    singleTask: data
                })
            }).catch(err => console.error("Single Task Response Error::", err))
    }

    handleGoBack = () => {
        const {history} = this.props;
        history.goBack();
    }

    handleDeleteSingleTask = () => {
        const singleTaskId = this.state.singleTask._id;
        const {history} = this.props;

        fetch(`http://localhost:3001/task/${singleTaskId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                history.push("/");
            }).catch(err => console.error("Delete Single Task Request Error::", err));
    }

    render() {

        const {singleTask} = this.state;

        if (!singleTask) {
            return <div className="text-center">
                <span>Loading...</span>
            </div>
        }

        return (
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
                        >
                            Edit
                        </Button>
                    </div>
                </Card.Body>
            </Card>
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