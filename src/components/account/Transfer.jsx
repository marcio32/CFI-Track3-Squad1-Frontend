import axios from "axios";
import { useEffect, useState } from "react";

export const Transfer = () => {
  const [remoteAccount, setRemoteAccount] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);

  const myAccountId = 2; //traer info de usuario
  const [myAmount, setMyAmount] = useState(0);

  useEffect(() => {
    try {
      axios
        .get(`https://localhost:7067/api/account/${myAccountId}`)
        .then((response) => {
          setMyAmount(response.data.data.money);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, [myAccountId]);

  const onRemoteAccountChange = (e) => {
    setRemoteAccount(e.target.value);
  };

  const onTransferAmountChange = (e) => {
    setTransferAmount(e.target.value);
  };

  const onTransferSubmitt = async () => {
    try {
      await axios.post(`https://localhost:7067/api/account/transfer/${remoteAccount}`, {
        accountReceptorId: remoteAccount,
        money: transferAmount,
      });
      await axios.post(
        `https://localhost:7067/api/account/extract/${myAccountId}?money=${transferAmount}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>Transferir</div>
      <div>Cuenta de origen: {myAccountId}</div>
      <div>Saldo: {myAmount}</div>
      <div>
        Cuenta de destino:
        <input
          id="remoteAccount"
          onChange={onRemoteAccountChange}
          type="number"
          placeholder="N° de cuenta"
        />
      </div>
      <div>
        Monto a transferir: $
        <input
          id="transferAmount"
          onChange={onTransferAmountChange}
          type="number"
          placeholder="Ingrese el monto a transferir"
        />
      </div>
      <button onClick={onTransferSubmitt}>Transferir</button>
    </>
  );
};
