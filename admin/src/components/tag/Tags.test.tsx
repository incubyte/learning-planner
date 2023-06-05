import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Tags from "./Tags";

jest.mock("react-toastify", () => ({
  ToastContainer: jest.fn(),
  toast: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation((url): any => {
    if (url === "https://backend-mu-plum.vercel.app/tag/") {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: "1",
              name: "Tag1",
            },
            {
              id: "2",
              name: "Tag2",
            },
          ]),
        headers: headers,
      });
    }
  });
});

afterEach(() => {
  cleanup();
  localStorage.removeItem("authToken");
});

describe("Display Tag Page ", () => {
  test("should display the Tag list", async () => {
    const { getByTestId, getAllByTestId, getByRole, getAllByRole } = render(
      <BrowserRouter>
        <Tags />
      </BrowserRouter>
    );

    jest.setTimeout(30000);
    const authToken = localStorage.getItem("authToken");
    expect(getByRole("navigation")).toBeInTheDocument();
    expect(getByTestId("tagHeading")).toBeInTheDocument();
    expect(getByTestId("AddTagButton")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://backend-mu-plum.vercel.app/tag/",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    expect(getByTestId("tableHeading")).toBeInTheDocument();
    expect(getByRole("row")).toBeInTheDocument();
    await waitFor(() => {
      const tagRows = getAllByRole("row");
      expect(tagRows.length).toBe(3);

      const actionsElements = getAllByTestId("Actions");
      expect(actionsElements.length).toBe(2);
    });
  });

  test("display delete button", async () => {
    const { getByTestId, getAllByTestId } = render(
      <BrowserRouter>
        <Tags />
      </BrowserRouter>
    );

    jest.setTimeout(30000);
    await waitFor(() => getByTestId("container2 table"));

    await waitFor(() => {
      const deleteButtons1 = getAllByTestId("deleteButton1");
      expect(deleteButtons1.length).toBe(1);
      const deleteButtons2 = getAllByTestId("deleteButton2");
      expect(deleteButtons2.length).toBe(1);
    });
  });

  test("delete Operation", async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Tags />
      </BrowserRouter>
    );
    jest.setTimeout(30000);
    await waitFor(() => {
      fireEvent.click(getAllByTestId("deleteButton1")[0]);
    });
  });

  test("display update button", async () => {
    const { getByTestId, getAllByTestId } = render(
      <BrowserRouter>
        <Tags />
      </BrowserRouter>
    );

    jest.setTimeout(30000);
    await waitFor(() => getByTestId("container2 table"));

    await waitFor(() => {
      const updateButtons = getAllByTestId("updateButton");
      expect(updateButtons.length).toBe(2);
    });
  });
});
