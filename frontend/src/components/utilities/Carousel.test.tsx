import { BrowserRouter } from "react-router-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Carousel from "./Carousel";

afterEach(() => {
  cleanup();
});

describe("Carousel", () => {
  jest.setTimeout(20000);
  test("Carousel consists of titleName and coursesLists", async () => {
    render(
      <BrowserRouter>
        <Carousel
          titleName="Popular Courses"
          isLoading={false}
          contentId={"popContent"}
          courses={[
            {
              id: "1",
              imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbEno7OdEiusIYUNSglF3c2UxRluhs8ZpR951-9hs&s",
              name: "Java",
            },
            {
              id: "2",
              imageUrl:
                "https://qph.cf2.quoracdn.net/main-qimg-28cadbd02699c25a88e5c78d73c7babc",
              name: "Python",
            },
          ]}
        />
      </BrowserRouter>
    );

    const carouselTitleName = screen.getByTestId("carouselTitleName");
    expect(carouselTitleName).toBeInTheDocument();
    expect(carouselTitleName.textContent).toEqual("Popular Courses");

    await waitFor(
      () => {
        const course1 = screen.getByText("Java");
        expect(course1).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
    await waitFor(
      () => {
        const course2 = screen.getByText("Python");
        expect(course2).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  test("On clickling left button it should scroll left ", async () => {
    render(
      <BrowserRouter>
        <Carousel
          titleName="Popular Courses"
          isLoading={false}
          contentId={"popContent"}
          courses={[
            {
              id: "3",
              imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbEno7OdEiusIYUNSglF3c2UxRluhs8ZpR951-9hs&s",
              name: "Java",
            },
            {
              id: "4",
              imageUrl:
                "https://qph.cf2.quoracdn.net/main-qimg-28cadbd02699c25a88e5c78d73c7babc",
              name: "Python",
            },
            {
              id: "5",
              imageUrl:
                "https://static.javatpoint.com/images/javascript/javascript_logo.png",
              name: "JavaScript",
            },
            {
              id: "6",
              imageUrl:
                "data:image/png;base64,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",
              name: "Test Driven Development",
            },
            {
              id: "7",
              imageUrl:
                "data:image/png;base64,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",
              name: "Micronaut",
            },
          ]}
        />
      </BrowserRouter>
    );

    await waitFor(
      () => {
        const contentElement = screen.getByTestId("carouselContent");
        const initialScrollLeft = contentElement.scrollLeft;
        const leftButton = screen.getByTestId("scrollLeft");
        fireEvent.click(leftButton);
        expect(contentElement.scrollLeft).toBeLessThan(initialScrollLeft);
      },
      { timeout: 5000 }
    );
  });

  test("On clickling Right button it should scroll right ", async () => {
    render(
      <BrowserRouter>
        <Carousel
          titleName="Popular Courses"
          isLoading={false}
          contentId={"popContent"}
          courses={[
            {
              id: "8",
              imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbEno7OdEiusIYUNSglF3c2UxRluhs8ZpR951-9hs&s",
              name: "Java",
            },
            {
              id: "9",
              imageUrl:
                "https://qph.cf2.quoracdn.net/main-qimg-28cadbd02699c25a88e5c78d73c7babc",
              name: "Python",
            },
            {
              id: "10",
              imageUrl:
                "https://static.javatpoint.com/images/javascript/javascript_logo.png",
              name: "JavaScript",
            },
            {
              id: "11",
              imageUrl:
                "data:image/png;base64,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",
              name: "Test Driven Development",
            },
            {
              id: "12",
              imageUrl:
                "data:image/png;base64,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",
              name: "Micronaut",
            },
          ]}
        />
      </BrowserRouter>
    );
    await waitFor(
      () => {
        const contentElement = screen.getByTestId("carouselContent");
        const rightButton = screen.getByTestId("scrollRight");
        const initialScrollLeft = contentElement.scrollLeft;
        fireEvent.click(rightButton);
        expect(contentElement.scrollLeft).toBeGreaterThan(initialScrollLeft);
      },
      { timeout: 5000 }
    );
  });
});
