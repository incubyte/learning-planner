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

afterEach(() => {
  cleanup();
});
let userId = "";

beforeAll(async () => {
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjYzU0NjBhLTcwNDItNGQzNS05ZmI2LTE3Y2I1NzQxODBmMSIsImVtYWlsIjoiYW1hbi5yQGluY3VieXRlLmNvIiwicm9sZXMiOiJBZG1pbiIsImlhdCI6MTY5MDM0NTA2NSwiZXhwIjoxNjkwMzU1ODY1fQ.ApZbgRhovY_8YVSAHxmcGGL_Tjb_sdC5i8k0FzHvW1Q";
  localStorage.setItem("authToken", authToken);
});

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("test add tag", () => {
  jest.setTimeout(40000);
  it("alert for tag", async () => {
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

    const AddTagButton = screen.getByTestId("AddTagButton");
    await act(() => {
      fireEvent.click(AddTagButton);
    });

    const tagInput = screen.getByTestId("tagsInput");
    await act(() => {
      fireEvent.change(tagInput, { target: { value: "tag1" } });
    });

    const AddTagButtonModal = screen.getByTestId("AddTagButtonModal");
    await act(() => {
      fireEvent.click(AddTagButtonModal);
    });

    await sleep(20000);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
