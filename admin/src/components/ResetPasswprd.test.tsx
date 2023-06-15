import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ResetPassword from "./ResetPassword";

afterEach(() => {
  cleanup();
});

describe("reset Paassword Component", () => {
  test("reset Image is present in reset", () => {
    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>
    );
    const resetImage = screen.getByTestId("resetImage") as HTMLInputElement;
    expect(resetImage).toBeInTheDocument();
  });
  test("reset Header is present in reset", () => {
    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>
    );
    const resetHeader = screen.getByTestId("resetHeader") as HTMLInputElement;
    expect(resetHeader).toBeInTheDocument();
  });
  test("reset Header text is 'Reset Password'", () => {
    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>
    );
    const resetHeader = screen.getByTestId("resetHeader") as HTMLInputElement;
    expect(resetHeader.innerHTML).toEqual("Reset Password");
  });

  test("reset Form is present in reset", () => {
    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>
    );
    const resetForm = screen.getByTestId("resetForm") as HTMLInputElement;
    expect(resetForm).toBeInTheDocument();
  });
});
