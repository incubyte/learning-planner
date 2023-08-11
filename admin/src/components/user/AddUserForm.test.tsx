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

  test("renders employee id input", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <AddUserForm />
      </BrowserRouter>
    );
    const employeeIdInput = getByTestId("employeeIdInput");
    expect(employeeIdInput).toBeInTheDocument();

    const employeeIdInputPlaceholder =
      getByPlaceholderText("Enter employee id");
    expect(employeeIdInputPlaceholder).toBeInTheDocument();
  });

  test("renders designation input", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <AddUserForm />
      </BrowserRouter>
    );
    const designationInput = getByTestId("designationInput");
    expect(designationInput).toBeInTheDocument();

    const designationInputPlaceholder =
      getByPlaceholderText("Enter designation");
    expect(designationInputPlaceholder).toBeInTheDocument();
  });

  test("renders client team input", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <AddUserForm />
      </BrowserRouter>
    );
    const clientTeamInput = getByTestId("clientTeamInput");
    expect(clientTeamInput).toBeInTheDocument();

    const clientTeamInputPlaceholder =
      getByPlaceholderText("Enter client team");
    expect(clientTeamInputPlaceholder).toBeInTheDocument();
  });

  test("renders roles selection", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AddUserForm />
      </BrowserRouter>
    );
    const roleSelect = getByTestId("roleSelect");
    expect(roleSelect).toBeInTheDocument();
    const roleSelectOption1 = getByTestId("roleSelectOption1");
    expect(roleSelectOption1).toBeInTheDocument();
    const roleSelectOption2 = getByTestId("roleSelectOption2");
    expect(roleSelectOption2).toBeInTheDocument();
  });
});
