import { useEffect, useState } from "react"
import { getUsers } from "../../selectors/userServices.mjs";
import { Button, Card, } from "react-bootstrap";
import AvatarIcon from '../../assets/vector-profile-line-black-icon.jpg'
import './adminRoute.css'

export const AdminRoute = () => {

    const [users, setUsers] = useState([]);
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        getUsers()
            .then(data =>
                setUsers(data)
            )
            .catch(err => {
                setHasError(true);
            })
    }, [])

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
                            <Button variant="danger">Eliminar</Button>
                        </Card.Body>
                    </Card>
                ))}
            </section>
        </>
    )
}