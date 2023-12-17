import axios from "axios";
import { useEffect, useState } from "react";

export const Roles = () => {
  const [role, setRole] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("https://localhost:7067/api/Role");
        setRole(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <div>Roles</div>
      {role.length &&
        role.map((r) => {
          return (
            <div className="roleCard" key={r.id}>
              <h3>{r.name}</h3>
              <p>{r.description}</p>
            </div>
          );
        })}
    </>
  );
};
