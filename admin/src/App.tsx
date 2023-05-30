import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  const navigator = useNavigate();

  const [page, setPage] = useState([]);
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
      <Outlet></Outlet>
      <div className="App">admin</div>
    </>
  );
}

export default App;
