import { useState } from "react";
import Navbar from "../utilities/Navbar";
import "../../css/user/addUserForm.css";
import AddSingleUserForm from "./AddSingleUserForm";
import AddMultipleUsersForm from "./AddMultipleUsersForm";

export const AddUserForms = () => {
  const [selectedOption, setSelectedOption] = useState("option2");
  const handleRadioButtonChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Navbar
        isCourse={true}
        isHome={false}
        isProfile={false}
        isUser={true}
        isTag={false}
      ></Navbar>
      <div className="flex flex-col lg:flex-row md:flex-row justify-center text-center pt-10 text-xl lg:text-2xl md:text-2xl font-bold gap-5">
        <label className="mx-3 cursor-pointer" data-testid="multipleUserText">
          <input
            type="radio"
            value="option1"
            data-testid="radio1"
            checked={selectedOption === "option1"}
            onChange={handleRadioButtonChange}
            className="mx-1 h-4 w-4 lg:h-5 lg:w-5 md:h-5 md:w-5"
          />
          Add Multiple User
        </label>
        <label className="mx-3 cursor-pointer" data-testid="singleUserText">
          <input
            type="radio"
            data-testid="radio2"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={handleRadioButtonChange}
            className="mx-1 h-4 w-4 lg:h-5 lg:w-5 md:h-5 md:w-5"
          />
          Add Single User
        </label>
      </div>

      {selectedOption === "option1" && (
        <>
          <AddMultipleUsersForm />
        </>
      )}
      {selectedOption === "option2" && (
        <div className="px-10">
          <AddSingleUserForm />
        </div>
      )}
    </>
  );
};
