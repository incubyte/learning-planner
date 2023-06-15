import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";

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
      <MemoryRouter initialEntries={["/reset_Password/1"]}>
        <Routes>
          <Route
            path="/reset_Password/:token"
            element={<ResetPassword />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    const resetButton = screen.getByTestId("resetButton") as HTMLButtonElement;
    const resetPassword = screen.getByTestId(
      "resetPassword"
    ) as HTMLInputElement;
    const resetConfirmPassword = screen.getByTestId(
      "resetConfirmPassword"
    ) as HTMLInputElement;
    await act(() => {
      fireEvent.change(resetPassword, {
        target: { value: "Incubyte@111" },
      });
    });
    await act(() => {
      fireEvent.change(resetConfirmPassword, {
        target: { value: "Incubyte@111" },
      });
    });

    await act(() => {
      fireEvent.click(resetButton);
    });

    await sleep(20000);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
