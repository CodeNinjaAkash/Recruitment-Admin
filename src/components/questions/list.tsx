import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import endpoint from '../../constants/endPoint'
import http from "../../utils/http";
import { useSelector } from "react-redux";
import { Table } from "./../../shared/table/Table";
import { getToken } from "./../../Services/LocalStorageService";
import { IQuestion } from "../../interfaces/question";
import { IColumn } from "../../interfaces/comman";

const QuestionList = () => {
  const navigate = useNavigate();
  const token = getToken();
  const page = useSelector((state: {counter: {page: number}}) => state.counter.page);
  const [dataSize, setdataSize] = useState(0);
  const limit =10;
  const questionfullInfo = (id?: string) => {
    navigate(`/questions/${id}`);
  };



  const columns: IColumn[] = [
    { accessor: "question", label: "Text" },
    { accessor: "optionType", label: "Option Type" },
  ];
  const [rows, setRows] = useState<IQuestion[]>([]);
  useEffect(() => {

    http.get(`${endpoint.QUESTION_PAGINATE}?page=${page}&limit=${limit}`)
      .then((res) => {
        navigate(`/questions?p=${page}`);
        setRows(res.data.results);
        setdataSize(res.data.dataSize);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, page, token]);

  const handleAddQuestion = () => {
    navigate("/questions/add");
  };

  return (
    <>
      <Table
        rowsPerPage={10}
        rows={rows}
        onClickName={questionfullInfo}
        columns={columns}
        heading={"Questions"}
        btnText={"Add Question"}
        onClickBtn={() => handleAddQuestion()}
        dataSize={dataSize}
      />
    </>
  );
};

export default QuestionList;
