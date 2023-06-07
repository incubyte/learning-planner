import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SignIn from "../components/SignIn";
import Tags from "../components/tag/Tags";

afterEach(() => {
  cleanup();
});
let userId = "";

beforeAll(async () => {
  const response = await fetch(
    "https://backend-mu-plum.vercel.app/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "john" + Math.random() + "@incubyte.co",
        password: "Incubyte@111",
      }),
    }
  );
  const jsonBody = await response.json();
  userId = jsonBody.id;
});

afterAll(async () => {
  const authToken = localStorage.getItem("authToken");
  const response = await fetch(
    "https://backend-mu-plum.vercel.app/user/delete/" + userId,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
});
function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("test add tag", () => {
  jest.setTimeout(40000);
  it("alert for tag", async () => {
    render(
      <MemoryRouter initialEntries={[`/user/${userId}`]}>
        <SignIn />
        <Routes>
          <Route path="/user/:id" element={<Tags />}></Route>
        </Routes>
      </MemoryRouter>
    );

    const signInButton = screen.getByTestId(
      "signinButton"
    ) as HTMLButtonElement;
    const signInEmail = screen.getByTestId("signinEmail") as HTMLInputElement;

    const signInPassword = screen.getByTestId(
      "signinPassword"
    ) as HTMLInputElement;

    await act(() => {
      fireEvent.change(signInEmail, {
        target: { value: "testadmin@incubyte.co" },
      });
    });

    await act(() => {
      fireEvent.change(signInPassword, { target: { value: "Incubyte@111" } });
    });

    await act(() => {
      fireEvent.click(signInButton);
    });

    const AddTagButton = screen.getByTestId("AddTagButton");
    await act(() => {
      fireEvent.click(AddTagButton);
    });

    const tagInput = screen.getByTestId("tagsInput");
    await act(() => {
      fireEvent.change(tagInput, { target: { value: "tag1" } });
    });

    const AddTagButtonModal = screen.getByTestId("AddTagButtonModal");
    await act(() => {
      fireEvent.click(AddTagButtonModal);
    });

    await sleep(20000);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
