import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

beforeEach(() => {
  const courseData = {
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

  const mockLocation = {
    state: courseData,
  };
  (useLocation as jest.Mock).mockReturnValue(mockLocation);

  jest.spyOn(window, "fetch").mockImplementation((url): any => {
    if (
      url ===
      "https://backend-mu-plum.vercel.app/course/update/23c9da04-e4e6-4ee5-b0ba-c2fbaba711ed"
    ) {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlMmQzZmRjLTRiMzEtNDYwZi05YWVmLTI3MjhmNWM1MDc1OSIsImVtYWlsIjoidXRzYXYucEBpbmN1Ynl0ZS5jbyIsInJvbGVzIjoiQWRtaW4iLCJpYXQiOjE2ODU1NTM4MTAsImV4cCI6MTY4NTU2NDYxMH0.SV2S4jlPG8cP2r33U40tOUKM7aJeELYtDv7nImLlLzo"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(courseData),
        headers: headers,
      });
    }
  });
});

afterEach(() => {
  cleanup();
});

describe("UpdateCourse", () => {
  test("renders update course heading", () => {
    render(
      <MemoryRouter initialEntries={["/updateCourse"]}>
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
        </Routes>
      </MemoryRouter>
    );

    const formContainer = screen.getByTestId("formContainer");
    expect(formContainer).toBeInTheDocument();
    const updateCourseHeading = screen.getByTestId("updateCourseHeading");
    expect(updateCourseHeading).toBeInTheDocument();
  });

  test("renders course title input", () => {
    render(
      <MemoryRouter initialEntries={["/updateCourse"]}>
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
        </Routes>
      </MemoryRouter>
    );
    const courseTitleInput = screen.getByTestId("courseTitle");
    expect(courseTitleInput).toBeInTheDocument();
  });

  test("renders course description textarea", () => {
    render(
      <MemoryRouter initialEntries={["/updateCourse"]}>
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
        </Routes>
      </MemoryRouter>
    );
    const courseDescriptionTextarea = screen.getByTestId("courseDescription");
    expect(courseDescriptionTextarea).toBeInTheDocument();

    const courseDescriptionPlaceholder = screen.getByPlaceholderText(
      "Enter course description"
    );
    expect(courseDescriptionPlaceholder).toBeInTheDocument();
  });

  test("renders course credit input", () => {
    render(
      <MemoryRouter initialEntries={["/updateCourse"]}>
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
        </Routes>
      </MemoryRouter>
    );
    const courseCreditInput = screen.getByTestId("courseCredit");
    expect(courseCreditInput).toBeInTheDocument();
    const courseCreditPlaceholder = screen.getByPlaceholderText(
      "Enter course credit"
    );
    expect(courseCreditPlaceholder).toBeInTheDocument();
  });
});
