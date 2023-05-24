import Navbar from "../utilities/Navbar";

const Users = () => {
  return (
    <>
      <Navbar
        isCourse={true}
        isHome={false}
        isProfile={true}
        isUser={false}
      ></Navbar>
    </>
  );
};

export default Users;
