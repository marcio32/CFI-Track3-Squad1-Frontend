import { useState } from "react"
import { useUser } from "../../hooks/useUser"

export const Login = () => {

    const { login } = useUser();
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
        login(userData);
    }

    return (
        <>
            <form onSubmit={handleSubmitLogin}>
                <label htmlFor="email">Ingrese su email</label>
                <input id="email" type="text" name="email" value={userData.email} onChange={handleInputChange} />
                <label htmlFor="password">Ingrese su password</label>
                <input id="password" type="text" name="password" value={userData.password} onChange={handleInputChange} />
                <button>Enviar</button>
            </form>
        </>
    )
}