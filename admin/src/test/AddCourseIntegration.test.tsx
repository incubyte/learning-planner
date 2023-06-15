import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddCourse from "../components/course/AddCourse";

afterEach(() => {
  cleanup();
});
let userId = "";

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

describe("test add course", () => {
  jest.setTimeout(40000);
  it("alert for course creation not successful", async () => {
    render(
      <BrowserRouter>
        <AddCourse />
      </BrowserRouter>
    );

    const courseTitle = screen.getByTestId(
      "courseTitleInput"
    ) as HTMLInputElement;
    await act(() => {
      fireEvent.change(courseTitle, { target: { value: "test1" } });
    });

    const description = screen.getByTestId(
      "courseDescriptionInput"
    ) as HTMLInputElement;

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

    await act(() => {
      fireEvent.click(addResourceUrlButton);
    });

    await waitFor(() => {
      const resourceUrlInput = screen.getAllByTestId("ResourceUrl");
      fireEvent.change(resourceUrlInput[0], {
        target: { value: "https://example.com/resource" },
      });
    });

    const TestUrlPlaceholder = screen.getByPlaceholderText("Enter Test URL");
    const addTestUrlButton = screen.getByTestId("Add Test Url");
    await act(() => {
      fireEvent.click(addTestUrlButton);
    });

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
    await waitFor(() =>
      expect(screen.getAllByRole("alert")[0]).toBeInTheDocument()
    );
  });
});
