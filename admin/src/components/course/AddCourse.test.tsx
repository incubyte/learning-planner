import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddCourse from "./AddCourse";
const mockCourse = {
  id: "23c9da04-e4e6-4ee5-b0ba-c2fbaba711ed",
  name: "Day 1 clean code kata",
  resourseUrls: [
    "https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d",
  ],
  testUrls: [""],
  imageUrl: "https://docs.nestjs.com/assets/logo-small.svg",
  credit: 10,
  tags: [1, 2],
  description: "description",
  createdAt: "2023-04-13T12:54:02.801Z",
  updatedAt: "2023-04-13T12:54:02.801Z",
};

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation((url): any => {
    if (url === "https://backend-mu-plum.vercel.app/course/create") {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlMmQzZmRjLTRiMzEtNDYwZi05YWVmLTI3MjhmNWM1MDc1OSIsImVtYWlsIjoidXRzYXYucEBpbmN1Ynl0ZS5jbyIsInJvbGVzIjoiQWRtaW4iLCJpYXQiOjE2ODU1NTM4MTAsImV4cCI6MTY4NTU2NDYxMH0.SV2S4jlPG8cP2r33U40tOUKM7aJeELYtDv7nImLlLzo"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCourse),
        headers: headers,
      });
    }
  });
});

afterEach(() => {
  cleanup();
});

describe("Display Course Page ", () => {
  test("renders heading  of Course Page", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AddCourse />
      </BrowserRouter>
    );
    const formContainer = getByTestId("formContainer");
    expect(formContainer).toBeInTheDocument();
    const addCourseHeading = getByTestId("addCourseHeading");
    expect(addCourseHeading).toBeInTheDocument();
  });

  test("renders course title input", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <AddCourse />
      </BrowserRouter>
    );
    const courseTitleInput = getByTestId("courseTitle");
    expect(courseTitleInput).toBeInTheDocument();

    const courseTitlePlaceholder = getByPlaceholderText("Enter course name");
    expect(courseTitlePlaceholder).toBeInTheDocument();
  });

  test("renders course description textarea", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <AddCourse />
      </BrowserRouter>
    );
    const courseDescriptionTextarea = getByTestId("courseDescription");
    expect(courseDescriptionTextarea).toBeInTheDocument();

    const courseDescriptionPlaceholder = getByPlaceholderText(
      "Enter course description"
    );
    expect(courseDescriptionPlaceholder).toBeInTheDocument();
  });

  test("renders course credit input", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <AddCourse />
      </BrowserRouter>
    );
    const courseCreditInput = getByTestId("courseCredit");
    expect(courseCreditInput).toBeInTheDocument();
    const courseCreditPlaceholder = getByPlaceholderText("Enter course credit");
    expect(courseCreditPlaceholder).toBeInTheDocument();
  });
});
