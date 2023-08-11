import { render } from "@testing-library/react";
import { AddUserForm } from "./AddUserForm";
import { BrowserRouter } from "react-router-dom";

describe("Display Add User Page", () => {
  test("renders heading", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AddUserForm />
      </BrowserRouter>
    );
    const formContainer = getByTestId("formContainer");
    expect(formContainer).toBeInTheDocument();
    const addUserHeading = getByTestId("addUserHeading");
    expect(addUserHeading).toBeInTheDocument();
  });

  test("renders email id input", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <AddUserForm />
      </BrowserRouter>
    );
    const emailInput = getByTestId("emailInput");
    expect(emailInput).toBeInTheDocument();

    const emailInputPlaceholder = getByPlaceholderText("Enter email id");
    expect(emailInputPlaceholder).toBeInTheDocument();
  });
});
