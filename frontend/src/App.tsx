import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/utilities/Footer";
import LoadingScreen from "./components/utilities/LoadingScreen";

function App() {
  const navigator = useNavigate();
  const [page, setPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchPage = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response && !response.ok) {
      navigator("/auth/sign_in");
    }
  };
  const authToken = localStorage.getItem("authToken");
  const fetchData = async () => {
    setIsLoading(true);

    await Promise.all([fetchPage()]);

    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, page);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="App" data-testid="App">
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

export default App;
