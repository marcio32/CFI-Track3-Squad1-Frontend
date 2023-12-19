import { useState } from "react"
import { useUser } from "../../hooks/useUser"
import { Spinner } from "react-bootstrap";
import "../../assets/login.css";
import { Link } from "react-router-dom";

export const Login = () => {

    const { isLoading, setIsLoading, login } = useUser();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        setIsLoading({});
        login(userData);
    }

    return (
        <>
            <section className="login">
                <form onSubmit={handleSubmitLogin}>
                    <label className="label-login" htmlFor="email">Email</label>
                    <input className="input-login" id="email" type="text" name="email" value={userData.email} onChange={handleInputChange} />
                    <label className="label-login" htmlFor="password">Contraseña</label>
                    <input className="input-login" id="password" type="password" name="password" value={userData.password} onChange={handleInputChange} />
                    {isLoading.loading ?
                        <Spinner /> :
                        <button>Iniciar sesion </button>
                    }
                    <p className="error-login-message">
                        {isLoading.status === 401 ? "Usuario o contraseña incorrectos" : isLoading.status}
                    </p>
                </form>
                <p className="register-p-link"> ¿No tiene una cuenta? <Link to="/register">Registrese</Link>
                </p>
            </section>
            <section className="login-image">
                <h1 className="login-main-title">
                    El poder de tener todo en un solo lugar
                </h1>
                <div className="border-text"></div>
            </section>
        </>
    )
}