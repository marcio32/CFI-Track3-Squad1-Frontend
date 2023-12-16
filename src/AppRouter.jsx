import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Login } from "./components/login/Login";
import "./AppRouter.css";
import { AuthContext, AuthProvider } from "./auth/AuthContext";

import { Roles } from "./pages/Roles";
import "./AppRouter.css";
import { AdminRoute } from "./Routes/Admin/AdminRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { Role } from "./pages/Role";
import { useContext } from "react";

const router = createBrowserRouter([
  /*Para crear rutas una vez generado el .jsx dupliquen la estructura indicando el path y realicen la importación correspondiente
  {
    path: "/ejemplo",
    element: <Ejemplo />,
  },
  */
  {
    path: "/",

    element: <Login />,
  },
  /*{
    
    path: "post/create",  Como usuario standard quiero agregar un usuario
    element: <Crear usuario>
    
  },
  {
    
    path: "post/createAccount",  Como usuario standard quiero crear una cuenta
    element: <Crear cuenta>
    
  },
  {
    
    path: "post/depositar",  Como usuario standard quiero depositar dinero a mi cuenta
    element: <Depositar>
    
  },
  {
  
    path: "post/transferir",  Como usuario standard quiero transferir dinero a otra cuenta
    element: <Transferir>
    
  },*/
  {
    path: "/admin",
    element: <AdminRoute />
    // agregar eliminacion de usuario y vista activos/ inactivos
  },
  {
    path: "/roles",
    element: <Roles />,
  },
  {
    path: "/role/:id",
    element: <Role />,
  },
  /*
  {
    
    path: "get/accounts",  Como administrador quiero ver todas las cuentas
    element: <ver account>
     añadir cuentas en el detalle del usuario para simplicar las pestañas
    
  },
  {
    
    path: "deletet/eliminarCuenta",  Como administrador quiero eliminar una cuenta
    element: <Eliminar cuenta>
    
  },
  {
    
    path: "put/editarCuenta", Como administrador quiero editar una cuenta
    element: <Editar Cuenta>
   
},*/
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
