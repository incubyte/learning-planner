import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

import LoadingScreen from "./components/utilities/LoadingScreen";
import "./index.css";

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
        path: "signup",
        element: <SignUp></SignUp>,
      },
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
