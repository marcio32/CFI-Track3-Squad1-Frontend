import { useState } from "react";
import { CreateUser } from "./CreateUser";
import { UpdateUser } from "./UpdateUser";
import { Deposit } from "../account/Deposit";
import { GetAccount } from "../account/GetAccount";

export const UserMain = () => {
  //tomar datos de usuario del storage
  const [view, setView] = useState("account");

  let content;
  switch (view) {
    case "createAccount":
      content = <CreateUser />;
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
      content = <CreateUser />;
      break;
    default:
      content = <div>Hola</div>;
  }

  return (
    <>
      <div className="sideBar">
        <div onClick={() => setView("createAccount")}>Crear Cuenta</div>
        <div onClick={() => setView("account")}>Ver mi cuenta</div>
        <div onClick={() => setView("updateUser")}>Actualizar datos</div>
        <div onClick={() => setView("deposit")}>Depositar</div>
        <div onClick={() => setView("transfer")}>Transferir</div>
      </div>
      <div className="view">{content}</div>
    </>
  );
};
