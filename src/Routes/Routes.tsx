import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Calculator from "../Components/Calculator";
import { CalculatorForm } from "../Components/CalculatorForm";
import Success from "../Pages/Success/Success";
import NotFoundPage from "../Pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/success",
    element: <Success />,
  },
]);
