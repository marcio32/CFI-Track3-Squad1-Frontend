import { useContext } from 'react';
import React from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useUser } from '../../hooks/useUser';
import "../../assets/Navbar.css"

export const CustomNav = () => {

  const { isLogged } = useContext(AuthContext);
  const { logout } = useUser();

  return (
    <React.Fragment>
      <section className="navbar">
        <div className="left-side">
          <a href="/">
            <div className="firstCircle"></div>
            <div className="secondCircle"></div>
          </a>
        </div>
        <div className="right-side">
          {!isLogged.logged ?
            <a href="/"> Login </a> :
            <a href="/" onClick={logout}>Cerrar sesion</a>
          }
        </div>
      </section>
      </React.Fragment>


    // <Navbar expand="lg" className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand href="#home">Fuego Cash</Navbar.Brand>
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         {!isLogged.logged ?
    //           <Nav.Link href="/"> Login </Nav.Link> :
    //           <Nav.Link href="/" onClick={logout}>Cerrar sesion</Nav.Link>
    //         }
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  )
};
