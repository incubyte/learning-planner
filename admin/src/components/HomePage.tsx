import { useEffect, useState } from "react";
import { userType } from "./user/user";
import HomeCard from "./utilities/HomeCard";
import Navbar from "./utilities/Navbar";
import LoadingScreen from "./utilities/LoadingScreen";

const HomePage = () => {
  const [allUsers, setAllUsers] = useState<userType[]>();
  const [allCourse, setAllCourse] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/user/all",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response && response.ok) {
      const fetchUsers = await response.json();
      setAllUsers(fetchUsers);
    }
  };
  const fetchCourse = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/course/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response && response.ok) {
      const fetchCourse = await response.json();
      setAllCourse(fetchCourse);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await Promise.all([fetchUsers(), fetchCourse()]);

      setIsLoading(false);
    };

    fetchData();
  }, []);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <Navbar
        isCourse={true}
        isHome={false}
        isProfile={false}
        isUser={true}
      ></Navbar>
      <div className="justify-center mt-16">
        <p className="text-gray-800 whitespace-normal text-3xl font-bold">
          Welcome, Admin!
        </p>
        <div className="flex flex-row gap-44 justify-center mt-16">
          <HomeCard
            dataTestId="userCard"
            count={allUsers?.length}
            header="Total Users"
            link="/users"
            linkText="See All Users"
          ></HomeCard>
          <HomeCard
            dataTestId="courseCard"
            count={allCourse?.length}
            header="Total Courses"
            link="/"
            linkText="See All Course"
          ></HomeCard>
        </div>
      </div>
    </>
  );
};

export default HomePage;
