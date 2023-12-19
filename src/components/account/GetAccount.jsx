import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import "../../assets/myAccount.css";

export const GetAccount = () => {
  //falta traer la info del usuario
  const { userData } = useContext(AuthContext);
  const [accountId, setAccountId] = useState("");

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    try {
      axios
        .get(`https://localhost:7067/api/account/details/${userData.userId}`)
        .then((response) => {
          setAccountId(response.data.data.id);
        })
        .catch((error) => {
          console.error(error);
        });
      axios
        .get(`https://localhost:7067/api/account/${accountId}`)
        .then((response) => {
          setAmount(response.data.data.money);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, [accountId]);

  return (
    <>
      <h2 className="greeting"> Tu billetera </h2>
      <section className="myAcc">
        <div className="amount-logo">
          <p className="amount-logo-p">CA</p>
        </div>
        <div className="account-info">
          <p className="amount-p"> ${amount}</p>
          <p className="account-id"> N° cuenta:  {accountId}</p></div>
      </section>
      <section className="movements">
        <h3 className="movements-title">Mis movimientos</h3>
        <div className="movements-div">
          <p className="movement-element">Fecha</p>
          <p className="movement-element">Descripción</p>
          <p className="movement-element">Monto</p>
        </div>
      </section>
    </>
  );
};
