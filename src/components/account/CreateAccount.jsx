import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import "../../assets/account.css";

export const CreateAccount = () => {
  const { userData } = useContext(AuthContext);
  const [accountId, setAccountId] = useState(null);
  console.log(userData);
  console.log(accountId);

  const user = {
    money: 0,
    userId: userData.userId,
  };

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
    } catch (error) {
      console.error(error);
    }
  }, [accountId, userData.userId]);

  const handleCreateAccount = async () => {
    try {
      await axios.post("https://localhost:7067/api/account", user);
      alert("Cuenta creada.");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear la cuenta.");
    }
  };
  return (
    <>
      {accountId != null ? (
        <div>Ya tiene una cuenta activa</div>
      ) : (
        <section className="create">
          <div className="createAccount">Para crear tu cuenta haz click </div>
          <button onClick={handleCreateAccount}>Aquí!</button>
        </section>
      )}
    </>
  );
};
