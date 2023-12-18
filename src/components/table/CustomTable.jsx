import { Table, Button } from "react-bootstrap";
import { formatDate } from "../../helpers/formatedDate";
import PropTypes from 'prop-types'
import { useState } from "react";
import { CustomModal } from "../modal/CustomModal";
import { deleteAccount, editAccount } from "../../selectors/accountServices.mjs";


export const CustomTable = ({ data }) => {

    const [accountId, setAccountId] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModal2, setIsOpenModal2] = useState(false);
    const [deleteResponse, setDeleteResponse] = useState('');
    const [updateResponse, setUpdateResponse] = useState('');
    const [accountData, setAccountData] = useState({
        money: 0,
        isBlocked: false,
        userId: 0
    })

    const handleCloseModal = () => setIsOpenModal(false);
    const handleCloseModal2 = () => setIsOpenModal2(false);

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount(accountId);
            setDeleteResponse('Se ah eliminado la cuenta.')
        }
        catch (error) {
            setDeleteResponse('Ocurrio un error intente nuevamente por favor.')
        }
    }

    const handleUpdateAccount = async () => {
        try {
            await editAccount(accountId, accountData);
            setUpdateResponse('Se ah modificado la cuenta.')
        }
        catch (error) {
            setUpdateResponse('Ocurrio un error intente nuevamente por favor.')
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAccountData({
            ...accountData,
            [name]: value,
        })
    }
    console.log(accountData.isBlocked)
    const handleCheboxChange = (event) => {
        const { name, checked } = event.target;
        setAccountData({
            ...accountData,
            [name]: checked
        });
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th> N° Cuenta </th>
                    <th> Creacion </th>
                    <th> Dinero </th>
                    <th> Estado </th>
                    <th> N° Usuario </th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, index) => (
                    <tr key={index}>
                        <td>{e.id}</td>
                        <td>{formatDate(e.creationDate)}</td>
                        <td>{e.money}</td>
                        <td>{e.isBlocked ? "Bloqueado" : "Activo"}</td>
                        <td>{e.userId}</td>
                        <td><Button onClick={() => { setAccountId(e.id), setIsOpenModal2(true) }}>Editar</Button></td>
                        <td><Button variant="danger" onClick={() => { setAccountId(e.id), setIsOpenModal(true) }}>Baja</Button></td>
                    </tr>
                ))}
                <CustomModal isOpen={isOpenModal}
                    onClose={handleCloseModal}
                    title="Baja de cuenta"
                    body={!deleteResponse ? `Va a dar de baja la cuenta numero ${accountId}` : deleteResponse}
                    onAccept={() => handleDeleteAccount()}
                />
                <CustomModal isOpen={isOpenModal2}
                    onClose={() => { handleCloseModal2(), setUpdateResponse(null) }}
                    title="Modificacion de cuenta"
                    body={!updateResponse ?
                        <>
                            <label htmlFor="input-money">Dinero</label>
                            <input id="input-money" type="decimal" placeholder="Dinero" name="money" value={accountData.money} onChange={handleInputChange} />
                            <label htmlFor="input-checbox">Bloquear</label>
                            <input id="input-checbox" type="checkbox" name="isBlocked" onChange={handleCheboxChange} />
                            <label htmlFor="input-user-id">N° Usuario</label>
                            <input id="input-user-id" type="number" placeholder="Numero usuario" name="userId" value={accountData.userId} onChange={handleInputChange} />
                        </> :
                        updateResponse
                    }
                    onAccept={() => handleUpdateAccount()}
                />
            </tbody>
        </Table>
    );
}

CustomTable.propTypes = {
    data: PropTypes.array.isRequired
}
