import { useContext, useState } from "react";
import { CreateUser } from "./CreateUser";
import { UpdateUser } from "./UpdateUser";
import { Deposit } from "../account/Deposit";
import { GetAccount } from "../account/GetAccount";
import { Transfer } from "../account/Transfer";
import "./UserMain.css";
import { CreateAccount } from "../account/CreateAccount";
import { AuthContext } from "../../auth/AuthContext";

export const UserMain = () => {
  //tomar datos de usuario del storage
  const [view, setView] = useState("account");
  const { userData } = useContext(AuthContext);

  console.log(userData)
  let content;
  switch (view) {
    case "createUser":
      content = <CreateUser />;
      break;
    case "createAccount":
      content = <CreateAccount />;
      break;
    case "account":
      content = <GetAccount />;
      break;
    case "updateUser":
      content = <UpdateUser />;
      break;
    case "deposit":
      content = <Deposit />;
      break;
    case "transfer":
      content = <Transfer />;
      break;
    default:
      content = <div>Hola</div>;
  }

  return (
    <>
      <div className="wrapper">
        <div className="sideBar">
          <div className="user-information">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
            <p className="user-email">{userData.userEmail}</p>
            </div>
          <div className="sidebar-element" onClick={() => setView("createAccount")}>Crear Cuenta</div>
          <div className="sidebar-element" onClick={() => setView("account")}>Mi cuenta</div>
          <div className="sidebar-element" onClick={() => setView("updateUser")}>Editar perfil</div>
          <div className="sidebar-element" onClick={() => setView("deposit")}>Depositar</div>
          <div className="sidebar-element" onClick={() => setView("transfer")}>Transferir</div>
        </div>
        <div className="view">{content}</div>
      </div>
    </>
  );
};
