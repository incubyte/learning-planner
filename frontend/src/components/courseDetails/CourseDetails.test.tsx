import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CourseDetails from "./CourseDetails";

afterEach(() => {
  cleanup();
});
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
const tags = [
  { id: "1", name: "Java" },
  { id: "2", name: "Python" },
  { id: "3", name: "Micronaut" },
  { id: "4", name: "Angular" },
  { id: "5", name: "Ruby" },
  { id: "6", name: "TDD" },
  { id: "7", name: "Java2" },
  { id: "8", name: "Java3" },
  { id: "9", name: "Java4" },
];

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation((url): any => {
    if (
      url ===
      "https://backend-mu-plum.vercel.app/course/getCourseById/23c9da04-e4e6-4ee5-b0ba-c2fbaba711ed"
    ) {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCourse),
        headers: headers,
      });
    }
    if (url === "https://backend-mu-plum.vercel.app/tag/") {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(tags),
        headers: headers,
      });
    }
    if (
      url ===
      "https://backend-mu-plum.vercel.app/user/course/status/23c9da04-e4e6-4ee5-b0ba-c2fbaba711ed"
    ) {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(1),
        headers: headers,
      });
    }
  });
});
describe("Course Component", () => {
  test("Course Image is present", async () => {
    render(
      <BrowserRouter>
        <CourseDetails />
      </BrowserRouter>
    );
    await waitFor(() => {
      const courseImage = screen.getByTestId("courseImage");

      expect(courseImage).toBeInTheDocument();
    });
  });
  test("Course Name is present", async () => {
    render(
      <BrowserRouter>
        <CourseDetails />
      </BrowserRouter>
    );
    await waitFor(() => {
      const courseName = screen.getByTestId("courseName");

      expect(courseName).toBeInTheDocument();
    });
  });

  test("Course Description is present", async () => {
    render(
      <BrowserRouter>
        <CourseDetails />
      </BrowserRouter>
    );
    await waitFor(() => {
      const courseDescription = screen.getByTestId("courseDescription");

      expect(courseDescription).toBeInTheDocument();
    });
  });
  test("Course Tag is present", async () => {
    render(
      <BrowserRouter>
        <CourseDetails />
      </BrowserRouter>
    );
    await waitFor(() => {
      const courseTags = screen.getByTestId("courseTags");

      expect(courseTags).toBeInTheDocument();
    });
  });

  test("Course Button is present", async () => {
    render(
      <BrowserRouter>
        <CourseDetails />
      </BrowserRouter>
    );
    await waitFor(() => {
      const courseButton = screen.getByTestId("courseButton");

      expect(courseButton).toBeInTheDocument();
    });
  });
});
