import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../css/tag/Tags.css";
import Navbar from "../utilities/Navbar";

const DisplayTag = () => {
  const authToken = localStorage.getItem("authToken");
  const [getAllTag, setGetAllTag] = useState([]);
  const [showAddTagModel, setShowAddTagModal] = useState(false);
  const [showupdateTagModel, setShowupdateTagModal] = useState({
    isModalOpen: false,
    tagId: 0,
  });
  const [newTagName, setNewTagName] = useState("");
  const [tagName, setTagName] = useState("");

  const handelTagSubmit = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/tag/create",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: newTagName,
        }),
      }
    );
    if (response.ok) {
      const jsonResnponse = await response.json();
      console.log(jsonResnponse);
      setNewTagName(jsonResnponse);
      toast("Hurray! Tag created 🥳🥳", {
        autoClose: 2500,
        closeButton: false,
      });
      setNewTagName("");
    } else {
      const jsonResponse = await response.json();
      toast.error(jsonResponse.message, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const handleUpdatetag = async (id: any) => {
    const response = await fetch(
      `https://backend-mu-plum.vercel.app/tag/update/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          name: tagName,
        }),
      }
    );
    if (response.ok) {
      const jsonResnponse = await response.json();
      setTagName(jsonResnponse);
      toast("Hurray! Tag Updated", {
        autoClose: 2500,
        closeButton: false,
      });
    } else {
      const jsonResponse = await response.json();
      console.log(jsonResponse.message);
      toast.error(jsonResponse.message, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchTag = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/tag/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response && response.ok) {
      const tagResponse = await response.json();
      setGetAllTag(tagResponse);
    }
  };

  const deleteTag = async (id: string) => {
    const response = await fetch(
      `https://backend-mu-plum.vercel.app/tag/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        method: "DELETE",
      }
    );
    if (response && response.ok) {
      fetchTag();
      toast("Hurray! Tag deleted Successfully 🥳🥳", {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteTag(id);
  };

  useEffect(() => {
    fetchTag();
  }, [tagName, newTagName]);
  return (
    <>
      {showupdateTagModel.isModalOpen ? (
        <>
          <div
            data-testid="profileImageModel"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-80 bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 xsm:p-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Update Tags here</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl font-semibold outline-none"
                    onClick={() =>
                      setShowupdateTagModal({
                        isModalOpen: false,
                        tagId: 0,
                      })
                    }
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    data-testid="tagsInput"
                    className="relative m-0 block w-auto xsm:w-72 min-w-0 flex-auto rounded border 
    border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal 
    text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] 
    file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit 
    file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition 
    file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] 
    hover:file:bg-neutral-200"
                    onChange={(e) => {
                      console.log(tagName);
                      setTagName(e.target.value);
                    }}
                    placeholder="Tag name"
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    data-testid="profileImageClose"
                    className="text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1 transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowupdateTagModal({
                        isModalOpen: false,
                        tagId: 0,
                      });
                    }}
                  >
                    Close
                  </button>
                  <button
                    data-testid="updateTagButton"
                    className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150 bg-emerald-500 active:bg-emerald-600"
                    type="button"
                    onClick={() => {
                      const id = showupdateTagModel.tagId;
                      handleUpdatetag(id);
                      setShowupdateTagModal({
                        isModalOpen: false,
                        tagId: 0,
                      });
                    }}
                  >
                    Update Tag
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>{" "}
        </>
      ) : null}

      {showAddTagModel ? (
        <>
          <div
            data-testid="profileImageModel"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-80 bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 xsm:p-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Tags here</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl font-semibold outline-none"
                    onClick={() => setShowAddTagModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    value={newTagName}
                    onChange={(e) => {
                      console.log(newTagName);
                      setNewTagName(e.target.value);
                    }}
                    data-testid="tagsInput"
                    className="relative m-0 block w-auto xsm:w-72 min-w-0 flex-auto rounded border 
    border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal 
    text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] 
    file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit 
    file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition 
    file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] 
    hover:file:bg-neutral-200"
                    placeholder="Tag name"
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    data-testid="tagImageClose"
                    className="text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1 transition-all duration-150"
                    type="button"
                    onClick={() => setShowAddTagModal(false)}
                  >
                    Close
                  </button>
                  <button
                    data-testid="AddTagButton"
                    className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150 bg-emerald-500 active:bg-emerald-600"
                    type="button"
                    onClick={() => {
                      handelTagSubmit();
                      setShowAddTagModal(false);
                    }}
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>{" "}
        </>
      ) : null}
      <Navbar
        isCourse={false}
        isHome={true}
        isProfile={true}
        isUser={false}
        isTag={true}
      />
      <div>
        <h1 data-testid="tagHeading" className="tagHeading">
          List of Tags
        </h1>
      </div>
      <div className="tagContainer">
        <button
          type="button"
          className="px-2 py-1 bg-green-500 mt-5 text-white rounded-md m-5"
          onClick={() => setShowAddTagModal(true)}
        >
          Add Tag
        </button>
        <table data-testid="container2 table" className="tagTable">
          <thead className="tagTableHead" data-testid="tableHeading">
            <tr>
              <th scope="col" className="tagTableHeadCols">
                SrNo.
              </th>
              <th scope="col" className="tagTableHeadCols">
                Name
              </th>
              <th scope="col" className="tagTableHeadCols">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {getAllTag?.map((tag: any, index) => {
              return (
                <tr
                  key={index}
                  className={`${index % 2 === 1 ? "bg-gray-100" : "bg-white"}`}
                  role="row"
                >
                  <td className="tagTableRows">{index + 1}</td>
                  <td className="tagTableRows">{tag.name}</td>
                  <td className="tagTableUpdateCol" data-testid="Actions">
                    <button
                      data-testid="updateButton"
                      onClick={() => {
                        setShowupdateTagModal({
                          isModalOpen: true,
                          tagId: tag.id,
                        });
                      }}
                      className="bg-yellow-400 w-[100px] m-5 p-2 pl-1 pr-1 rounded-lg hover:bg-yellow-500 "
                    >
                      Update
                    </button>
                    <button
                      data-testid={"deleteButton" + `${tag.id}`}
                      role="deleteButton"
                      className="bg-red-600 w-[100px] m-5 p-2 pl-1 pr-1 rounded-lg hover:bg-red-500 "
                      onClick={() => handleDelete(tag.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayTag;
