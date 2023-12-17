
import { useEffect, useState } from "react"
import { deleteUser, getUsers } from "../../selectors/userSerivces.mjs";
import { Button, Card, Modal } from "react-bootstrap";


import AvatarIcon from '../../assets/vector-profile-line-black-icon.jpg'
import './adminRoute.css'
import { getAccount } from "../../selectors/accountServices.mjs";

export const AdminRoute = () => {

    const [users, setUsers] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [hasAccount, setHasAccount] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModal2, setIsOpenModal2] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);
    const [deleteResponse, setDeleteResponse] = useState('');
    const [userAccount, setUserAccount] = useState({
        id: '',
        date: '',
        money: '',
        active: '',
    })

    const handleCloseModal = () => setIsOpenModal(false);
    const handleCloseModal2 = () => setIsOpenModal2(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();
                setUsers(data.data);
            } catch (err) {
                setHasError(true);
            }
        };
        fetchData();
    }, []);

    const handleSelecteUser = (user) => {
        setUserName(user.firstName);
        setUserId(user.id);
    }

    const handleDeleteUser = async () => {
        try {
            await deleteUser(userId);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            setDeleteResponse('Usuario eliminado.')
        }
        catch (err) {
            setDeleteResponse('Ocurrio un error intente nuevamente por favor.')
        }
    }

    const handleShowDescription = async (user_id) => {
        try {
            const data = await getAccount(user_id);
            setUserAccount({
                id: data.data.id,
                date: data.data.creationDate,
                money: data.data.money,
                active: data.data.isBlocked
            })
            setIsOpenModal2(true);
            setHasAccount(true)
            
        }
        catch (err) {
            setHasAccount(false);
            setIsOpenModal2(true)
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
                            <Button variant="info" onClick={() => handleShowDescription(user.id)}> Informacion
                            </Button>
                            <Button variant="danger" onClick={() => { handleSelecteUser(user), setIsOpenModal(true) }}> Baja
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
                <Modal show={isOpenModal} onHide={() => { handleCloseModal(), setDeleteResponse('') }}>
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
                <Modal show={isOpenModal2} onHide={() => handleCloseModal2()}>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title> Informacion de usuario</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            { hasAccount ? <>
                                <p className="modal-message"> Numero de cuenta : {userAccount.id} </p>
                                <p className="modal-message"> Creado : {userAccount.date}</p>
                                <p className="modal-message"> Estado de la cuenta : {userAccount.active ? "Activo " : "Bloqueado"}</p>
                                <p className="modal-message"> Dinero en la cuenta : ${userAccount.money}</p>
                            </>
                                :
                                <p> El usuario aun no tiene registrado una cuenta a su nombre </p>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => handleCloseModal2()}>Cerra</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </section>
        </>
    )
}