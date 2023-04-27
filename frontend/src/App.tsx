import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/utilities/Footer";

function App() {
  return (
    <div className="App" data-testid="App">
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

export default App;
