import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Roles } from "./pages/Roles";
import "./AppRouter.css";
import { Role } from "./pages/Role";
import { CreateAccount } from "./pages/CreateAccount";

const router = createBrowserRouter([
  /*Para crear rutas una vez generado el .jsx dupliquen la estructura indicando el path y realicen la importación correspondiente
  {
    path: "/ejemplo",
    element: <Ejemplo />,
  },
  */
  //User routes:
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/createaccount",
    element: <CreateAccount />,
  },
  //Admin routes:
  {
    path: "/roles",
    element: <Roles />,
  },
  {
    path: "/role/:id",
    element: <Role />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
