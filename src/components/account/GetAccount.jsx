import axios from "axios";
import { useEffect, useState } from "react";

export const GetAccount = () => {
  //falta traer la info del usuario
  const accountId = 2;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    try {
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
