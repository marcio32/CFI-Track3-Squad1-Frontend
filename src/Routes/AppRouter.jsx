import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Layout } from "../components/layout/Layout";
import { Login } from "../components/login/Login";
import { AdminRoutes } from './Admin/AdminRoutes';
import { UserDashboard } from "./Private/UserDashboard";
import { CreateUser } from "../components/user/CreateUser";
import { Deposit } from "../components/account/Deposit";

function AppRouter() {
  const { isLogged, userData } = useContext(AuthContext)

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
          path: "/dashboard",
          Component: UserDashboard,
        },
        {
          path: "/register",
          Component: CreateUser
        },
        {
          path:"/depositar",
          Component: Deposit
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
