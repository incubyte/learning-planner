import React, { useRef } from "react";
import CourseCard from "./CourseCard";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "../../css/courses/Carousel.css";
interface carouselProps {
  titleName?: string;
  contentId: string;
  courses: {
    id: string;
    imageUrl: string;
    name: string;
  }[];
}

const Carousel = ({ titleName, courses, contentId }: carouselProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (contentRef.current !== null) {
      contentRef.current.scrollLeft -= 416;
    }
  };

  const scrollRight = () => {
    if (contentRef.current !== null) {
      contentRef.current.scrollLeft += 416;
    }
  };
  return (
    <div className="relative" role={contentId}>
      <div className="carouselTitleName" data-testid="carouselTitleName">
        {titleName}
      </div>
      {courses.length > 0 ? (
        <>
          <div className="buttons">
            <button
              onClick={scrollLeft}
              className="button"
              data-testid="scrollLeft"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={scrollRight}
              className="button"
              data-testid="scrollRight"
            >
              <FiChevronRight />
            </button>
          </div>
          <div
            ref={contentRef}
            id={contentId}
            className="carouselListContent"
            data-testid="carouselContent"
          >
            {courses.map((course, index) => {
              return (
                <CourseCard
                  key={index}
                  id={course.id}
                  courseImage={course.imageUrl}
                  courseName={course.name}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center text-2xl p-10">Nothing to Show</div>
      )}
    </div>
  );
};

export default Carousel;
