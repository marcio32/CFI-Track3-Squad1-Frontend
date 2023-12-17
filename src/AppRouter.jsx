import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContext, AuthProvider } from "./auth/AuthContext";
import { useContext } from "react";

import { Login } from "./components/login/Login";
import { CreateUser } from "./components/user/CreateUser";
import { AdminRoute } from "./Routes/Admin/AdminRoute";
import { Roles } from "./pages/Roles";
import { Role } from "./pages/Role";
import "./AppRouter.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Role } from "./pages/Role";
import { useContext } from "react";
import { CreateUser } from "./components/createUser/CreateUser";
import { CustomNav } from "./components/navBar/Navbar";

const router = createBrowserRouter([
      {
        path: "/",
        Component: Login
      },
      {
        path: "/register",
        Component: CreateUser,
      }


function App() {
  return (
    <>
      <AuthProvider>
        <CustomNav/>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
