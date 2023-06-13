import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Course from "../components/course/Courses";

let userId = "";
let courseId = "";
beforeAll(async () => {
  const res = await fetch("https://backend-mu-plum.vercel.app/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "utsav.p@incubyte.co",
      password: "Incubyte@111",
    }),
  });
  const authToken = await res.text();
  localStorage.setItem("authToken", authToken);

  const responsecourse = await fetch(
    "https://backend-mu-plum.vercel.app/course/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        name: "test1" + Math.random(),
        resourseUrls: ["https://testresourseurl.com"],
        testUrls: ["https://testUrl.com"],
        imageUrl: "https://testimage.com",
        credit: 10,
      }),
    }
  );
  const courseJsonBody = await responsecourse.json();
  courseId = courseJsonBody.id;
});

afterEach(() => {
  cleanup();
});

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("test delete course", () => {
  jest.setTimeout(40000);
  it("alert for delete course", async () => {
    render(
      <BrowserRouter>
        <Course />
      </BrowserRouter>
    );
    await waitFor(
      async () => {
        const loadingIndicator = screen.getByTestId("LoadingScreen");
        if (loadingIndicator.ATTRIBUTE_NODE > 0) {
          await sleep(7000);
        }
      },
      { timeout: 10000 }
    );
    sleep(10000);
    const deleteButton = screen.getByTestId(
      `deleteButton${courseId}`
    ) as HTMLButtonElement;
    await act(() => {
      fireEvent.click(deleteButton);
    });

    await sleep(20000);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
