import axios from "axios";
import { useState } from "react";

export const CreateUser = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    roleId: 3,
  });

  const onFormChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7067/api/User", form);
      setForm({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        roleId: 3,
      });
      alert("Cuenta creada.");
    } catch (error) {
      console.error(error);
      alert("No se creó la cuenta.");
    }
  };

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
