import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Login } from "./components/login/Login";
import "./AppRouter.css";
import { AuthProvider } from "./auth/AuthContext";

import { Roles } from "./pages/Roles";
import "./AppRouter.css";
import { AdminRoute } from "./Routes/Admin/AdminRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { Role } from "./pages/Role";

const router = createBrowserRouter([
  /*Para crear rutas una vez generado el .jsx dupliquen la estructura indicando el path y realicen la importación correspondiente
  {
    path: "/ejemplo",
    element: <Ejemplo />,
  },
  */
  {
    path: "/",

    element: <AdminRoute />,
  },
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
