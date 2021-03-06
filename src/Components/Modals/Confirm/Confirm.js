import {Modal, Button} from 'react-bootstrap';
import PropTypes from "prop-types";

const Confirm = ({onHide, tasksCount, onDeleteTasks}) => {

    const handleDeleteAndClose = () => {
        onDeleteTasks();
        onHide()
    }

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton> {tasksCount} </Modal.Header>
            <div className="p-3 d-flex justify-content-end">
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="info" onClick={handleDeleteAndClose} className="ml-2">
                    Confirm
                </Button>
            </div>
        </Modal>
    )
}

Confirm.propTypes = {

    onHide: PropTypes.bool.isRequired,
    onDeleteTasks: PropTypes.bool.isRequired,
    tasksCount:PropTypes.number.isRequired
}

export default Confirm;