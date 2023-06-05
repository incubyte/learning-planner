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

  test("renders multiselect component", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AddCourse />
      </BrowserRouter>
    );
    const multiselectComponent = getByTestId("multiselect");
    expect(multiselectComponent).toBeInTheDocument();
  });
  test("adds a resource URL", async () => {
    const { getByTestId, getAllByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <AddCourse />
      </BrowserRouter>
    );

    const ResourceUrlPlaceholder = getByPlaceholderText("Enter resource URL");
    expect(ResourceUrlPlaceholder).toBeInTheDocument();

    const addResourceUrlButton = getByTestId("Add Resource Url");
    fireEvent.click(addResourceUrlButton);

    await waitFor(() => {
      const resourceUrlInput = getAllByTestId("ResourceUrl");
      fireEvent.change(resourceUrlInput[0], {
        target: { value: "https://example.com/resource" },
      });
      expect(resourceUrlInput[0]).toHaveValue("https://example.com/resource");
    });

    await waitFor(() => {
      const RemoveResourceUrlButton = getAllByTestId("RemoveButton");
      fireEvent.click(RemoveResourceUrlButton[0]);
    });
  });

  test("adds a test URL", async () => {
    const { getByTestId, getAllByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <AddCourse />
      </BrowserRouter>
    );
    const ResourceUrlPlaceholder = getByPlaceholderText("Enter Test URL");
    expect(ResourceUrlPlaceholder).toBeInTheDocument();
    const addTestUrlButton = getByTestId("Add Test Url");
    fireEvent.click(addTestUrlButton);

    await waitFor(() => {
      const testUrlInput = getAllByTestId("testUrl");
      fireEvent.change(testUrlInput[0], {
        target: { value: "https://example.com/test" },
      });
      expect(testUrlInput[0]).toHaveValue("https://example.com/test");
    });

    await waitFor(() => {
      const RemovetestUrlButton = getAllByTestId("RemoveTestButton");
      fireEvent.click(RemovetestUrlButton[0]);
    });
  });

  test("Checks the image container and its contents", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AddCourse />
      </BrowserRouter>
    );

    const imageContainer = getByTestId("CourseImageContainer");
    expect(imageContainer).toBeInTheDocument();
  });

  test("Course Image Model is present", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AddCourse />
      </BrowserRouter>
    );
    const courseImageButton = getByTestId("courseImageButton");
    await act(() => {
      fireEvent.click(courseImageButton);
    });
    const courseImageModel = getByTestId("courseImageModel");
    expect(courseImageModel).toBeInTheDocument();
  });
});
