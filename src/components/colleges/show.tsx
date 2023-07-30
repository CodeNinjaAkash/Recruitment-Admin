import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import endpoint from '../../constants/endPoint'
import http from "../../utils/http";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import InputField from "../../shared/table/commanFields/Input";
interface ICollegedata {
  name: string;
  show?: boolean;
  _id?: string;
}

const CollegeShow = () => {

  const { id } = useParams();
  const [college, setCollege] = useState<ICollegedata>();
  const [isEdit, setIsEdit] = useState<string>("");
  const navigate = useNavigate();

  const confirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmAlert({
      title: "Are you sure to edit the college?",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => {
            handleSubmit();
          },
        },
        {
          label: "No",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  const onBack = () => {
    navigate("/colleges");
  };

  const handleSubmit = () => {
    http
      .put(`${endpoint.UPDATE_COLLEGE}`.replace(':id', `${id}`), college)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Are you sure to delete the college?",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => {
            http
              .delete(`${endpoint.DELETE_COLLEGE}`.replace(':id', `${id}`))
              .then((res) => {
                if (res.data.status) {
                  toast.success("College successfully removed!");
                  navigate("/colleges");
                }
              })
              .catch((err) => {
                toast.error(err);
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  const fetchCollege = useCallback(() => {
    if (id) {
      http
        .get(`${endpoint.COLLEGE}`.replace(':id', `${id}`))
        .then((res) => {
          setCollege(res?.data);
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  }, [id]);

  useEffect(() => {
    fetchCollege();
  }, [fetchCollege]);

  const handleOnchangeCollege = (value: string) => {
    setCollege((pre) => ({ ...pre, name: value }));
  };

  return (
    <>
      <div className="card">
        <div className="card-header bg-white space-y-2 p-4 sm:px-8 sm:py-4 lg:p-4 xl:px-4 xl:py-4 border-2 border-white border-b-gray-300">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 text-lg">College</h2>
            <div className="ml-auto text-center flex">
              <span
                onClick={onBack}
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
              <a
                href="#!"
                onClick={() => setIsEdit("collegeName")}
                className="hover:bg-blue-600 group flex rounded-md bg-blue-700 text-center text-white text-sm font-medium mr-1 pl-2 pr-2 py-2 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
              </a>

              <span
                onClick={() => handleDelete()}
                className="hover:bg-red-400 group flex  rounded-md bg-red-500 text-white text-center text-sm font-medium pl-2 pr-2 py-2 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
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
              inputValue={college ? college.name : null}
              inputPlaceHolder={"College"}
              onChange={handleOnchangeCollege}
              isDisabled={isEdit === "collegeName" ? false : true}
            />
          </div>
          {isEdit ? (
            <div className="card-footer flex">
              <button
                type="submit"
                className="hover:bg-red-400 group flex  rounded-md bg-red-500 text-white text-center text-uppercase text-lg font-medium px-3 py-2 shadow-sm"
              >
                Submit
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
          ) : null}
        </form>
      </div>
    </>
  );
};

export default CollegeShow;
