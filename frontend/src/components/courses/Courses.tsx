import { useEffect, useState } from "react";
import Carousel from "../utilities/Carousel";
import Navbar from "../utilities/Navbar";
import CoursePageIndex from "./CoursePageIndex";
import Filter from "./Filter";

export interface courseType {
  id: string;
  name: string;
  resourseUrls: string[];
  testUrls: string[];
  imageUrl: string;
  credit: number;
  tags: number[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

const CoursePage = () => {
  const [query, setQuery] = useState("");
  const [availableCourses, setAvailableCourses] = useState<courseType[]>([]);
  const [courseUrl, setCourseUrl] = useState<string>(
    "https://backend-mu-plum.vercel.app/course"
  );
  const getQuery = (query: string) => {
    setQuery(query);
  };

  const getCourseByFilter = (courses: courseType[]) => {
    setAvailableCourses(courses);
  };

  const authToken = localStorage.getItem("authToken");
  const fetchCourses = async (url: string) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const courses = await response.json();
      setAvailableCourses(courses);
    }
  };

  useEffect(() => {
    fetchCourses(courseUrl);
  }, []);

  const search = (data: courseType[]) => {
    const pattern = query.replace(/ /g, "").toLowerCase();
    const filteredList =
      data?.filter((item: courseType) => {
        const text = item.name.replace(/ /g, "").toLowerCase();
        let patternIndex = 0;
        let textIndex = 0;
        while (patternIndex < pattern.length && textIndex < text.length) {
          if (pattern[patternIndex] === text[textIndex]) {
            patternIndex++;
          }
          textIndex++;
        }
        return patternIndex === pattern.length;
      });
    return filteredList;
  };

  return (
    <>
      <Navbar
        getQuery={getQuery}
        isCourse={false}
        isHome={true}
        isProfile={true}
        isSearch={true}
      />
      <CoursePageIndex />
      <hr className="mt-10" />
      <Filter getCourseByFilter={getCourseByFilter} />
      <hr className="mt-10" />
      <Carousel
        titleName="Popular courses"
        courses={search(availableCourses)}
        contentId="popContent"
      />
      <hr className="mt-10" />
      <Carousel
        titleName="Available courses"
        courses={search(availableCourses)}
        contentId="availContent"
      />
    </>
  );
};

export default CoursePage;
