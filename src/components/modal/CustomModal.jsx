import { Modal, Button } from "react-bootstrap";
import PropTypes from 'prop-types';

export const CustomModal = ({ isOpen, onClose, title, body, onAccept }) => (
    <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {body}
        </Modal.Body>
        <Modal.Footer>
            {title == 'Información de usuario' ?
                <Button variant="primary" onClick={onAccept}>Aceptar</Button>
                :
                <>
                    <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button variant="primary" onClick={onAccept}>Aceptar</Button>
                </>
            }
        </Modal.Footer>
    </Modal>
);

CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.oneOfType([PropTypes.object, PropTypes.string.isRequired]),
    onAccept: PropTypes.func.isRequired
}