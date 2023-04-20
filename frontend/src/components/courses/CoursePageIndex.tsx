import Symbol from "../../assets/symbol.png";
import "../../css/courses/CoursePageIndex.css";

const CoursePageIndex = () => {
  return (
    <>
      <img
        className="coursePageIndexImage"
        style={{ width: "100%" }}
        src={Symbol}
        alt="Course Page Image"
        data-testid="indexPageImage"
        role="coursePageIndexImage"
      />
    </>
  );
};

export default CoursePageIndex;