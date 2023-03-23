import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmailIcon from "./icons/Email";
import Input from "./Input";

afterEach(() => {
  cleanup();
});

describe("Input Component", () => {
  test("Input is editable", () => {
    render(
      <BrowserRouter>
        <Input
          Id="email"
          dataTestId="inputEmail"
          icon={EmailIcon}
          placeholder="email"
          type="text"
          showPasswordButton={false}
        />
      </BrowserRouter>
    );
    const inputEmail = screen.getByTestId("inputEmail") as HTMLInputElement;
    fireEvent.change(inputEmail, {
      target: { value: "testing" },
    });
    expect(inputEmail.value).toMatch("testing");
  });
  test("Show Password Button is not present on email", () => {
    render(
      <BrowserRouter>
        <Input
          Id="email"
          dataTestId="inputEmail"
          icon={EmailIcon}
          placeholder="email"
          type="text"
          showPasswordButton={false}
        />
      </BrowserRouter>
    );
    const inputEmail = screen.getByTestId("inputEmail") as HTMLInputElement;

    expect(inputEmail).toBeInTheDocument();
  });

  test("Show Password Button is present on password", () => {
    render(
      <BrowserRouter>
        <Input
          Id="password"
          dataTestId="inputPassword"
          icon={EmailIcon}
          placeholder="password"
          type="text"
          showPasswordButton={true}
        />
      </BrowserRouter>
    );
    const inputPasswordButton = screen.getByTestId(
      "inputPasswordButton"
    ) as HTMLInputElement;

    expect(inputPasswordButton).toBeInTheDocument();
  });
});
