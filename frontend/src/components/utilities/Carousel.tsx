import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../../css/courses/Carousel.css";
import CourseCard from "./CourseCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface carouselProps {
  titleName?: string;
  dataTestId?: string;
  contentId: string;
  courses: {
    id: string;
    imageUrl: string;
    name: string;
  }[];
  isLoading?: boolean;
}

const Carousel = ({
  titleName,
  dataTestId,
  courses,
  contentId,
  isLoading,
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
      {isLoading == false ? (
        <>
          {courses.length == 0 ? (
            <div>No Courses</div>
          ) : (
            <>
              <div
                className={
                  courses.length >= 4
                    ? "buttons mlg:hidden block"
                    : courses.length >= 3
                    ? "block buttons lg:hidden"
                    : "block buttons lg:hidden md:hidden"
                }
              >
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
                className={
                  courses.length >= 5
                    ? "carouselListContent mlg:justify-start justify-start"
                    : courses.length == 4
                    ? "carouselListContent mlg:justify-center justify-start"
                    : courses.length <= 2
                    ? "carouselListContent justify-start md:justify-center lg:justify-center"
                    : "carouselListContent justify-start lg:justify-center"
                }
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
          )}
        </>
      ) : (
        <SkeletonTheme inline={true}>
          <div className="flex flex-row flex-nowrap overflow-hidden ml-7">
            <Skeleton className="mr-8" height={280} width={250} />
            <Skeleton className="mr-8" height={280} width={250} />
            <Skeleton className="mr-8" height={280} width={250} />
            <Skeleton className="mr-8" height={280} width={250} />
            <Skeleton className="mr-8" height={280} width={250} />
          </div>
        </SkeletonTheme>
      )}
    </div>
  );
};

export default Carousel;
