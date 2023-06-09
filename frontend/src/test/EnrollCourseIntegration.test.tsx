import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CourseDetails from "../components/courseDetails/CourseDetails";

afterEach(() => {
  cleanup();
});

beforeAll(async () => {
  const response = await fetch(
    "https://backend-mu-plum.vercel.app/auth/signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "charvit@incubyte.co",
        password: "Incubyte@579",
      }),
    }
  );
  const authToken = await response.text();
  localStorage.setItem("authToken", authToken);
});
function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
describe("test course detail", () => {
  jest.setTimeout(30000);
  it("Enroll course", async () => {
    const mockId = "1";
    render(
      <MemoryRouter initialEntries={[`/course/${mockId}`]}>
        <Routes>
          <Route path="/course/:id" element={<CourseDetails />}></Route>
        </Routes>
      </MemoryRouter>
    );

    await sleep(20000);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
