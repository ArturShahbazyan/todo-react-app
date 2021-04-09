import {Modal, Button} from 'react-bootstrap';
import PropTypes from "prop-types";

const Confirm = ({onHide, tasksCount, onDeleteTasks}) => {

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton> {tasksCount} </Modal.Header>
            <div className="p-3 d-flex justify-content-end">
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="info" onClick={onDeleteTasks} className="ml-2">
                    Confirm
                </Button>
            </div>
        </Modal>
    )
}

Confirm.propTypes = {

    onHide: PropTypes.func.isRequired,
    onDeleteTasks: PropTypes.func.isRequired,
    tasksCount:PropTypes.string.isRequired
}

export default Confirm;