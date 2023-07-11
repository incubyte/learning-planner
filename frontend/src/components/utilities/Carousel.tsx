import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../../css/courses/Carousel.css";
import CourseCard from "./CourseCard";
import LoadingScreen from "./LoadingScreen";
import ContentLoader from "react-content-loader";
interface carouselProps {
  titleName?: string;
  dataTestId?: string;
  contentId: string;
  courses: {
    id: string;
    imageUrl: string;
    name: string;
  }[];
}

const Carousel = ({
  titleName,
  dataTestId,
  courses,
  contentId,
}: carouselProps) => {
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
    <div className="relative" data-testid={dataTestId} role={contentId}>
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
        <ContentLoader viewBox="0 0 380 100">
          <rect x="12" y="10" rx="5" ry="5" width="80" height="80" />
          <rect x="102" y="10" rx="5" ry="5" width="80" height="80" />
          <rect x="192" y="10" rx="5" ry="5" width="80" height="80" />
          <rect x="282" y="10" rx="5" ry="5" width="80" height="80" />
        </ContentLoader>
      )}
    </div>
  );
};

export default Carousel;
