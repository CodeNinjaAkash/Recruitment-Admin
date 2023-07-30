import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import http from "../../utils/http";
import endpoint from '../../constants/endPoint'
import { Table } from "./../../shared/table/Table";
import { getToken } from "./../../Services/LocalStorageService";
import { IQuestion } from "../../interfaces/question";
import { IColumn } from "../../interfaces/comman";

const columns: IColumn[]= [
  { accessor: "question", label: "Question" },
  { accessor: "ans", label: "Real Answer" },
  { accessor: "candidateans", label: "Candidate Answer" },
  { accessor: "isCorrect", label: "Result" },
];

const CandidateResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getToken();
  const [rows, setRows] = useState<IQuestion[]>([]);
  const page = useSelector(
    (state: { counter: { page: number } }) => state.counter.page
  );

  useEffect(() => {

    http
      .get(`${endpoint.CANDIDATE}`.replace(':id', `${id}`), {})
      .then((res) => {
        let candidateans: string[] = [];
        res.data.candidate.candidateQuestion.map((data: IQuestion, index: number) => {
          data?.options.map((options) => {
            if (options.value) {
              candidateans.push(options?.title);
            }
            return options;
          });

          res.data.candidate.candidateQuestion[index]["candidateans"] = candidateans;
          res.data.candidate.candidateQuestion[index]["isCorrect"] = JSON.stringify(
            JSON.stringify(candidateans) === JSON.stringify(data.ans)
          );
          candidateans = [];

            return data
        });
        setRows(res.data.candidate.candidateQuestion);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, page, token]);

  const handleBack = () => {
    navigate("/candidates");
  };

  return (
    <>
      <div>
        <Table
          rowsPerPage={10}
          rows={rows}
          columns={columns}
          btnTexts={"Back"}
          onClickBtns={() => handleBack()}
          heading={"Candidate Result"}
          dataSize={null}/>
      </div>
    </>
  );
};

export default CandidateResult;
