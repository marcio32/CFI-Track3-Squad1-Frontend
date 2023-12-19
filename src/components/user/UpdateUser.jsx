import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "../../assets/edit.css";
import { AuthContext } from "../../auth/AuthContext";

export const UpdateUser = ({ userId }) => {
  //falta traer la data del user
  const [userData, setUserData] = useState({ state: null });
  const { isLogged: { jwt } } = useContext(AuthContext)

  const onFormChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const onFormSubmit = async (e) => {

    const headers = {
      'Authorization': `Bearer ${jwt}`
    }
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7067/api/User/${userId}`, userData,
        { headers });
      alert("Datos actualizados.");
    } catch (error) {
      console.error(error);
      alert("No se actualizó la cuenta.");
    }
  };

  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${jwt}`
    }
    try {
      setUserData(axios.get(`https://localhost:7067/api/User/${userId}`, { headers }));
    } catch (error) {
      console.error(error);
    }
  }, [jwt, userId]);

  return (
    <>
      <section className="edit">
        <h2 className="edit-profile-title">Editar perfil</h2>
        <form action="">
          <div>
            <label>
              Nombre
              <input className="input-login"
                id="firstName"
                onChange={onFormChange}
                type="text"
                placeholder="Como en tu DNI..."
              />
            </label>
            <label>
              Apellido
              <input className="input-login"
                id="lastName"
                onChange={onFormChange}
                type="text"
                placeholder="Como en tu DNI..."
              />
            </label>
          </div>

          <div>
            <label>
              Dirección de mail
              <input className="input-login"
                id="email"
                onChange={onFormChange}
                type="email"
                placeholder="mail@dominio.com..."
              />
            </label>
            <label>
              Contraseña
              <input className="input-login" id="password" onChange={onFormChange} type="password" />
            </label>
          </div>
        </form>
        <button onClick={onFormSubmit}> Modificar </button>
      </section>
    </>
  );
};
