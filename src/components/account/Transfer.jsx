import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";

export const Transfer = () => {
  const { userData, isLogged: { jwt } } = useContext(AuthContext);

  const [myAccountId, setMyAccountId] = useState("");
  const [myAmount, setMyAmount] = useState(0);
  const [transferData, setTransferData] = useState({
    accountReceptorId: 0,
    money: 0,
  });

  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${jwt}`
    }

    axios.get(`https://localhost:7067/api/account/details/${userData.userId}`, { headers })
      .then((response) => {
        const accountId = response.data.data.id;
        setMyAccountId(accountId);
        return axios.get(`https://localhost:7067/api/account/${accountId}`, { headers });
      })
      .then((response) => {
        setMyAmount(response.data.data.money);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [jwt, userData]);

  const onTransferDataChange = (e) => {
    setTransferData({ ...transferData, [e.target.id]: e.target.value });
  };

  const onTransferSubmitt = async () => {
    const headers = {
      'Authorization': `Bearer ${jwt}`
    }
    try {
      await axios.post(`https://localhost:7067/api/Account/transfer/${myAccountId}`, transferData, { headers });
      alert("Transferencia realizada con éxito.");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al realizar la transferencia.");
    }
  };

  return (
    <>
      <div>Transferir</div>
      <section className="transfer">
        <div className="right">
          <div>Cuenta de origen: {myAccountId}</div>
          <div>Saldo: {myAmount}</div>
        </div>

        <div className="left">
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
        </div>
      </section>

      <button onClick={onTransferSubmitt}>Transferir</button>
    </>
  );
};
