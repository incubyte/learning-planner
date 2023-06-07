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
import AddCourse from "../components/course/AddCourse";

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

describe("test add course", () => {
  jest.setTimeout(40000);
  it("alert for course creation not successful", async () => {
    render(
      <MemoryRouter initialEntries={[`/user/${userId}`]}>
        <SignIn />
        <Routes>
          <Route path="/user/:id" element={<AddCourse />}></Route>
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

    const courseTitle = screen.getByTestId("courseTitleInput") as HTMLInputElement;
    await act(() => {
      fireEvent.change(courseTitle, { target: { value: "test1" } });
    });

    const description = screen.getByTestId("courseDescriptionInput") as HTMLInputElement;

    await act(() => {
      fireEvent.change(description, { target: { value: "desc of test1" } });
    });

    const credit = screen.getByTestId("courseCreditInput") as HTMLInputElement;

    await act(() => {
      fireEvent.change(credit, { target: { value: "10" } });
    });

    const ResourceUrlPlaceholder =
      screen.getByPlaceholderText("Enter resource URL");

    const addResourceUrlButton = screen.getByTestId("Add Resource Url");
    fireEvent.click(addResourceUrlButton);

    await waitFor(() => {
      const resourceUrlInput = screen.getAllByTestId("ResourceUrl");
      fireEvent.change(resourceUrlInput[0], {
        target: { value: "https://example.com/resource" },
      });
    });

    const TestUrlPlaceholder = screen.getByPlaceholderText("Enter Test URL");
    const addTestUrlButton = screen.getByTestId("Add Test Url");
    fireEvent.click(addTestUrlButton);

    await waitFor(() => {
      const testUrlInput = screen.getAllByTestId("testUrl");
      fireEvent.change(testUrlInput[0], {
        target: { value: "https://example.com/test" },
      });
    });
    const submitButton = screen.getByTestId("submitButton");
    await act(() => {
      fireEvent.click(submitButton);
    });
    await sleep(20000);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
