import axios from "axios";
import { useContext, useState, useEffect } from "react";
import "../../assets/Deposit.css";
import { AuthContext } from "../../auth/AuthContext";

export const Deposit = () => {

  const { userData, isLogged: { jwt }} = useContext(AuthContext);
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState(0);

  const onAmountChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${jwt}`
    }

    axios.get(`https://localhost:7067/api/account/details/${userData.userId}`, { headers })
        .then((response) => {
          setAccountId(response.data.data.id);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [jwt, userData]);

  const onDepositSubmitt = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`https://localhost:7067/api/account/deposit/${accountId}?money=${amount}`);
      alert("Depósito realizado con éxito.");
    } catch (error) {
      console.error(error);
      alert("Depósito no realizado.");
    }
  };

  return (
    <>
      <section className="deposit">
        <h2 className="deposit-title">Ingresar dinero</h2>
        <form onSubmit={onDepositSubmitt}>
          <label className="label-deposit" htmlFor="input-deposit">Por favor indica la cantidad de dinero que vas a ingresar a tu cuenta</label>
          <input className="input-login" id="input-deposit" type="number" onChange={onAmountChange} />
          <button>Ingresar</button>
        </form>
      </section>
    </>
  );
};
