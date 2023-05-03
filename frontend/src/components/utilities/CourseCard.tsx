import "../../css/courses/CourseCard.css";
import "../../css/utilities/Button.css";
interface courseCardProps {
  id: string;
  courseImage: string;
  courseName: string;
}
const CourseCard = ({ courseImage, courseName }: courseCardProps) => {
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
              <button
                className="buttonContainer"
                data-testid="courseCardButton"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
