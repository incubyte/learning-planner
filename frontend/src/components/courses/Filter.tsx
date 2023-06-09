import { useEffect, useState } from "react";
import "../../css/courses/Filter.css";
import { courseType } from "./Courses";
import LoadingScreen from "../utilities/LoadingScreen";

interface FilterProps {
  getCourseByFilter: (courses: courseType[]) => void;
}

const Filter = ({ getCourseByFilter }: FilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState([{ id: "1", name: "Java" }]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectTagId, setSelectTagId] = useState<string[]>([]);
  const authToken = localStorage.getItem("authToken");

  const fetchCourses = async (url: string) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response && response.ok) {
      const coursesResponse = await response.json();
      setCourses(coursesResponse);
    }
  };

  const fetchTags = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/tag/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response && response.ok) {
      const tagsResponse = await response.json();
      setTags(tagsResponse);
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
    if (selectTagId.length > 0) {
      const filterByTagUrl =
        "https://backend-mu-plum.vercel.app/course/filterByTags?" +
        selectTagId.map((tagId) => `tags=${tagId}`).join("&&");
      fetchCourses(filterByTagUrl);
    } else {
      fetchCourses("https://backend-mu-plum.vercel.app/course/");
    }
    setIsLoading(false);
  }, [selectTagId, courses.length]);

  const fetchData = async (courses: any) => {
    setIsLoading(true);

    await Promise.all([getCourseByFilter(courses)]);

    setIsLoading(false);
  };
  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    fetchData(courses);
  }, [courses]);

  const Tags = isExpanded ? tags : tags.slice(0, 7);
  return isLoading ? (
    <LoadingScreen />
  ) : (
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
    </div>
  );
};

export default Filter;
