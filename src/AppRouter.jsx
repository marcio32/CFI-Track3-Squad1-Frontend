import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./components/login/Login";
import "./AppRouter.css";
import { AuthProvider } from "./auth/AuthContext";

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
