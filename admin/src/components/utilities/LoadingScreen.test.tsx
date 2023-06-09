import React from "react";
import { render } from "@testing-library/react";
import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen", () => {
  test("renders the spinner in loading screen", () => {
    const { getByTestId } = render(<LoadingScreen />);
    const container = getByTestId("LoadingScreen");
    const spinner = getByTestId("spinner");
    expect(container).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });
});
