import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const navigator = useNavigate();

  const fetchCourses = async () => {
    const response = await fetch("http://localhost:5000/", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (response.ok) {
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
