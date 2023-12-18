import { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'
import { AuthContext } from '../../auth/AuthContext';
import { useUser } from '../../hooks/useUser';

export const CustomNav = () => {

  const { isLogged } = useContext(AuthContext);
  const { logout } = useUser();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Fuego Cash</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isLogged.logged ?
              <Nav.Link href="/"> Login </Nav.Link> :
              <Nav.Link href="/" onClick={logout}>Cerrar sesion</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};
