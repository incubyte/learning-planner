import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import HomePage from "./components/HomePage";
import "./index.css";
import Courses from "./components/courses/Courses";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children: [
      {
        path: "",
        element: <App></App>,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "signin",
        element: <SignIn></SignIn>,
      },
    ],
  },
  {
    path: "/course",
    children: [
      {
        path: "",
        element: <Courses></Courses>,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
