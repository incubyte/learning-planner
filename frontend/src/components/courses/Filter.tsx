import { useEffect, useState } from "react";
import "../../css/courses/Filter.css";
import { courseType } from "./Courses";
import LoadingScreen from "../utilities/LoadingScreen";
import { ToastContainer, toast } from "react-toastify";

interface FilterProps {
  getCourseByFilter: (courses: courseType[]) => void;
  getPopularCourseByFilter: (courses: courseType[]) => void;
}

const Filter = ({
  getCourseByFilter,
  getPopularCourseByFilter,
}: FilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [courses, setCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [tags, setTags] = useState([{ id: "1", name: "Java" }]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectTagId, setSelectTagId] = useState<string[]>([]);
  const authToken = localStorage.getItem("authToken");

  const fetchCourses = async (url: string) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response && response.ok) {
        const coursesResponse = await response.json();
        setCourses(coursesResponse);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchPopularCourses = async (url: string) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response && response.ok) {
        const coursesResponse = await response.json();
        setPopularCourses(coursesResponse);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      if (selectTagId.length > 0) {
        const filterByTagUrl =
          "http://localhost:5000/course/popular/filterByTags?" +
          selectTagId.map((tagId) => `tags=${tagId}`).join("&&");
        fetchPopularCourses(filterByTagUrl);
      } else {
        fetchPopularCourses(
          "http://localhost:5000/course/popular/"
        );
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
    setIsLoading(false);
  }, [selectTagId, popularCourses.length]);

  const fetchTags = async () => {
    try {
      const response = await fetch("http://localhost:5000/tag/", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response && response.ok) {
        const tagsResponse = await response.json();
        setTags(tagsResponse);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSelect = (tagId: string) => {
    if (selectTagId.includes(tagId)) {
      setSelectTagId((current) => current.filter((tag) => tag !== tagId));
    } else {
      setSelectTagId((prevSelectTagId) => [...prevSelectTagId, tagId]);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      if (selectTagId.length > 0) {
        const filterByTagUrl =
          "http://localhost:5000/course/filterByTags?" +
          selectTagId.map((tagId) => `tags=${tagId}`).join("&&");
        fetchCourses(filterByTagUrl);
      } else {
        fetchCourses("http://localhost:5000/course/");
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
    setIsLoading(false);
  }, [selectTagId, courses.length]);

  const fetchData = async (courses: any) => {
    setIsLoading(true);
    await setTimeout(async () => {
      await Promise.all([
        getCourseByFilter(courses),
        getPopularCourseByFilter(popularCourses),
      ]);
      setIsLoading(false);
    }, 5000);
  };
  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchData(courses);
  }, [courses]);

  const Tags = isExpanded ? tags : tags.slice(0, 7);
  return (
    <div className="filterTagsContainer" role="filterByTags">
      <h4 className="filterTagsHeading">Explore By Tags</h4>

      <div className="filterTagsList">
        {Tags.map((tag, index) => (
          <button
            key={index}
            className="filterTags"
            onClick={() => toggleSelect(tag.id)}
            style={{
              color: selectTagId.includes(tag.id) ? "white" : "black",
            }}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {tags.length > 7 && (
        <>
          <button className="toggleButton" onClick={toggleExpand}>
            {isExpanded ? (
              <>
                <span className="toggleText">Show Less</span>
              </>
            ) : (
              <>
                <span>Show More</span>
              </>
            )}
          </button>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Filter;