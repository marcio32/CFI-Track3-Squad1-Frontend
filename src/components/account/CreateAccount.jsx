import axios from "axios";

export const CreateAccount = (userId) => {
  const user = {
    money: 0,
    userId: userId,
  };
  const handleCreateAccount = async () => {
    try {
      await axios.post("https://localhost:7067/api/account", user);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="crateAccount">Para crear tu cuenta haz click </div>
      <button onClick={handleCreateAccount}>Aquí!</button>
    </>
  );
};
