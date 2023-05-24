import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./components/SignIn";
import AddUser from "./components/user/AddUser";
import Users from "./components/user/Users";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/addUser",
        element: <AddUser />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "signin",
        element: <SignIn></SignIn>,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
