interface IQuestionOption {
  title: string;
  value: boolean;
  query?: string;
  _id: string;
}
interface IQuestion {
  _id: string;
  question: string;
  options: IQuestionOption[];
  optionType: string;
  ans: string[];
}

export type { IQuestion, IQuestionOption };
