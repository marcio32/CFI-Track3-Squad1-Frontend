import { useContext } from 'react';
import React from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useUser } from '../../hooks/useUser';
import "../../assets/Navbar.css"
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png'

export const CustomNav = () => {

  const { isLogged } = useContext(AuthContext);
  const { logout } = useUser();

  return (
    <React.Fragment>
      <section className="navbar">
        <div className="left-side">
          <Link to='/'>
            <img className='logo' src={Logo} alt="" />
          </Link>
        </div>
        {!isLogged.logged ?
          <Link  className='link-login-nav' to="/">
            <div className="right-side">
              Login
            </div>
          </Link> :
          <Link  className='link-login-nav' to="/" onClick={logout}>
            <div className="right-side">
              Cerrar sesion
            </div>
          </Link>
        }
      </section>
    </React.Fragment>
  )
};
