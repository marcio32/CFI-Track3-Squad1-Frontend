import axios from "axios";
import { useEffect, useState } from "react";

export const UpdateUser = (userId) => {
  //falta traer la data del user
  const [userData, setUserData] = useState({ state: null });

  const onFormChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7067/api/User/${userId}`, userData);
      alert("Datos actualizados.");
    } catch (error) {
      console.error(error);
      alert("No se actualizó la cuenta.");
    }
  };

  useEffect(() => {
    try {
      setUserData(axios.get(`https://localhost:7067/api/User/${userId}`));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <form action="">
        Crea tu usuario
        <label>
          Nombres:{" "}
          <input
            id="firstName"
            onChange={onFormChange}
            type="text"
            placeholder="Como en tu DNI..."
          />
        </label>
        <label>
          Apellidos:{" "}
          <input
            id="lastName"
            onChange={onFormChange}
            type="text"
            placeholder="Como en tu DNI..."
          />
        </label>
        <label>
          Dirección de mail:{" "}
          <input
            id="email"
            onChange={onFormChange}
            type="email"
            placeholder="mail@dominio.com..."
          />
        </label>
        <label>
          Contraseña: <input id="password" onChange={onFormChange} type="password" />
        </label>
      </form>
      <button onClick={onFormSubmit}>Crear usuario</button>
    </>
  );
};
