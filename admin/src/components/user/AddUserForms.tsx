import { useState } from "react";
import Navbar from "../utilities/Navbar";
import AddSingleUserForm from "./AddSingleUserForm";
import AddMultipleUsersForm from "./AddMultipleUsersForm";
import "../../css/user/addUserForms.css";

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
      <div className="SelectionContainer">
        <label className="SelectionLable" data-testid="multipleUserText">
          <input
            type="radio"
            value="option1"
            data-testid="radio1"
            checked={selectedOption === "option1"}
            onChange={handleRadioButtonChange}
            className="SelectionRadioButton"
          />
          Add Multiple User
        </label>
        <label className="SelectionLable" data-testid="singleUserText">
          <input
            type="radio"
            data-testid="radio2"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={handleRadioButtonChange}
            className="SelectionRadioButton"
          />
          Add Single User
        </label>
      </div>

      {selectedOption === "option1" && (
        <div className="lg:px-10 md:px-10">
          <AddMultipleUsersForm />
        </div>
      )}
      {selectedOption === "option2" && (
        <div className="px-10">
          <AddSingleUserForm />
        </div>
      )}
    </>
  );
};
