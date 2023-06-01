import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigator = useNavigate();

  const [page, setPage] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const fetchPage = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      navigator("/auth/sign_in");
    }
  };
  useEffect(() => {
    fetchPage();
  }, page);
  return (
    <>
      <div className="App">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
