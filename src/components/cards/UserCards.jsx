import { Card, Button } from "react-bootstrap";
import AvatarIcon from '../../assets/vector-profile-line-black-icon.jpg'
import PropTypes from 'prop-types'

export const UserCard = ({ user, onSelectUser, onShowDescription }) => {
    return (
        <Card>
            <Card.Img variant="top" src={AvatarIcon} />
            <Card.Body>
                <Card.Title> {user.firstName + ' ' + user.lastName}</Card.Title>
                <Card.Text> {user.email}</Card.Text>
                <Card.Text> {user.role.name}</Card.Text>
                <Button variant="info" onClick={() => onShowDescription(user.id)}> Informacion
                </Button>
                <Button variant="danger" onClick={() => onSelectUser(user)}> Baja
                </Button>
            </Card.Body>
        </Card>
    )
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    onShowDescription: PropTypes.func.isRequired,
    onSelectUser: PropTypes.func.isRequired,
};