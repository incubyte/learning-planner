import { useNavigate } from "react-router-dom";
import Navbar from "../utilities/Navbar";
import LeaderBoard from "./LeaderBoard";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [page, setPage] = useState([]);

  const navigator = useNavigate();
  const fetchPage = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      navigator("/auth/signin");
    }
  };
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    fetchPage();
  }, page);
  return (
    <>
      <Navbar
        isCourse={true}
        isHome={false}
        isProfile={true}
        isSearch={false}
      ></Navbar>
      <LeaderBoard />
    </>
  );
};

export default HomePage;
