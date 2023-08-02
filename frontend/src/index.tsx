import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/auth/SignIn";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import LoadingScreen from "./components/utilities/LoadingScreen";
import "./index.css";

const pca = new PublicClientApplication({
  auth: {
    // client id for localhost
    // clientId: "e7b861be-ba37-4cef-9d07-c0c184cb681f",

    //client id for hosted version
    clientId: "e5c0e31e-e487-470b-a1af-828cd6a92ad6",
    authority:
      "https://login.microsoftonline.com/05b07524-f2af-411a-b5a9-a5fee6228712",
    redirectUri: "/",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const App = React.lazy(() => import("./App"));
const HomePage = React.lazy(() => import("./components/home/HomePage"));
const Courses = React.lazy(() => import("./components/courses/Courses"));
const Profile = React.lazy(() => import("./components/user/Profile"));
const CourseDetails = React.lazy(
  () => import("./components/courseDetails/CourseDetails")
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
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "course",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Courses />
          </Suspense>
        ),
      },
      {
        path: "course/:id",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <CourseDetails />
          </Suspense>
        ),
      },
      {
        path: "user",
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Profile />
          </Suspense>
        ),
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
