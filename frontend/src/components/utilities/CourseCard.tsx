import { Link } from "react-router-dom";
import "../../css/courses/CourseCard.css";
import "../../css/utilities/Button.css";
interface courseCardProps {
  id: string;
  courseImage: string;
  courseName: string;
}
const CourseCard = ({ id, courseImage, courseName }: courseCardProps) => {
  return (
    <>
      <div className="carouselCardContainer">
        <div className="carouselCardInnerContainer">
          <div className="courseCardImageContainer">
            <img
              src={courseImage}
              alt="course"
              className="object-fit object-center courseCardImage"
              data-testid="courseCardImage"
            />
            <div className="courseCardCourseNameContainer">
              <div
                className="courseCardCourseName"
                data-testid="courseCardName"
              >
                {courseName}
              </div>
            </div>
            <div className="courseCardButtonContainer">
              {/* <Button title="Explore" /> */}

              <Link to={"/course/" + id}>
                <button
                  className="buttonContainer"
                  data-testid="courseCardButton"
                >
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
