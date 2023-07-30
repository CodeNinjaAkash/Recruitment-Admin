import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import http from "../../utils/http";
import endpoint from '../../constants/endPoint'
import { confirmAlert } from "react-confirm-alert";
import InputField from "../../shared/table/commanFields/Input";
import Dropdawn from "../../shared/dropdawn";
import { toast } from "react-toastify";

interface IQuestion {
  _id?: string;
  question?: string;
  options?: IQuestionOption[];
  optionType?: string;
  ans?: string[];
}
interface IQuestionOption {
  title?: string;
  value?: boolean;
  query?: string;
  _id?: string;
}

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IQuestion>({});
  const [isEditQuestion, setIsEditQuestion] = useState<boolean>(false);
  const [selectAns, setselectAns] = useState(false);
  const [queryType, setQueryType] = useState(false);
  const [info, setinfo] = useState<IQuestion>({});
  const [showOptions, setShowOptions] = useState(true);
  const [showQueryOptions, setShowQueryOptions] = useState(false);
  const [optionTypeNull, setoptionTypeNull] = useState(true);

  const optionTypes = [
    { name: "Single" },
    { name: "Query" },
    { name: "Multiple" },
  ];

  const confirmSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmAlert({
      title: "Are you sure to edit the question?",
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

  useEffect(() => {
    if (id) {
      http
        .get(`${endpoint.QUESTION}`.replace(':id', `${id}`))
        .then((res) => {
          if (res.data.question.optionType === "Query") {
            setQueryType(true);
          } else {
            setQueryType(false);
          }
          setinfo(res?.data.question);
          setData(res?.data.question);
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  }, [id]);

  const handleOnClickAddOptions = () => {
    const get = document.getElementById("form-control");
    setTimeout(() => {
      get?.click();
    }, 1000);
    for (let i = 0; i <= 3; i++) {
      if (data.options) {
        data.options[i] = { value: false, title: `` };
      }
    }
    setData((pre) => ({ options: data.options, ...pre }));
  };

  const handleOnChangeCheckbox = (selectedIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (data.options) {
      const titles = data.options.map((option) => option.title);
      if (new Set(titles).size !== titles.length) {
        toast.error("Duplicate options not allowed!");
        return;
      }
    }
    if (
      data.ans &&
      !data.ans.every((el) => data.options?.some((data) => el === data.title))
    ) {
      data.ans.every((el, index) => {
        if (!data.options?.some((data) => el === data.title)) {
          data.ans?.splice(index, 1);
        }
        return true;
      });
    }

    if (data.ans?.includes(e.target.name)) {
      let index = data.ans.findIndex((data) => data === e.target.name);
      data.ans.splice(index, 1);
    } else {
      data.ans?.push(e.target.name);
    }
    setData((pre) => ({ ans: data.ans, ...pre }));
  };

  const handleOnChangeRadio = (selectedIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (data.options) {
      const titles = data.options.map((option) => option.title);
      if (new Set(titles).size !== titles.length) {
        toast.error("Duplicate options not allowed!");
        return;
      }
    }

    data.ans = [e.target.name];
    setData((pre) => ({ ans: data.ans, ...pre }));
  };

  const handleOnChangeQuery = (index: number, e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    data.ans = [e.target.value];
    setData((pre) => ({ ans: data.ans, ...pre }));
  };

  const handleOnchangeQuestion = (value: string):void => {
    data.question = value;
    setData((pre) => ({ question: data.question, ...pre }));
  };

  const handleOnChangeOptionType = (e: ChangeEvent<HTMLSelectElement>) => {
    setoptionTypeNull(true);
    if (e.target.value !== info.optionType) {
      if (e.target.value === "Query" && data.ans) {
        data.ans = [""];
        setShowOptions(false);
        setShowQueryOptions(false);
        setoptionTypeNull(true);
      }
      if (e.target.value === "") {
        setoptionTypeNull(false);
        setShowQueryOptions(false);
      }
      if (e.target.value === "Single") {
        setShowOptions(true);
        setShowQueryOptions(true);
        setoptionTypeNull(true);
      }
      if (e.target.value === "Multiple") {
        setShowOptions(true);
        setShowQueryOptions(true);
        setoptionTypeNull(true);
      } else {
      }
    } else {
      if (e.target.value === "Query") {
        setShowOptions(false);
        setShowQueryOptions(false);
      }
      if (e.target.value === "Single") {
        setShowOptions(true);
      }
      if (e.target.value === "Multiple") {
        setShowOptions(true);
      } else {
      }
    }
    setData((pre) => ({ ...pre, optionType: e.target.value }));
  };

  const handleOnChangeExistingOptions = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (data.options) data.options[index].title = e.target.value;
    setData((pre) => ({ options: data.options, ...pre }));
  };

  const handleOnChangeoptions = (index: number, e: FormEvent<HTMLButtonElement>) => {
    if (data?.options?.length !== 4) {
      for (let i = 0; i <= 3; i++) {
        if (data.options) {
          if (index !== i) data.options[i] = { value: false, title: "" };
          else data.options[index] = { value: false, title: '' };
        }
      }
      setData((pre) => ({ options: data.options, ...pre }));
    }
  };

  const handleSubmit = () => {
    if (data.optionType === "Query" && data.ans) {
      if (data.ans[0].trim().length === 0) {
        toast.error("Please enter query's answer");
        return;
      }
      data.options = [{ value: false, query: "" }];
      setData((pre) => ({ options: data.options, ...pre }));
    }
    if (data.ans) {
      if (
        data.optionType === "Query" ||
        data.ans.every((el) => data.options?.some((data) => el === data.title))
      ) {
        http
          .put(`${endpoint.UPDATE_QUESTION}`.replace(':id', `${id}`), data)
          .then((res) => {
            res.data.status === "failed"
              ? toast.error(res.data.message)
              : toast.success(res.data.message);
          })
          .catch((err) => {
            toast.error(err);
          });
      } else {
        toast.error("please select the options");
      }
    } else {
      toast.error("Please select the optionType");
    }
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Are you sure to delete the question?",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => {
            http
              .delete(`${endpoint.DELETE_QUESTION}`.replace(':id', `${id}`))
              .then((res) => {
                if (res.data.status) {
                  toast.success("Question successfully deleted!");
                  setTimeout(() => {
                    navigate("/questions");
                  }, 2000);
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

  const onBack = () => {
    navigate("/questions");
  };

  return (
    <>
      <div className="card">
        <div className="card-header bg-white space-y-2 p-4 sm:px-8 sm:py-4 lg:p-4 xl:px-4 xl:py-4 border-2 border-white border-b-gray-300">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 text-lg">Question</h2>
            <div className="ml-auto text-center flex">
              <Link
                to="/questions"
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
              </Link>
              <span
                onClick={() => {
                  setIsEditQuestion(true);
                }}
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
              </span>
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
              id={"question"}
              labelText={"Question"}
              inputType={"text"}
              inputValue={data.question}
              inputPlaceHolder={"Question"}
              onChange={handleOnchangeQuestion}
              isDisabled={!isEditQuestion}
            />

            <Dropdawn
              id={"optionType"}
              name={"optionType"}
              dropdownArr={optionTypes}
              Select={"Select Option Type"}
              labelText={"OptionType"}
              selectedValue={data.optionType}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleOnChangeOptionType(e)}
              isDisabled={!isEditQuestion}
              handleOnClickAddOptions={handleOnClickAddOptions}
              setselectAns={() => setselectAns}
            />

            {!queryType && optionTypeNull ? (
              <>
                <ul className="question-list">
                  {showOptions &&
                    data?.options?.length === 4 &&
                    data?.options?.map((option, index) => {
                      return (
                        <li className="pb-3" key={`${index}-${data?._id}`}>
                          <label>{`Option${index + 1}`}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={option?.title}
                            id={`custom-checkbox-${index}-${data?._id}`}
                            name={option?.title}
                            onChange={(e) =>
                              handleOnChangeExistingOptions(index, e)
                            }
                            disabled={!isEditQuestion}
                            required
                          />
                        </li>
                      );
                    })}
                </ul>
                <div className="grid grid-cols-12 gap-1">
                  <div className="col-span-12 md:col-span-12 lg:col-span-12 group-div">
                    <button
                      type="button"
                      disabled={!isEditQuestion}
                      onClick={() => setselectAns(true)}
                      className="hover:bg-blue-400 group flex  rounded-md bg-blue-500 text-white text-center text-uppercase text-lg font-medium px-2 py-1 shadow-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-plus-circle-fill mt-1 mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                      </svg>{" "}
                      Add Correct Answer
                    </button>
                  </div>
                </div>

                <ul className="question-list">
                  {selectAns &&
                    data?.options?.map((option, index) => {
                      return (
                        <li key={`${index}-${data?._id}`}>
                          {data?.optionType === "Multiple" ? (
                            <input
                              type="checkbox"
                              id={`custom-checkbox-${index}-${data?._id}`}
                              name={option?.title}
                              checked={data.ans?.includes(option?.title || "")}
                              onChange={(e) => handleOnChangeCheckbox(index, e)}
                            />
                          ) : data?.optionType === "Query" && !index ? (
                            <div>
                              <label className="form-label" htmlFor="query">
                                SQL Query Answer
                              </label>
                                <textarea
                                  id={`custom-checkbox-${index}-${data?._id}`}
                                  className={`form-control`}
                                  name={option?._id}
                                  defaultValue={""}
                                  onChange={(e) => handleOnChangeQuery(index, e)}
                                ></textarea>
                            </div>
                          ) : data.optionType === "Single" ? (
                            <input
                              type="radio"
                              value={option?.title}
                              id={`custom-checkbox-${index}-${data?._id}`}
                              name={option?.title}
                              checked={data.ans?.includes(option?.title || "")}
                              onChange={(e) => handleOnChangeRadio(index, e)}
                            />
                          ) : null}

                          {data.optionType !== "Query" ? (
                            <label
                              htmlFor={`custom-checkbox-${index}-${data?._id}`}
                            >
                              {option?.title}
                            </label>
                          ) : null}
                        </li>
                      );
                    })}
                </ul>
              </>
            ) : null}

            {queryType && optionTypeNull ? (
              <>
                <ul className="question-list">
                  {data?.options?.length === 4 &&
                    showQueryOptions &&
                    data?.options?.map((option, index) => {
                      return (
                        <li className="pb-3" key={`${index}-${data?._id}`}>
                          <label>{`Option${index + 1}`}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={option?.title}
                            id={`custom-checkbox-${index}-${data?._id}`}
                            name={option?.title}
                            onChange={(e) =>
                              handleOnChangeExistingOptions(index, e)
                            }
                          />
                        </li>
                      );
                    })}
                </ul>

                <div className="grid grid-cols-12 gap-1">
                  <div className="col-span-12 md:col-span-12 lg:col-span-12 group-div">
                    <button
                      disabled={!isEditQuestion}
                      type="button"
                      onChange={(e) => handleOnChangeoptions(0, e)}
                      onClick={(e) => {
                        setselectAns(true);
                      }}
                      className="hover:bg-blue-400 group flex  rounded-md bg-blue-500 text-white text-center text-uppercase text-lg font-medium px-2 py-1 shadow-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-plus-circle-fill mt-1 mr-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                      </svg>{" "}
                      Add Correct Answer
                    </button>
                  </div>
                </div>

                <ul className="question-list">
                  {selectAns &&
                    data?.options?.map((option, index) => {
                      return (
                        <li key={`${index}-${data?._id}`}>
                          {data?.optionType === "Multiple" ? (
                            <input
                              type="checkbox"
                              id={`custom-checkbox-${index}-${data?._id}`}
                              name={option?.title}
                              checked={data.ans?.includes(option?.title || "")}
                              onChange={(e) => handleOnChangeCheckbox(index, e)}
                            />
                          ) : data?.optionType === "Query" && !index ? (
                            <div>
                              <label className="form-label" htmlFor="query">
                                SQL Query Answer
                              </label>
                              <textarea
                                id={`custom-checkbox-${index}-${data?._id}`}
                                className={`form-control`}
                                name={option?._id}
                                defaultValue={
                                  data?.optionType === "Query" ? data.ans : ""
                                }
                                onChange={(e) => handleOnChangeQuery(index, e)}
                              ></textarea>
                            </div>
                          ) : data.optionType === "Single" ? (
                            <input
                              type="radio"
                              value={option?.title}
                              id={`custom-checkbox-${index}-${data?._id}`}
                              name={option?.title}
                              checked={data.ans?.includes(option?.title || "")}
                              onChange={(e) => handleOnChangeRadio(index, e)}
                            />
                          ) : null}

                          {data.optionType !== "Query" ? (
                            <label
                              htmlFor={`custom-checkbox-${index}-${data?._id}`}
                            >
                              {option?.title}
                            </label>
                          ) : null}
                        </li>
                      );
                    })}
                </ul>
              </>
            ) : null}
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

export default QuestionDetail;
