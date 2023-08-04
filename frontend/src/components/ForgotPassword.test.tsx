import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

afterEach(() => {
  cleanup();
});

describe("Forgot Paassword Component", () => {
  test("Forgot Image is present in forgot", () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    const forgotImage = screen.getByTestId("forgotImage") as HTMLInputElement;
    expect(forgotImage).toBeInTheDocument();
  });
  test("Forgot Header is present in forgot", () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    const forgotHeader = screen.getByTestId("forgotHeader") as HTMLInputElement;
    expect(forgotHeader).toBeInTheDocument();
  });
  test("Forgot Header text is 'Forget password'", () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    const forgotHeader = screen.getByTestId("forgotHeader") as HTMLInputElement;
    expect(forgotHeader.innerHTML).toEqual("Forget password");
  });

  test("Forgot Form is present in forgot", () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    const forgotForm = screen.getByTestId("forgotForm") as HTMLInputElement;
    expect(forgotForm).toBeInTheDocument();
  });
});
