import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import EmailIcon from "./icons/Email";
import PasswordIcon from "./icons/Password";
import Input from "./Input";

afterEach(() => {
  cleanup();
});

describe("Input Component", () => {
  test("input is present in Input", () => {
    render(
      <BrowserRouter>
        <Input
          Id="test"
          dataTestId="inputTest"
          icon={EmailIcon}
          placeholder="test"
          type="text"
          showPasswordButton={false}
        />
      </BrowserRouter>
    );
    const inputTest = screen.getByTestId("inputTest") as HTMLInputElement;
    expect(inputTest).toBeInTheDocument();
  });
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

    userEvent.type(inputEmail, "testing");

    expect(inputEmail.value).toMatch("testing");
  });

  test("Show Password Button is present on password", () => {
    render(
      <BrowserRouter>
        <Input
          Id="password"
          dataTestId="inputPassword"
          icon={PasswordIcon}
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

  test("Default type for Password is password ", () => {
    render(
      <BrowserRouter>
        <Input
          Id="password"
          dataTestId="inputPassword"
          icon={PasswordIcon}
          placeholder="password"
          showPasswordButton={true}
        />
      </BrowserRouter>
    );

    const inputPassword = screen.getByTestId(
      "inputPassword"
    ) as HTMLInputElement;
    expect(inputPassword.type).toBe("password");
  });

  test("toggle Password type when show button clicked", async () => {
    render(
      <BrowserRouter>
        <Input
          Id="password"
          dataTestId="inputPassword"
          icon={PasswordIcon}
          placeholder="password"
          type="text"
          showPasswordButton={true}
        />
      </BrowserRouter>
    );

    const inputPassword = screen.getByTestId(
      "inputPassword"
    ) as HTMLInputElement;

    const inputPasswordButton = screen.getByTestId(
      "inputPasswordButton"
    ) as HTMLButtonElement;

    expect(inputPassword.type).toBe("password");

    await act(() => {
      userEvent.click(inputPasswordButton);
    });

    expect(inputPassword.type).toBe("text");

    await act(() => {
      userEvent.click(inputPasswordButton);
    });

    expect(inputPassword.type).toBe("password");
  });
});
