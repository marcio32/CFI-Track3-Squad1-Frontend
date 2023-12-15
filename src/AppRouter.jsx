import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Roles } from "./pages/Roles";
import "./AppRouter.css";
import { AdminRoute } from "./Routes/Admin/AdminRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  /*Para crear rutas una vez generado el .jsx dupliquen la estructura indicando el path y realicen la importación correspondiente
  {
    path: "/ejemplo",
    element: <Ejemplo />,
  },
  */
  {
    path: "/",
    element: <AdminRoute />,
  },
  {
    path: "/roles",
    element: <Roles />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
