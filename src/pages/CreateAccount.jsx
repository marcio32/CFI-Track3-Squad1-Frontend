import axios from "axios";

export const CreateAccount = () => {
  //agregar la lógica para que identifique el usuario una vez que tengamos la autenticación

  const handleCreateAccount = async (id) => {
    try {
      const requestData = {
        money: 0,
        userId: 1, //id,
      };
      await axios
        .post("https://localhost:7067/api/Account", JSON.stringify(requestData))
        .then((response) => {
          if (response.error && response.error[0] && response.error[0].error) {
            throw new Error(response.error[0].error);
          } else {
            throw new Error("Error desconocido en la respuesta");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateAccount}>Abrir cuenta</button>
    </div>
  );
};
