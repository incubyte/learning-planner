import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import UserDetail from "./components/user/UserDetail";
import Users from "./components/user/Users";
import "./index.css";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/user/:id",
        element: <UserDetail />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "sign_in",
        element: <SignIn></SignIn>,
      },
      {
        path: "forgot_password",
        element: <ForgotPassword />,
      },
      {
        path: "reset_password/:token",
        element: <ResetPassword />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
