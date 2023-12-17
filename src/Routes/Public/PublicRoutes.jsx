import { CreateUser } from "../../components/user/CreateUser";
import { Deposit } from "../../components/account/Deposit";
import { Login } from "../../components/login/Login";

export const PublicRoutes = () => {

    const { pathname } = window.location;

    if (pathname == "/register") {
        return <CreateUser />
    } else if (pathname == "/depositar") {
        return <Deposit />
    } else {
        return <Login/>
    }
    
}
