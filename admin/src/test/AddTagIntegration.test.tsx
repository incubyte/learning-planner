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
  const response = await fetch(
    "https://backend-mu-plum.vercel.app/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "john" + Math.random() + "@incubyte.co",
        password: "Incubyte@111",
      }),
    }
  );
  const jsonBody = await response.json();
  userId = jsonBody.id;

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
});

afterAll(async () => {
  const authToken = localStorage.getItem("authToken");
  const response = await fetch(
    "https://backend-mu-plum.vercel.app/user/delete/" + userId,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
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
