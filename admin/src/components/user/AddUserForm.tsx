import Navbar from "../utilities/Navbar";

export const AddUserForm = () => {
  return (
    <>
      <Navbar
        isCourse={true}
        isHome={false}
        isProfile={false}
        isUser={true}
        isTag={false}
      ></Navbar>
    </>
  );
};
