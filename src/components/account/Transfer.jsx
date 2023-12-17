import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";

export const Transfer = () => {
  const { userData } = useContext(AuthContext);

  const [myAccountId, setMyAccountId] = useState("");
  const [myAmount, setMyAmount] = useState(0);
  // const [remoteAccount, setRemoteAccount] = useState("");
  // const [transferAmount, setTransferAmount] = useState(0);
  const [transferData, setTransferData] = useState({
    accountReceptorId: 0,
    money: 0,
  });

  useEffect(() => {
    try {
      axios
        .get(`https://localhost:7067/api/account/details/${userData.userId}`)
        .then((response) => {
          setMyAccountId(response.data.data.id);
        })
        .catch((error) => {
          console.error(error);
        });
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
  }, [myAmount]);

  // const onRemoteAccountChange = (e) => {
  //   setRemoteAccount(e.target.value);
  // };

  // const onTransferAmountChange = (e) => {
  //   setTransferAmount(e.target.value);
  // };
  const onTransferDataChange = (e) => {
    setTransferData({ ...transferData, [e.target.id]: e.target.value });
  };

  const onTransferSubmitt = async () => {
    try {
      await axios.post(`https://localhost:7067/api/Account/transfer/${myAccountId}`, transferData);
      alert("Transferencia realizada con éxito.");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al realizar la transferencia.");
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
          id="accountReceptorId"
          onChange={onTransferDataChange}
          type="number"
          placeholder="N° de cuenta"
        />
      </div>
      <div>
        Monto a transferir: $
        <input
          id="money"
          onChange={onTransferDataChange}
          type="number"
          placeholder="Ingrese el monto a transferir"
        />
      </div>
      <button onClick={onTransferSubmitt}>Transferir</button>
    </>
  );
};
