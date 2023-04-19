import "./App.css";
import Navbar from "./components/utilities/Navbar";

function App() {
  return (
    <div className="App" data-testid="HomeNav">
      <Navbar
        isCourse={true}
        isHome={false}
        isProfile={true}
        isSearch={false}
      ></Navbar>
    </div>
  );
}

export default App;
