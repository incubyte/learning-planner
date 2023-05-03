import Carousel from "../utilities/Carousel";
import "../../css/home/LeaderBoard.css";
import { useEffect, useState } from "react";
import { courseType } from "../courses/Courses";
import { LeaderBoardType } from "./LeaderBoardType";
import React from "react";

const LeaderBoard = () => {
  const [activeCourses, setActiveCourses] = useState<courseType[]>([]);
  const [leaderBoardUsers, setLeaderBoardUsers] = useState<LeaderBoardType[]>(
    []
  );
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

  const fetchLeaderBoardUsers = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/user/leaderboard",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const leaderBoardUsersResponse = await response.json();
      setLeaderBoardUsers(leaderBoardUsersResponse);
    }
  };

  useEffect(() => {
    fetchActiveCourses();
    fetchLeaderBoardUsers();
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
                src={leaderBoardUsers[0]?.user?.profilePhoto}
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
                  Email : {leaderBoardUsers[0]?.user?.email}
                </p>
                <p className="LeaderBoardUserInnerInfo">
                  Credits : {leaderBoardUsers[0]?.count * 10}
                </p>
                <p className="LeaderBoardUserInnerInfo">
                  Role : {leaderBoardUsers[0]?.user?.role}
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
                  {leaderBoardUsers.map((leaderBoardUser, index) => {
                    return (
                      <React.Fragment key={index}>
                        {index > 0 && (
                          <tr role="row">
                            <td className="LeaderBoardContainerTwoTableBorder">
                              {index + 1}
                            </td>
                            <td className="LeaderBoardContainerTwoTableBorder">
                              {leaderBoardUser?.user?.email}
                            </td>
                            <td className="LeaderBoardContainerTwoTableBorder">
                              {leaderBoardUser?.user?.role}
                            </td>
                            <td className="LeaderBoardContainerTwoTableBorder">
                              {leaderBoardUser?.count * 10}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
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
