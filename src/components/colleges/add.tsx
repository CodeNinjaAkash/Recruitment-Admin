import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../utils/http";
import endpoint from '../../constants/endPoint'
import { toast } from "react-toastify";
import InputField from "../../shared/table/commanFields/Input";

const CollegeAdd = () => {

  const navigate = useNavigate();
  const [collegeName, setCollegeName] = useState("");

  const confirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    http
      .post(`${endpoint.CREATE_COLLEGE}`, { name: collegeName })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onBack = () => {
    navigate("/colleges");
  };

  return (
    <>
      <div className="card">
        <div className="bg-white space-y-2 p-4 sm:px-8 sm:py-4 lg:p-4 xl:px-4 xl:py-4 border-2 border-white border-b-gray-300">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 text-lg">
              Add College
            </h2>
            <div className="ml-auto text-center flex">
              <span
                onClick={() => onBack()}
                className="hover:bg-neutral-600 group flex  rounded-md bg-neutral-900 text-white text-center text-sm font-medium mr-1 pl-2 pr-2 py-2 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <form className="from" onSubmit={(e) => confirmSubmit(e)}>

          <div className="card-body">
            <InputField
              id={"college"}
              labelText={"Name"}
              inputType={"text"}
              inputValue={collegeName}
              inputPlaceHolder={"College"}
              onChange={setCollegeName}
              required={true}
            />
          </div>

          <div className="card-footer flex">
            <button
              type="submit"
              className="hover:bg-red-400 group flex  rounded-md bg-red-500 text-white text-center text-uppercase text-lg font-medium px-3 py-2 shadow-sm"
            >
              Submit{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-right mt-1 ml-2"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </button>
          </div>

        </form>

      </div>
    </>
  );
};

export default CollegeAdd;
