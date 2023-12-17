import { Table } from "react-bootstrap";
import PropTypes from 'prop-types'
import { formatDate } from "../../helpers/formatedDate";

export const CustomTable = ({ data }) => {
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
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
CustomTable.propTypes = {
    data: PropTypes.array.isRequired
}