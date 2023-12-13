import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import "./AppRouter.css";

const router = createBrowserRouter([
  /*Para crear rutas una vez generado el .jsx dupliquen la estructura indicando el path y realicen la importación correspondiente
  {
    path: "/ejemplo",
    element: <Ejemplo />,
  },
  */
  {
    path: "/login",
    element: <Login />,
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
