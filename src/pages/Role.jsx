import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Role = () => {
  const { id } = useParams();
  const [role, setRole] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`https://localhost:7067/api/role/${id}`);
        setRole(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <div className="rol">
      <h3>{role.name}</h3>
      <p>{role.description}</p>
    </div>
  );
};
