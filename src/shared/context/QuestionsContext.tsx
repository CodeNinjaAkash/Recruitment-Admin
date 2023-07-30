import React, { useEffect, useReducer } from "react";
import http from "../../utils/http";
import endpoint from '../../constants/endPoint'
interface IAction {
  type: string;
  payload: unknown;
}

export const QuestionContext = React.createContext<unknown>({
  question: "",
  optionType: "",
  ans: [],
  options: [],
});

function questionReducer(state: object, action: IAction) {
  switch (action.type) {
    case "GET_QUESTION":
      return http
        .get(`${endpoint.QUESTION}`.replace(':id', `${action.payload}`))
        .then((res) => {
          const resData = res?.data.question;
          return { ...state, ...resData };
        })
        .catch((error) => {
          console.error(error);
          return state;
        });
    default:
      return state;
  }
}

export const QuestionProvider = (props: { children: React.ReactNode }) => {
  const [question, questionDispatch] = useReducer(questionReducer, {
    question: "",
    optionType: "",
    ans: [],
    options: [],
  });

  useEffect(() => {}, [question]);

  return (
    <QuestionContext.Provider
      value={{
        question: question,
        questionDispatch: questionDispatch,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};
