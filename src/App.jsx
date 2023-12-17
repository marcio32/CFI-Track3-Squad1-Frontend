import AppRouter from "./Routes/AppRouter";
import { AuthProvider } from "./auth/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
}
export default App;