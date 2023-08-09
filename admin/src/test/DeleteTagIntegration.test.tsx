import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Tags from "../components/tag/Tags";

let userId = "";
let tagId = "";
beforeAll(async () => {
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjYzU0NjBhLTcwNDItNGQzNS05ZmI2LTE3Y2I1NzQxODBmMSIsImVtYWlsIjoiYW1hbi5yQGluY3VieXRlLmNvIiwicm9sZXMiOiJBZG1pbiIsImlhdCI6MTY5MDM0NTA2NSwiZXhwIjoxNjkwMzU1ODY1fQ.ApZbgRhovY_8YVSAHxmcGGL_Tjb_sdC5i8k0FzHvW1Q";
  localStorage.setItem("authToken", authToken);

  const responseTag = await fetch(
    "https://backend-mu-plum.vercel.app/tag/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        name: "tag" + Math.random(),
      }),
    }
  );

  const tagJsonBody = await responseTag.json();
  tagId = tagJsonBody.id;
});

afterEach(() => {
  cleanup();
});

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("test delete tag", () => {
  jest.setTimeout(40000);
  it("alert for delete course", async () => {
    render(
      <BrowserRouter>
        <Tags />
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
      `deleteButton${tagId}`
    ) as HTMLButtonElement;
    await act(() => {
      fireEvent.click(deleteButton);
    });

    await sleep(20000);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
