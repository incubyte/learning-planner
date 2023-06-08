import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserDetail from "../components/user/UserDetail";

let userId = "";
const mockUsers = [
  {
    email: "john1@incubyte.co",
    password: "123123123",
    id: "1",
    createdAt: Date.prototype,
    profilePhoto: "https://profilephoto.com",
    updatedAt: Date.prototype,
    eId: "E00",
    role: "BQA",
    clientTeam: "abc",
    Role: "Employee",
  },
  {
    email: "john2@incubyte.co",
    password: "123123123",
    id: "2",
    createdAt: Date.prototype,
    profilePhoto: "https://profilephoto.com",
    updatedAt: Date.prototype,
    eId: "E01",
    role: "BQA",
    clientTeam: "abc",
    Role: "Employee",
  },
];

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

  jest.spyOn(window, "fetch").mockImplementation((url): any => {
    if (url === "https://backend-mu-plum.vercel.app/user/all") {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
        headers: headers,
      });
    }
  });
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

describe("test Update user", () => {
  jest.setTimeout(40000);
  it("alert 'user updated' for success", async () => {
    render(
      <MemoryRouter initialEntries={[`/user/${userId}`]}>
        <Routes>
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </MemoryRouter>
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

    const userDetailDesignation = screen.getByTestId(
      "UserDetailDesignationInput"
    ) as HTMLInputElement;

    fireEvent.change(userDetailDesignation, { target: { value: "SC" } });

    const updateButton = screen.getByTestId(
      "UserDetailUpdate"
    ) as HTMLButtonElement;

    fireEvent.click(updateButton);

    await waitFor(
      () => {
        expect(screen.getAllByRole("alert")).toHaveLength(2);
      },
      { timeout: 5000 }
    );
  });
});
