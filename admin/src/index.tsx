import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ForgotPassword from "./components/ForgotPassword";
import HomePage from "./components/HomePage";
import ResetPassword from "./components/ResetPassword";
import SignIn from "./components/SignIn";
import AddCourse from "./components/course/AddCourse";
import Courses from "./components/course/Courses";
import UpdateCourse from "./components/course/UpdateCourse";
import Tags from "./components/tag/Tags";
import UserDetail from "./components/user/UserDetail";
import Users from "./components/user/Users";
import ErrorPage from "./components/utilities/ErrorPage";
import LoadingScreen from "./components/utilities/LoadingScreen";
import "./index.css";
import { AddUserForm } from "./components/user/AddUserForm";

const pca = new PublicClientApplication({
  auth: {
    // client id for localhost
    clientId: "a423badd-7501-4057-a0e1-b9479dce0ed5",

    //client id for hosted version
    // clientId: "4e1d9379-d4c4-49d1-be76-20b13d0af0b4",
    authority:
      "https://login.microsoftonline.com/05b07524-f2af-411a-b5a9-a5fee6228712",
    redirectUri: "/",
  },
  cache: {
    storeAuthStateInCookie: true,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <App />
      </Suspense>
    ),
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
        path: "addUser",
        element: <AddUserForm />,
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
        path: "error",
        element: <ErrorPage></ErrorPage>,
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
    <MsalProvider instance={pca}>
      <RouterProvider router={router}></RouterProvider>
    </MsalProvider>
  </React.StrictMode>
);
