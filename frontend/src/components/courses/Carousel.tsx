import CourseCard from "./CourseCard";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "../../css/courses/Carousel.css";
interface carouselProps {
  titleName?: string;
  contentId: string;
  courses: {
    courseImage: string;
    courseName: string;
  }[];
}

const Carousel = ({ titleName, courses, contentId }: carouselProps) => {
  const scrollLeft = () => {
    const content = document.getElementById(contentId);
    if (content !== null) {
      content.scrollLeft -= 300;
    }
  };
  const scrollRight = () => {
    const content = document.getElementById(contentId);
    if (content !== null) {
      content.scrollLeft += 300;
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
            id={contentId}
            className="carouselListContent"
            data-testid="carouselContent"
          >
            {courses.map((course, index) => {
              return (
                <CourseCard
                  key={index}
                  courseImage={course.courseImage}
                  courseName={course.courseName}
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
