import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { AddUserForms } from "./AddUserForms";

describe("Display radio button", () => {
  test("on clicking radiobutton of add multiple user file upload form should be there", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AddUserForms />
      </BrowserRouter>
    );
    const radioButtonForMultipleUser = getByTestId("radio1");
    expect(radioButtonForMultipleUser).toBeInTheDocument();

    const LableForMulUserForm = getByTestId("multipleUserText");
    expect(LableForMulUserForm).toBeInTheDocument();

    await waitFor(async () => {
      await fireEvent.click(radioButtonForMultipleUser);
      const mulUserForm = getByTestId("fileContainer");
      expect(mulUserForm).toBeInTheDocument();
    });
  });
  test("on clicking radiobutton of add single user file upload form should be there", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AddUserForms />
      </BrowserRouter>
    );
    const radioButtonForSingleUser = getByTestId("radio2");
    expect(radioButtonForSingleUser).toBeInTheDocument();

    const LableForSingleUserForm = getByTestId("singleUserText");
    expect(LableForSingleUserForm).toBeInTheDocument();

    await waitFor(async () => {
      await fireEvent.click(radioButtonForSingleUser);
      const singleUserForm = getByTestId("formContainer");
      expect(singleUserForm).toBeInTheDocument();
    });
  });
});
