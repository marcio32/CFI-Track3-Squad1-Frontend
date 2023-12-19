import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import "../../assets/myAccount.css";

export const GetAccount = () => {
  //falta traer la info del usuario
  const { userData, isLogged: { jwt } } = useContext(AuthContext);
  const [accountDetails, setAccountDetails] = useState({
    id: null,
    money: null,
  });

  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${jwt}`
    }

    axios.get(`https://localhost:7067/api/account/details/${userData.userId}`, { headers })
      .then((response) => {
        const accountId = response.data.data.id;
        return axios.get(`https://localhost:7067/api/account/${accountId}`, { headers });
      })
      .then((response) => {
        setAccountDetails({
          id: response.data.data.id,
          money: response.data.data.money,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [jwt, userData]);

return (
  <>
    <h2 className="greeting"> Tu billetera </h2>
    <section className="myAcc">
      <div className="amount-logo">
        <p className="amount-logo-p">CA</p>
      </div>
      <div className="account-info">
        <p className="amount-p"> ${accountDetails.money}</p>
        <p className="account-id"> N° cuenta:  {accountDetails.id}</p></div>
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
