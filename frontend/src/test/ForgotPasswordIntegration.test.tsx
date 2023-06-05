import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";

afterEach(() => {
  cleanup();
});

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("test forgotpassword", () => {
  jest.setTimeout(40000);
  it("alert 'user not found' for user that not exists", async () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    const forgotButton = screen.getByTestId(
      "forgotButton"
    ) as HTMLButtonElement;
    const forgotEmail = screen.getByTestId("forgotEmail") as HTMLInputElement;

    await act(() => {
      fireEvent.change(forgotEmail, {
        target: { value: "john@incubyte.co" },
      });
    });

    await act(() => {
      fireEvent.click(forgotButton);
    });

    await sleep(20000);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
