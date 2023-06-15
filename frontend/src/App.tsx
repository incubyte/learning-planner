import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/utilities/Footer";

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
      navigator("/auth/sign_in");
    }
  };
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    fetchPage();
  }, page);
  return (
    <div className="App" data-testid="App">
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

export default App;
