import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import endpoint from '../../constants/endPoint'
import http from "../../utils/http";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

import InputField from "../../shared/table/commanFields/Input";
import Dropdawn from "../../shared/dropdawn";

const QuestionAdd = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [optionType, setOptionType] = useState("Single");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState<string[]>([]);
  const [optionsArr, setOptionsArr] = useState<
    {
      value?: boolean;
      title?: string;
      query?: string;
    }[]
  >([]);
  const confirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmAlert({
      title: "Are you sure to submit the question?",
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

  const optionTypes = [
    { name: "Single" },
    { name: "Query" },
    { name: "Multiple" },
  ];

  const fetchQuestion = useCallback(() => {}, []);

  useEffect(() => {
    setOptionsArr(
      [option1, option2, option3, option4].map((i) => ({
        value: false,
        title: i,
      }))
    );
  }, [option1, option2, option3, option4]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleOnChangeCheckbox = (
    selectedIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    optionsArr[selectedIndex].value = e.target.checked;

    if (answer?.includes(e.target.name)) {
      let index = answer.findIndex((data) => data === e.target.name);
      answer.splice(index, 1);
    } else {
      answer?.push(e.target.name);
    }

    setOptionsArr(optionsArr);
    setAnswer([...answer]);
  };

  const handleOnChangeRadio = (
    selectedIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    optionsArr.map((data) => {
      if (data.title === e.target.value) {
        return (data.value = true);
      } else {
        return (data.value = false);
      }
    });

    setOptionsArr(optionsArr);
    setAnswer([e.target.name]);
  };

  const handleOnChangeOptionType = (e: ChangeEvent<HTMLSelectElement>) => {
    setOptionType(e.target.value);
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer([]);
    if (e.target.value === "Query") {
      setOptionsArr([]);
    } else {
      optionsArr.map((el) => (el.value = false));
      setOptionsArr(optionsArr);
    }
  };

  const handleSubmit = () => {
    if (!question) {
      toast.error("Question is required!");
    } else if (!optionType) {
      toast.error("OptionType is required!");
    } else if (
      optionType !== "Query" &&
      (!option1 || !option2 || !option3 || !option4)
    ) {
      toast.error("Options are required!");
    } else if (!answer.length) {
      toast.error("Answer is requied!");
      return false;
    }

    let finalData = {};
    if (optionType === "Query") {
      let options = [{ value: false, query: "" }];
      finalData = {
        question: question,
        optionType: optionType,
        options: options,
        ans: answer,
      };

      http
        .post(`${endpoint.CREATE_QUESTION}`, finalData)
        .then((res) => {
          toast.success("Question added successfully!");
          navigate("/questions");
        })
        .catch((err) => {
          toast.error(err);
        });
    }

    if (question && option1 && option2 && option3 && option4 && optionType) {
      let arr = [
        { value: false, title: option1 },
        { value: false, title: option2 },
        { value: false, title: option3 },
        { value: false, title: option4 },
      ];

      if (answer.every((el) => arr?.some((element) => el === element.title))) {
        finalData = {
          question: question,
          optionType: optionType,
          options: arr,
          ans: answer,
        };

        http
          .post(`${endpoint.CREATE_QUESTION}`, finalData)
          .then((res) => {
            res.data.status === "failed"
              ? toast.error(res.data.message)
              : toast.success(res.data.message);
            navigate("/questions");
          })
          .catch((err) => {
            toast.error(err);
          });
      } else {
        toast.error("Please check the correct answer");
      }
    }
  };

  const handleAddAnswer = () => {
    setOpen(!open);
    const options = [option1, option2, option3, option4];
    if (!question) {
      toast.error("Question is required!");
    } else if (!optionType) {
      toast.error("OptionType is required!");
    } else if (!option1 || !option2 || !option3 || !option4) {
      toast.error("Options are required!");
    } else if (
      new Set(options).size !== options.length &&
      optionType !== "Query"
    ) {
      toast.error("Duplicate options are not allowed!");
      return false;
    } else {
      setOptionsArr(
        [option1, option2, option3, option4].map((i) => ({
          value: false,
          title: i,
        }))
      );
      setAnswer([]);
    }
  };

  const onBack = () => {
    navigate("/questions");
  };

  return (
    <>
      <div className="card">
        <div className="bg-white space-y-2 p-4 sm:px-8 sm:py-4 lg:p-4 xl:px-4 xl:py-4 border-2 border-white border-b-gray-300">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 text-lg">
              Add Question
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
              id={"question"}
              labelText={"Question"}
              inputType={"text"}
              inputValue={question}
              inputPlaceHolder={"Question"}
              onChange={setQuestion}
            />

            <Dropdawn
              id={"optionType"}
              name={"optionType"}
              dropdownArr={optionTypes}
              Select={"Select Option Type"}
              labelText={"OptionType"}
              selectedValue={optionType}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleOnChangeOptionType(e)
              }
            />

            {optionType !== "Query" && (
              <div>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-12 md:col-span-6 lg:col-span-6">
                    <InputField
                      id={"option1"}
                      labelText={"option1"}
                      inputType={"text"}
                      inputValue={option1}
                      inputPlaceHolder={"Option1"}
                      onChange={setOption1}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-6">
                    <InputField
                      id={"option2"}
                      labelText={"option2"}
                      inputType={"text"}
                      inputValue={option2}
                      inputPlaceHolder={"Option2"}
                      onChange={setOption2}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-6">
                    <InputField
                      id={"option3"}
                      labelText={"option3"}
                      inputType={"text"}
                      inputValue={option3}
                      inputPlaceHolder={"Option3"}
                      onChange={setOption3}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-6">
                    <InputField
                      id={"option4"}
                      labelText={"option4"}
                      inputType={"text"}
                      inputValue={option4}
                      inputPlaceHolder={"Option4"}
                      onChange={setOption4}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-1">
                  <div className="col-span-12 md:col-span-12 lg:col-span-12 group-div">
                    <button
                      type="button"
                      onClick={() => handleAddAnswer()}
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
              </div>
            )}

            {open && optionsArr && (
              <ul className="question-list">
                {optionsArr.map((option, index) => {
                  return (
                    <li key={`${index}`}>
                      {optionType === "Multiple" ? (
                        <input
                          type="checkbox"
                          value={option?.title}
                          id={`custom-checkbox-${index}`}
                          name={option?.title}
                          checked={option.value}
                          onChange={(e) => handleOnChangeCheckbox(index, e)}
                        />
                      ) : optionType === "Single" ? (
                        <input
                          type="radio"
                          value={option?.title}
                          id={`custom-radio-${index}`}
                          name={option?.title}
                          checked={option.value}
                          onChange={(e) => handleOnChangeRadio(index, e)}
                        />
                      ) : null}
                      <label htmlFor={`custom-checkbox-${index}`}>
                        {option?.title}
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}

            {optionType === "Query" ? (
              <>
                <div>
                  <label className="form-label" htmlFor="custom-query">
                    SQL Query Answer
                  </label>
                  <textarea
                    id="custom-query"
                    className="form-control"
                    name="query"
                    value={answer[0]}
                    required
                    onChange={(e) => setAnswer([e.target.value])}
                  ></textarea>
                </div>
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

export default QuestionAdd;
