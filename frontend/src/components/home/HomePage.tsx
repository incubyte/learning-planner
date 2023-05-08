import Navbar from "../utilities/Navbar";
import LeaderBoard from "./LeaderBoard";

const HomePage = () => {
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
