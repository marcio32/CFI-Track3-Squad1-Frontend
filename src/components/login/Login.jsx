import { useState } from "react"
import { useUser } from "../../hooks/useUser"
import { Spinner } from "react-bootstrap";
import "../../assets/login.css";

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
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" name="email" value={userData.email} onChange={handleInputChange} />
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" type="password" name="password" value={userData.password} onChange={handleInputChange} />
                    {isLoading.loading ?
                        <Spinner /> :
                        <button>Iniciar sesion </button>
                    }
                    {isLoading.status === 401 ? "Usuario o contraseña incorrectos" : isLoading.status}
                </form>
            </section>

        </>
    )
}