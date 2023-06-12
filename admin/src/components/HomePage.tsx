import { useEffect, useState } from "react";
import { userType } from "./user/user";
import HomeCard from "./utilities/HomeCard";
import Navbar from "./utilities/Navbar";
import LoadingScreen from "./utilities/LoadingScreen";
import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {
  const [allUsers, setAllUsers] = useState<userType[]>();
  const [allCourse, setAllCourse] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
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
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };
  const fetchCourse = async () => {
    try {
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/course/",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response && response.ok) {
        const fetchCourse = await response.json();
        setAllCourse(fetchCourse);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };
  const fetchData = async () => {
    setIsLoading(true);

    await Promise.all([fetchUsers(), fetchCourse()]);

    setIsLoading(false);
  };
  useEffect(() => {
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
      <div className="justify-center mt-8 lg:mt-16 md:mt-16">
        <p className="text-gray-800 whitespace-normal text-3xl font-bold">
          Welcome, Admin!
        </p>
        <div className="flex flex-col lg:flex-row md:flex-row gap-10 lg:gap-44 mad:gap-44 justify-center items-center mt-16">
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
        <ToastContainer />
      </div>
    </>
  );
};

export default HomePage;
