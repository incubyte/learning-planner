import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  return (
    <>
      <Outlet></Outlet>
      <div className="App">admin</div>
    </>
  );
}

export default App;
