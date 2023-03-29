import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [courses, setCourses] = useState([]);

  const navigator = useNavigate();
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    axios
      .get("http://localhost:5000/", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then(() => {})
      .catch((error) => {
        navigator("/auth/signin");
      });
  }, courses);

  return (
    <>
      <div>HomePage</div>
      <Outlet></Outlet>
    </>
  );
};

export default HomePage;
