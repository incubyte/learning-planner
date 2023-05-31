import React from "react";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import { useState } from "react";
interface addUserProps {
  showModal: boolean;
  setShowModal: Function;
}
const AddUser = (props: addUserProps) => {
  var arraylist: any[] = [];
  const handleSubmit = async () => {
    const authToken = localStorage.getItem("authToken");
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/user/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ users: arraylist }),
      }
    );

    console.log(response);
    if (response.ok) {
      toast.success("users added", {
        autoClose: 2500,
        closeButton: false,
      });
    } else {
      if (response.status !== 400) {
        const jsonResponse = await response.json();
        toast.error(jsonResponse.message, {
          autoClose: 2500,
          closeButton: false,
        });
      } else {
        toast.error("Please check data and try again", {
          autoClose: 2500,
          closeButton: false,
        });
      }
    }
  };

  const onChange = (event: any) => {
    let file = event.target.files[0];

    const allowedFileTypes = [
      "application/vnd.ms-excel",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedFileTypes.includes(file.type)) {
      toast.error("Please upload .csv or .xlsx or .xsl file", {
        autoClose: 2500,
        closeButton: false,
      });
    } else {
      props.setShowModal(false);
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = async (e) => {
        const arrayBuffer: any = fileReader.result;
        var data = new Uint8Array(arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        if (arraylist.length > 0) handleSubmit();
      };
    }
  };
  return (
    <>
      {props.showModal ? (
        <>
          <div data-testid="profileImageModel" className="ProfileModal">
            <div className="relative w-auto my-6 mx-auto">
              <div className="ProfileModalContainer">
                <div className="ProfileModelUploadContainer">
                  <h3 className="text-3xl font-semibold">Upload Excel</h3>
                  <button
                    className="ProfileModalUploadButton"
                    onClick={() => props.setShowModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <label className="ProfileModelUploadFileLabel">
                    Upload file
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    className="ProfileModalUploadInput"
                    accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(event) => {
                      onChange(event);
                    }}
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    csv, xlsx, xls
                  </p>
                </div>
                <div className="ProfileModalFooter">
                  <button
                    data-testid="profileImageClose"
                    className="ProfileModalCloseButton"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <ToastContainer />
    </>
  );
};

export default AddUser;
