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

  test("renders multiselect component", () => {
    render(
      <MemoryRouter initialEntries={["/updateCourse"]}>
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
        </Routes>
      </MemoryRouter>
    );
    const multiselectComponent = screen.getByTestId("multiselect");
    expect(multiselectComponent).toBeInTheDocument();
  });

  test("adds a resource URL", async () => {
    render(
      <MemoryRouter initialEntries={["/updateCourse"]}>
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
        </Routes>
      </MemoryRouter>
    );
    const ResourceUrlPlaceholder =
      screen.getByPlaceholderText("Enter resource URL");
    expect(ResourceUrlPlaceholder).toBeInTheDocument();

    const addResourceUrlButton = screen.getByTestId("Add Resource Url");
    fireEvent.click(addResourceUrlButton);

    await waitFor(() => {
      const resourceUrlInput = screen.getAllByTestId("ResourceUrl");
      fireEvent.change(resourceUrlInput[0], {
        target: { value: "https://example.com/resource" },
      });
      expect(resourceUrlInput[0]).toHaveValue("https://example.com/resource");
    });

    await waitFor(() => {
      const RemoveResourceUrlButton = screen.getAllByTestId("RemoveButton");
      fireEvent.click(RemoveResourceUrlButton[0]);
    });
  });

  test("adds a test URL", async () => {
    render(
      <MemoryRouter initialEntries={["/updateCourse"]}>
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
        </Routes>
      </MemoryRouter>
    );
    const ResourceUrlPlaceholder =
      screen.getByPlaceholderText("Enter Test URL");
    expect(ResourceUrlPlaceholder).toBeInTheDocument();
    const addTestUrlButton = screen.getByTestId("Add Test Url");
    fireEvent.click(addTestUrlButton);

    await waitFor(() => {
      const testUrlInput = screen.getAllByTestId("testUrl");
      fireEvent.change(testUrlInput[0], {
        target: { value: "https://example.com/test" },
      });
      expect(testUrlInput[0]).toHaveValue("https://example.com/test");
    });

    await waitFor(() => {
      const RemovetestUrlButton = screen.getAllByTestId("RemoveTestButton");
      fireEvent.click(RemovetestUrlButton[0]);
    });
  });

  test("Course Image Model is present", async () => {
    render(
      <MemoryRouter initialEntries={["/updateCourse"]}>
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
        </Routes>
      </MemoryRouter>
    );
    const courseImageButton = screen.getByTestId("courseImageButton");
    await act(() => {
      fireEvent.click(courseImageButton);
    });
    const courseImageModel = screen.getByTestId("courseImageModel");
    expect(courseImageModel).toBeInTheDocument();
  });

  test("Course Image Model file input is present", async () => {
    render(
      <MemoryRouter initialEntries={["/updateCourse"]}>
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
        </Routes>
      </MemoryRouter>
    );
    const courseImageButton = screen.getByTestId("courseImageButton");
    await act(() => {
      fireEvent.click(courseImageButton);
    });
    const courseImageInput = screen.getByTestId("courseImageInput");
    expect(courseImageInput).toBeInTheDocument();
  });

  test("Course Image Model save button is present", async () => {
    render(
      <MemoryRouter initialEntries={["/updateCourse"]}>
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
        </Routes>
      </MemoryRouter>
    );
    const courseImageButton = screen.getByTestId("courseImageButton");
    await act(() => {
      fireEvent.click(courseImageButton);
    });
    const courseImageSave = screen.getByTestId("courseImageSave");
    expect(courseImageSave).toBeInTheDocument();
  });

  test("Course Image Modal close button is present", async () => {
    render(
      <MemoryRouter initialEntries={["/updateCourse"]}>
        <Routes>
          <Route path="/updateCourse" element={<UpdateCourse />} />
        </Routes>
      </MemoryRouter>
    );
    const courseImageButton = screen.getByTestId("courseImageButton");
    await act(() => {
      fireEvent.click(courseImageButton);
    });
    const courseImageClose = screen.getByTestId("courseImageClose");
    expect(courseImageClose).toBeInTheDocument();
  });
});
