import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const navigator = useNavigate();

  const fetchCourses = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
        // Accept: "application/json, text/plain, */*",
      },
      // mode: "no-cors",
    });
    if (response.ok) {
      console.log(response);
    } else {
      navigator("/auth/signin");
    }
  };

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    fetchCourses();
  }, courses);

  return (
    <>
      <div>HomePage</div>
      <Outlet></Outlet>
    </>
  );
};

export default HomePage;
