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
import LoadingScreen from "./components/utilities/LoadingScreen";
import "./index.css";

const pca = new PublicClientApplication({
  auth: {
    clientId: "a423badd-7501-4057-a0e1-b9479dce0ed5",
    authority:
      "https://login.microsoftonline.com/05b07524-f2af-411a-b5a9-a5fee6228712",
    redirectUri: "/",
  },
  cache: {
    // cacheLocation: "localStorage",
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
    <MsalProvider instance={pca}>
      <RouterProvider router={router}></RouterProvider>
    </MsalProvider>
  </React.StrictMode>
);
