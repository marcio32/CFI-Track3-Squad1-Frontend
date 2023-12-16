import { useContext, useEffect, useState } from "react"
import { deleteUser, getUsers } from "../../selectors/userSerivces.mjs";
import { Button, Card, Modal } from "react-bootstrap";
import { AuthContext } from '../../auth/AuthContext'
import AvatarIcon from '../../assets/vector-profile-line-black-icon.jpg'
import './adminRoute.css'

export const AdminRoute = () => {

    const [users, setUsers] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);
    const [deleteResponse, setDeleteResponse] = useState('');

    const handleCloseModal = () => setIsOpenModal(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setHasError(true);
            }
        };
        fetchData();
    }, []);

    const handleSelecteUser = (user) => {
        setUserName(user.firstName);
        setUserId(user.id);
        setIsOpenModal(true);
    }

    const handleDeleteUser = async () => {
        try {
            await deleteUser(userId);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            setDeleteResponse('Usuario eliminado.')
        } catch (err) {
            setDeleteResponse('Ocurrio un error intente nuevamente por favor.')
        }
    }

    return (
        <>
            <h1> Bienvenido Admin </h1>
            <section className="users-card">
                {users.length > 0 && users.map((user, index) => (
                    <Card key={index}>
                        <Card.Img variant="top" src={AvatarIcon} />
                        <Card.Body>
                            <Card.Title> {user.firstName + ' ' + user.lastName}</Card.Title>
                            <Card.Text> {user.email}</Card.Text>
                            <Card.Text> {user.role.name}</Card.Text>
                            <Button variant="danger" onClick={() => handleSelecteUser(user)}> Baja
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
                <Modal show={isOpenModal} onHide={() => { handleCloseModal(), setDeleteResponse('')}}>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title> Baja de usuario</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="modal-message"> {!deleteResponse ? `Va a dar de baja al usuario ${userName}` : deleteResponse} </p>
                        </Modal.Body>
                        {!deleteResponse ?
                            <Modal.Footer>
                                <Button variant="secondary">Cancelar</Button>
                                <Button variant="primary" onClick={handleDeleteUser}>Aceptar</Button>
                            </Modal.Footer>
                            : null}
                    </Modal.Dialog>
                </Modal>
            </section>
        </>
    )
}