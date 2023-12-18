import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";

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
      <div>Mi cuenta: </div>
      <div>Número de cuenta: {accountId}</div>
      <div>Saldo: $ {amount}</div>
    </>
  );
};
