import Symbol from "../../assets/symbol.png";
import "../../css/courses/CoursePageIndex.css";

const CoursePageIndex = () => {
  return (
    <>
      <div
        className="flex mx-3 sm:mx-10 my-1 sm:my-2 shadow-md rounded-lg bg-course-page bg-[length:100%_25vh] h-[25vh] lg:bg-[length:100%_50vh] md:bg-[length:100%_30vh] lg:h-[50vh] md:h-[30vh] justify-center"
        role="coursePageIndexImage"
      >
        <div className="flex flex-col justify-evenly items-center text-white text-center p-4">
          <h2 className="text-md xsm:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-4 mb-2">
            Lets Learn Something New, Today !!!
          </h2>

          <p className="text-xs xsm:text-base sm:text-lg md:text-xl lg:text-2xl mb-4">
            If you can learn 1% better each day for one year, you will end up 37
            times better by the time you are done.
          </p>
        </div>
      </div>
    </>
  );
};

export default CoursePageIndex;