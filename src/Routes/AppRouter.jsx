import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Layout } from "../components/layout/Layout";
import { Login } from "../components/login/Login";
import { AdminRoutes } from './Admin/AdminRoutes';
import { CreateUser } from '../components/user/CreateUser'
import { UserDashboard } from "./Private/UserDashboard";

function AppRouter() {
  const { isLogged, userData } = useContext(AuthContext)
  console.log(userData)
  const router = createBrowserRouter([

    {
      id: "root-router",
      path: "/",
      loader() {
        return { isLogged, userData}
      },
      Component: Layout,
      children : [
        {
          index: true,
          Component: Login
        },
        {
          path: "/register",
          Component: CreateUser,
        }, 
        {
          path: "/admin",
          Component: AdminRoutes
        }
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default AppRouter;
