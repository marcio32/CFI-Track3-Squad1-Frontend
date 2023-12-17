import { useRouteLoaderData,} from "react-router-dom"
import { Login } from "../components/login/Login";
import { AdminRoutes } from "./Admin/AdminRoutes";
import { UserDashboard } from "./Private/UserDashboard";
import { PublicRoutes } from "./Public/PublicRoutes";

export const AuthStatus = () => {

    let { isLogged, userData } = useRouteLoaderData("root-router");

    if (!isLogged.logged) {
        return <Login />
    }

    if (userData.roleId == 3) {
        return <UserDashboard />  
    }

    if (userData.roleId == 1) {
        return <AdminRoutes />
    }
}