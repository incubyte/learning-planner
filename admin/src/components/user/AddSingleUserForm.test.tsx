import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddSingleUserForm from "./AddSingleUserForm";

describe("Display Add User Page", () => {
  test("renders form container", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AddSingleUserForm />
      </BrowserRouter>
    );
    const formContainer = getByTestId("formContainer");
    expect(formContainer).toBeInTheDocument();
  });

  test("renders email id input", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <AddSingleUserForm />
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
        <AddSingleUserForm />
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
        <AddSingleUserForm />
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
        <AddSingleUserForm />
      </BrowserRouter>
    );
    const clientTeamInput = getByTestId("clientTeamInput");
    expect(clientTeamInput).toBeInTheDocument();

    const clientTeamInputPlaceholder =
      getByPlaceholderText("Enter client team");
    expect(clientTeamInputPlaceholder).toBeInTheDocument();
  });
  test("renders client team input", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <AddSingleUserForm />
      </BrowserRouter>
    );
    const projectTeamInput = getByTestId("projectTeamInput");
    expect(projectTeamInput).toBeInTheDocument();

    const projectTeamInputPlaceholder =
      getByPlaceholderText("Enter project team");
    expect(projectTeamInputPlaceholder).toBeInTheDocument();
  });

  test("renders roles selection", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AddSingleUserForm />
      </BrowserRouter>
    );
    const roleSelect = getByTestId("roleSelect");
    expect(roleSelect).toBeInTheDocument();
    const roleSelectOption1 = getByTestId("roleSelectOption1");
    expect(roleSelectOption1).toBeInTheDocument();
    const roleSelectOption2 = getByTestId("roleSelectOption2");
    expect(roleSelectOption2).toBeInTheDocument();
  });

  test("submits the form", async () => {
    const { getByTestId, getAllByText } = render(
      <BrowserRouter>
        <AddSingleUserForm />
      </BrowserRouter>
    );

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });
    const submitButton = getByTestId("submitButton");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = getAllByText("User added");
      expect(successMessage[0]).toBeInTheDocument();
    });
  });
});
