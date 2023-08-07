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
import { courseType } from "../components/course/courseType";
import UpdateCourse from "./../components/course/UpdateCourse";

afterEach(() => {
  cleanup();
});
let courseData: courseType[];

beforeAll(async () => {
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjYzU0NjBhLTcwNDItNGQzNS05ZmI2LTE3Y2I1NzQxODBmMSIsImVtYWlsIjoiYW1hbi5yQGluY3VieXRlLmNvIiwicm9sZXMiOiJBZG1pbiIsImlhdCI6MTY5MDM0NTA2NSwiZXhwIjoxNjkwMzU1ODY1fQ.ApZbgRhovY_8YVSAHxmcGGL_Tjb_sdC5i8k0FzHvW1Q";
  localStorage.setItem("authToken", authToken);
  const courseResponse = await fetch(
    "https://backend-mu-plum.vercel.app/course/",
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  const jsonCourseBody = await courseResponse.json();
  courseData = jsonCourseBody;
});

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("test update course", () => {
  jest.setTimeout(40000);
  it("alert for update course", async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/updateCourse", state: courseData[0] }]}
      >
        <SignIn />
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
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
    await waitFor(() =>
      expect(screen.getAllByRole("alert")[0]).toBeInTheDocument()
    );
  });
});
