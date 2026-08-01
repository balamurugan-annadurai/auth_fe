import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";

const App = () => {

  const status = localStorage.getItem("isLoggedIn");

  const [isLoggedIn, setIsLoggedIn] = useState(status === "true");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    },
    {
      path: "/login",
      element: <Login setIsLoggedIn={setIsLoggedIn} />
    },
    {
      path: "/register",
      element: <Register setIsLoggedIn={setIsLoggedIn} />
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/reset-password/:token",
      element: <ResetPassword />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
};

export default App;