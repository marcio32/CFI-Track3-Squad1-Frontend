import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import "../../assets/account.css";

export const CreateAccount = () => {
  const { userData, isLogged: { jwt } } = useContext(AuthContext);
  const [accountId, setAccountId] = useState(null);

  const user = {
    money: 0,
    userId: userData.userId,
  };

  useEffect(() => {
    const fetchAccountId = async () => {
      const headers = {
        'Authorization': `Bearer ${jwt}`
      };

      try {
        const response = await axios.get(`https://localhost:7067/api/account/details/${userData.userId}`, { headers });
        setAccountId(response.data.data.id);
      } catch (error) {
        console.error(error);
      }
    };

    if (!accountId) {
      fetchAccountId();
    }
  }, [accountId, jwt, userData.userId]);

  const handleCreateAccount = async () => {
    const headers = {
      'Authorization': `Bearer ${jwt}`
    };

    try {
      await axios.post("https://localhost:7067/api/account", user, { headers });
      alert("Cuenta creada.");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear la cuenta.");
    }
  };

  return (
    <>
      {accountId != null ? (
        <p className="p-have-account">Ya tiene una cuenta activa</p>
      ) : (
        <section className="create">
          <div className="createAccount">Para crear tu cuenta haz click </div>
          <button onClick={handleCreateAccount}>Aquí!</button>
        </section>
      )}
    </>
  );
};
