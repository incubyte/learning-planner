import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import UserDetail from "./components/user/UserDetail";
import Users from "./components/user/Users";
import "./index.css";
import Courses from "./components/course/Courses";
import AddCourse from "./components/course/AddCourse";
import UpdateCourse from "./components/course/UpdateCourse";
import Tags from "./components/tag/Tags";
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
      {
        path: "/courses",
        element: <Courses></Courses>,
      },
      {
        path: "/addCourse",
        element: <AddCourse></AddCourse>,
      },
      {
        path: "/updateCourse",
        element: <UpdateCourse></UpdateCourse>,
      },
      {
        path: "/tags",
        element: <Tags></Tags>,
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
