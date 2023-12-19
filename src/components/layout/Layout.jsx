import { AuthStatus } from "../../Routes/AuthStatus"
import { CustomNav } from "../navBar/CustomNav"

export const Layout = () => {
    return (
        <>
            <CustomNav />
            <main className="main-layout">
                <AuthStatus />
            </main>
        </>
    )
}