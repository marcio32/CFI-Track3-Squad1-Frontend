import { useRouteLoaderData,} from "react-router-dom"
import { AdminRoutes } from "./Admin/AdminRoutes";
import { UserDashboard } from "./Private/UserDashboard";
import { PublicRoutes } from "./Public/PublicRoutes";

export const AuthStatus = () => {

    let { isLogged, userData } = useRouteLoaderData("root-router");

    if(!isLogged.logged ) {
        return <PublicRoutes/>
    }

    if (userData.roleId == 3) {
        return <UserDashboard />  
    }

    if (userData.roleId == 1) {
        return <AdminRoutes />
    }
}