import axios from "axios";
import { useState } from "react";
import "../../assets/Deposit.css";

export const Deposit = () => {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState(0);

  const onAccountIdChange = (e) => {
    setAccountId(e.target.value);
  };
  const onAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const onDepositSubmitt = async () => {
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
        <div>Deposit</div>
        <form action="">
          <label>Número de cuenta: </label>
          <input type="number" onChange={onAccountIdChange} />
          <label>Monto: </label>
          <input type="number" onChange={onAmountChange} />
          <button onClick={onDepositSubmitt}>Depositar</button>
        </form>
      </section>
    </>
  );
};
