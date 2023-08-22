import { BrowserRouter } from "react-router-dom";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import AddSingleUserForm from "../components/user/AddSingleUserForm";

afterEach(() => {
  cleanup();
});

beforeAll(async () => {
  const res = await fetch("https://backend-mu-plum.vercel.app/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "testadmin@incubyte.co",
      password: "Incubyte@111",
    }),
  });
  const authToken = await res.text();
  localStorage.setItem("authToken", authToken);
});

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("test add user", () => {
  jest.setTimeout(40000);
  it("alert for add user", async () => {
    render(
      <BrowserRouter>
        <AddSingleUserForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByTestId("emailInput") as HTMLInputElement;
    await act(() => {
      fireEvent.change(emailInput, { target: { value: "test1" } });
    });

    const employeeIdInput = screen.getByTestId(
      "employeeIdInput"
    ) as HTMLInputElement;
    await act(() => {
      fireEvent.change(employeeIdInput, { target: { value: "E00023222" } });
    });

    const designationInput = screen.getByTestId(
      "designationInput"
    ) as HTMLInputElement;
    await act(() => {
      fireEvent.change(designationInput, { target: { value: "SC" } });
    });

    const clientTeamInput = screen.getByTestId(
      "clientTeamInput"
    ) as HTMLInputElement;
    await act(() => {
      fireEvent.change(clientTeamInput, { target: { value: "Team1" } });
    });

    const roleSelect = screen.getByTestId("roleSelect") as HTMLInputElement;
    await act(() => {
      fireEvent.select(roleSelect, { target: { value: "Employee" } });
    });

    const submitButton = screen.getByTestId("submitButton");
    await act(() => {
      fireEvent.click(submitButton);
    });

    await sleep(20000);
    await waitFor(() =>
      expect(screen.getAllByRole("alert")[0]).toBeInTheDocument()
    );
  });
});
