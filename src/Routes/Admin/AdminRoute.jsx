
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap";

import { UserCard } from "../../components/cards/UserCards";
import { CustomModal } from "../../components/modal/CustomModal";

import { deleteUser, getUsers } from "../../selectors/userSerivces.mjs";
import { getAccount } from "../../selectors/accountServices.mjs";
import './adminRoute.css'

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
            <h1> Listado de usuarios </h1>
            <section className="users-card">
                {!hasError ?
                    users.length > 0 ? users.map((user, index) => (
                        <UserCard key={index}
                            user={user}
                            onSelectUser={() => { handleSelecteUser(user), setIsOpenModal(true)}}
                            onShowDescription={handleShowDescription}
                        />
                    )) :
                        <>
                            < Spinner animation="border" />
                            <p>Un momento por favor, estamos cargando la información</p>
                        </>
                    :
                    <h2> Error cargando la información, intente nuevamente por favor.</h2>
                }
                <CustomModal
                    isOpen={isOpenModal}
                    onClose={() => { handleCloseModal(); setDeleteResponse('')}}
                    title="Baja de usuario"
                    body={!deleteResponse ? `Va a dar de baja al usuario ${userName}` : deleteResponse}
                    onAccept={() => handleDeleteUser(userId)}
                />
                <CustomModal
                    isOpen={isOpenModal2}
                    onClose={() => handleCloseModal2()}
                    title="Información de usuario"
                    body={
                        hasAccount ? (
                            <>
                                <p className="modal-message"> Numero de cuenta: {userAccount.id} </p>
                                <p className="modal-message"> Creado el: {userAccount.date}</p>
                                <p className="modal-message"> Estado de la cuenta: {userAccount.active ? 'Activo' : 'Bloqueado'}</p>
                                <p className="modal-message"> Dinero en la cuenta: ${userAccount.money}</p>
                            </>
                        ) : (
                            <p> El usuario aún no tiene registrado una cuenta a su nombre </p>
                        )
                    }
                    onAccept={() => setIsOpenModal2(false)}
                />
            </section>
        </>
    )
}