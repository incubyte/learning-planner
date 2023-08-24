import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import Navbar from "../utilities/Navbar";
import { imageUpload } from "../user/ImageUpload";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/course/updateCourse.css";
const UpdateCourse = () => {
  const navigator = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [createCourse, setCreateCourse] = useState();
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [credit, setCredit] = useState("");
  const [defaultTags, setDefaultTags] = useState([]);
  const [resourseUrls, setResourseUrls] = useState<string[]>([]);
  const [testUrls, setTestUrls] = useState<string[]>([]);
  const [displaySelectedTags, setDisplaySelectedTags] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const authToken = localStorage.getItem("authToken");
  const location = useLocation();
  const courseData = location.state;
  const courseId = courseData.id;

  const fetchSelectedTags = async () => {
    const response = await fetch(
      `https://backend-mu-plum.vercel.app/course/getTagsByCourseId/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response && response.ok) {
      const tagsResponse = await response.json();
      setDisplaySelectedTags(tagsResponse);
      const tagIds = tagsResponse.map((tag: any) => tag.id);
      setTags(tagIds);
    }
  };

  useEffect(() => {
    fetchSelectedTags();
  }, []);

  const changeAvatar = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  useEffect(() => {
    setResourseUrls(courseData.resourseUrls);
    setTestUrls(courseData.testUrls);
    setCourseName(courseData.name);
    setDescription(courseData.description);
    setCredit(courseData.credit);
    setImageUrl(courseData.imageUrl);
  }, [courseData]);

  const handleImageUrl = async () => {
    let media: any = [];
    if (avatar) {
      media = await imageUpload([avatar]);
      setImageUrl(media[0].url);
    }
    setShowModal(false);
  };

  const fetchTags = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/tag/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response && response.ok) {
      const tagsResponse = await response.json();
      setDefaultTags(tagsResponse);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleUpdateCourse = async () => {
    const response = await fetch(
      `https://backend-mu-plum.vercel.app/course/updateCourseById/${courseData.id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          name: courseName,
          description: description,
          tags: tags,
          credit: +credit,
          resourseUrls: resourseUrls,
          testUrls: testUrls,
          imageUrl: imageUrl,
        }),
      }
    );

    if (response.ok) {
      const jsonResnponse = await response.json();
      setCreateCourse(jsonResnponse);
      toast.success("Course Updated Successfully!!", {
        autoClose: 2500,
        closeButton: false,
      });
      setTimeout(() => {
        navigator("/courses");
      }, 2500);
    } else {
      const jsonResponse = await response.json();
      toast.error(jsonResponse.message, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const handleSubmit = (event: any) => {
    handleUpdateCourse();
    event.preventDefault();
  };

  const handleResourceUrlChange = (index: number, event: any) => {
    const updatedUrls = [...resourseUrls];
    updatedUrls[index] = event.target.value;
    setResourseUrls(updatedUrls);
  };

  const handleAddResourceUrl = () => {
    setResourseUrls([...resourseUrls, ""]);
  };

  const handleRemoveResourceUrl = (index: number) => {
    const updatedUrls = [...resourseUrls];
    updatedUrls.splice(index, 1);
    setResourseUrls(updatedUrls);
  };

  const handleTestUrlChange = (index: number, event: any) => {
    const updatedUrls = [...testUrls];
    updatedUrls[index] = event.target.value;
    setTestUrls(updatedUrls);
  };

  const handleAddTestUrl = () => {
    setTestUrls([...testUrls, ""]);
  };

  const handleRemoveTestUrl = (index: number) => {
    const updatedUrls = [...testUrls];
    updatedUrls.splice(index, 1);
    setTestUrls(updatedUrls);
  };

  const data = {
    options: defaultTags.map((tag: { id: number; name: string }) => ({
      id: tag.id,
      name: tag.name,
    })),
  };

  useEffect(() => {}, [tags]);

  return (
    <>
      {showModal ? (
        <>
          <div data-testid="courseImageModel" className="CourseImageModel">
            <div className="relative w-auto my-6 mx-auto">
              <div className="CourseImageModalContainer">
                <div className="CourseModelUploadContainer">
                  <h3 className="text-3xl font-semibold tracking-[.08px]">
                    Upload Image
                  </h3>
                  <button
                    className="CourseModalUploadButton"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none tracking-[.08px]">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <label className="CourseModelUploadFileLabel">
                    Upload file
                  </label>
                  <input
                    data-testid="courseImageInput"
                    accept="image/*"
                    className="CourseModalUploadInput"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    onChange={changeAvatar}
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300 tracking-[.08px]"
                    id="file_input_help"
                  >
                    SVG, PNG or JPG(MAX. 350KB)
                  </p>
                </div>
                <div className="CourseModalFooter">
                  <button
                    data-testid="courseImageClose"
                    className="CourseModalCloseButton"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    data-testid="courseImageSave"
                    className="CourseModalSaveButton bg-[#0e3252] hover:bg-[#05243f]"
                    type="button"
                    onClick={handleImageUrl}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <Navbar
        isCourse={false}
        isHome={false}
        isProfile={false}
        isUser={true}
        isTag={false}
      ></Navbar>
      <div>
        <h1
          data-testid="updateCourseHeading"
          className="text-center pt-10 text-3xl font-bold w-full tracking-[.08px]"
        >
          Update Course
        </h1>
      </div>
      <div className="flex justify-center">
        <ToastContainer />
        <form
          data-testid="formContainer"
          onSubmit={handleSubmit}
          className="UpdateCourseContainer"
        >
          <div className=" mt-3" data-testid="courseTitle">
            <label className=" font-bold">Course Name</label>
            <input
              className="UpdateCourseTextInput"
              type="text"
              id="courseName"
              data-testid="courseTitleInput"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
            />
          </div>
          <div className=" mt-3" data-testid="courseDescription">
            <label className=" font-bold">Description</label>
            <textarea
              id="description"
              data-testid="courseDescriptionInput"
              value={description}
              rows={4}
              className="UpdateCourseTextInput"
              placeholder="Enter course description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className=" mt-3" data-testid="courseCredit">
            <label className="font-bold">Credit</label>
            <input
              className="UpdateCourseTextInput"
              type="number"
              data-testid="courseCreditInput"
              value={credit}
              placeholder="Enter course credit"
              onChange={(e) => setCredit(e.target.value)}
            />
          </div>
          <div className=" mt-3" data-testid="multiselect">
            <label className=" font-bold">Tags</label>
            <Multiselect
              options={data.options}
              selectedValues={displaySelectedTags}
              data-testid="multiSelectInput"
              className="mt-2"
              displayValue="name"
              onSelect={(selectedOptions) => {
                const updatedTagsIds: any = tags;
                selectedOptions.forEach((option: any) => {
                  if (!updatedTagsIds.includes(option.id)) {
                    updatedTagsIds.push(option.id);
                  }
                });
                setTags(updatedTagsIds);
              }}
              onRemove={(removedOptions) => {
                const removedTagsIds = removedOptions.map(
                  (removedTag: { id: number }) => removedTag.id
                );
                setTags(removedTagsIds);
              }}
            />
          </div>
          <div className=" mt-3 justify-between">
            <label className=" font-bold">Resource URLs</label>
            {resourseUrls.map((url, index) => (
              <div key={index} className="flex mt-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={url}
                  placeholder="Enter resource URL"
                  data-testid="ResourceUrl"
                  onChange={(event) => {
                    handleResourceUrlChange(index, event);
                  }}
                />
                {resourseUrls.length > 1 ? (
                  <button
                    type="button"
                    data-testid="RemoveButton"
                    className="UpdateCourseRemoveUrlButton bg-[#b31010ca] hover:bg-[#b31010e2]"
                    onClick={() => handleRemoveResourceUrl(index)}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
            <button
              type="button"
              data-testid="Add Resource Url"
              className="UpdateCourseAddUrlButton bg-[#0e3252] hover:bg-[#05243f]"
              onClick={handleAddResourceUrl}
            >
              Add
            </button>
          </div>

          <div className=" mt-3 justify-between">
            <label className=" font-bold">Test URLs</label>
            {testUrls.map((url, index) => (
              <div key={index} className="flex mt-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={url}
                  data-testid="testUrl"
                  placeholder="Enter Test URL"
                  onChange={(event) => handleTestUrlChange(index, event)}
                />
                {testUrls.length > 1 ? (
                  <button
                    type="button"
                    data-testid="RemoveTestButton"
                    className="UpdateCourseRemoveUrlButton bg-[#b31010ca] hover:bg-[#b31010e2]"
                    onClick={() => {
                      handleRemoveTestUrl(index);
                    }}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
            <button
              type="button"
              data-testid="Add Test Url"
              className="UpdateCourseAddUrlButton bg-[#0e3252] hover:bg-[#05243f]"
              onClick={handleAddTestUrl}
            >
              Add
            </button>
          </div>
          <div
            className=" UpdateCourseImageContainer"
            data-testid="CourseImageContainer"
          >
            <label className="  font-bold">Image</label>
            <div className="h-10 w-10">
              <svg
                xmlns={imageUrl}
                data-testid="courseImageButton"
                className="courseImageUpdateIcon"
                onClick={() => setShowModal(true)}
                viewBox="0 0 24 24"
              >
                <path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" />
              </svg>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              data-testid="submitButton"
              className="UpdateCourseSubmitButton bg-[#0e3252] hover:bg-[#05243f]"
              type="submit"
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCourse;
