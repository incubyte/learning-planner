import Navbar from "../utilities/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar
        isCourse={true}
        isHome={false}
        isProfile={true}
        isSearch={false}
      ></Navbar>
    </>
  );
};

export default HomePage;
