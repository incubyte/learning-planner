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
      <div>
        <h1
          className="text-center pt-10 text-3xl font-bold"
          data-testid="addUserHeading"
        >
          Add User
        </h1>
      </div>
    </>
  );
};
