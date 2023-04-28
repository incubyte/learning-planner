import Carousel from "../utilities/Carousel";
import "../../css/home/LeaderBoard.css";
import { useEffect, useState } from "react";
import { courseType } from "../courses/Courses";

const LeaderBoard = () => {
  const [activeCourses, setActiveCourses] = useState<courseType[]>([]);
  const authToken = localStorage.getItem("authToken");
  const fetchActiveCourses = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/user/course?status='active'",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const courses = await response.json();
      setActiveCourses(courses);
    }
  };
  useEffect(() => {
    fetchActiveCourses();
  }, []);

  return (
    <>
      <div
        className="flex flex-wrap justify-between items-center border p-5 border-gray-200 rounded-lg "
        role="leaderBoard"
      >
        <div className="w-full text-center mb-8">
          <h2
            className="text-3xl font-semibold text-center"
            data-testid="leaderBoardTitle"
          >
            The Leader Board
          </h2>
        </div>
        <div className="LeaderBoardContainers" data-testid="container1">
          <div className="LeaderBoardInnerContainer">
            <div>
              <img
                className="LeaderBoardInnerFirstImageContainer"
                src="https://randomuser.me/api/portraits/women/81.jpg"
                alt="user image"
                data-testid="container1 Image"
              />
            </div>
            <div
              className="LeaderBoardUserInfoContainer"
              data-testid="container1 user Info"
            >
              <div className="LeaderBoardUserInnerInfoContainer">
                <p className="LeaderBoardUserInnerInfo">Rank : 1</p>
                <p className="LeaderBoardUserInnerInfo">
                  Email : charvit@incubyte.co
                </p>
                <p className="LeaderBoardUserInnerInfo">Credits : 20</p>
                <p className="LeaderBoardUserInnerInfo">
                  Role : Software Craftperson
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="LeaderBoardContainers" data-testid="container2">
          <div className="LeaderBoardContainerTwoTableContainer">
            <div className="LeaderBoardInnerContainerScrollbar">
              <table
                className="LeaderBoardContainerTwoTable"
                data-testid="container2 table"
              >
                <thead>
                  <tr role="row">
                    <th className="LeaderBoardContainerTwoTableBorder">Rank</th>
                    <th className="LeaderBoardContainerTwoTableBorder">
                      Email
                    </th>
                    <th className="LeaderBoardContainerTwoTableBorder">Role</th>
                    <th className="LeaderBoardContainerTwoTableBorder">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr role="row">
                    <td className="LeaderBoardContainerTwoTableBorder">2</td>
                    <td className="LeaderBoardContainerTwoTableBorder">
                      aayush@incubyte.co
                    </td>
                    <td className="LeaderBoardContainerTwoTableBorder">
                      Software Craftperson
                    </td>
                    <td className="LeaderBoardContainerTwoTableBorder">10</td>
                  </tr>
                  <tr role="row">
                    <td className="LeaderBoardContainerTwoTableBorder">3</td>
                    <td className="LeaderBoardContainerTwoTableBorder">
                      aman.r@incubyte.co
                    </td>
                    <td className="LeaderBoardContainerTwoTableBorder">
                      Test Craftperson
                    </td>
                    <td className="LeaderBoardContainerTwoTableBorder">30</td>
                  </tr>
                  <tr role="row">
                    <td className="LeaderBoardContainerTwoTableBorder">4</td>
                    <td className="LeaderBoardContainerTwoTableBorder">
                      shreyas@incubyte.co
                    </td>
                    <td className="LeaderBoardContainerTwoTableBorder">
                      Test Craftperson intern
                    </td>
                    <td className="LeaderBoardContainerTwoTableBorder">50</td>
                  </tr>
                  <tr role="row">
                    <td className="LeaderBoardContainerTwoTableBorder">5</td>
                    <td className="LeaderBoardContainerTwoTableBorder">
                      shreyas@incubyte.co
                    </td>
                    <td className="LeaderBoardContainerTwoTableBorder">
                      Software Craftperson
                    </td>
                    <td className="LeaderBoardContainerTwoTableBorder">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Carousel
        titleName="Active Courses"
        contentId={"activeContent"}
        courses={activeCourses}
      />
    </>
  );
};

export default LeaderBoard;
