
import { useContext, useEffect, useState } from "react"
import { Spinner } from "react-bootstrap";

import { deleteUser, getUsers } from "../selectors/userSerivces.mjs";
import { getAccount } from "../selectors/accountServices.mjs";
import { formatDate } from "../helpers/formatedDate";

import { UserCard } from "../components/cards/UserCards";
import { CustomModal } from "../components/modal/CustomModal";
import { AuthContext } from "../auth/AuthContext";

export const Users = () => {

    const { isLogged } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [hasError, setHasError] = useState(null);
    const [hasAccount, setHasAccount] = useState();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModal2, setIsOpenModal2] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [deleteResponse, setDeleteResponse] = useState('');
    const [userInformation, setUserInformation] = useState({
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
                const data = await getUsers(isLogged.jwt);
                setUsers(data.data);
            } catch (err) {
                setHasError(true);
            }
        };
        fetchData();
    }, [isLogged]);

    const handleDeleteUser = async () => {
        try {
            await deleteUser(selectedUser.id);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUser.id));
            setDeleteResponse('Usuario eliminado.')
        }
        catch (err) {
            setDeleteResponse('Ocurrio un error intente nuevamente por favor.')
        }
    }

    const handleShowDescription = async (userId) => {
        try {
            const data = await getAccount(userId);
            setUserInformation({
                account: data.data.id,
                date: formatDate(data.data.creationDate),
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
                            onSelectUser={() => { setSelectedUser(user), setIsOpenModal(true) }}
                            onShowDescription={() => { setSelectedUser(user), handleShowDescription(user.id) }}
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
                    onClose={() => { handleCloseModal(); setDeleteResponse('') }}
                    title="Baja de usuario"
                    body={!deleteResponse ? `Va a dar de baja al usuario ${selectedUser.firstName}` : deleteResponse}
                    onAccept={() => handleDeleteUser()}
                />
                <CustomModal
                    isOpen={isOpenModal2}
                    onClose={() => { handleCloseModal2(), setSelectedUser({})}}
                    title="Información de usuario"
                    body={
                        isOpenModal2 && (
                            hasAccount ?
                                <>
                                    <p className="modal-message"> Usuario numero: {selectedUser.id} </p>
                                    <p className="modal-message"> Estado usuario : {selectedUser.isActive ? "Activo" : "Inactivo"} </p>
                                    <p className="modal-message"> Rol : {selectedUser.role.name} </p>
                                    <p className="modal-message"> Numero de cuenta: {userInformation.account} </p>
                                    <p className="modal-message"> Creado el: {userInformation.date}</p>
                                    <p className="modal-message"> Estado de la cuenta: {userInformation.active ? 'Activo' : 'Bloqueado'}</p>
                                    <p className="modal-message"> Dinero en la cuenta: ${userInformation.money}</p>
                                </>
                                :
                                <>
                                    <p className="modal-message"> Usuario numero: {selectedUser.id} </p>
                                    <p className="modal-message"> Estado usuario : {selectedUser.isActive ? "Activo" : "Inactivo"} </p>
                                    <p className="modal-message"> Rol : {selectedUser.role.name} </p>
                                    <p> El usuario aún no tiene registrado una cuenta a su nombre </p>
                                </>
                        )
                    }
                    onAccept={() => setIsOpenModal2(false)}
                />
            </section>
        </>
    )
}