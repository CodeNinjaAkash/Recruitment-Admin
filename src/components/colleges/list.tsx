import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import endpoint from '../../constants/endPoint'
import http from "../../utils/http";
import { IColumn } from "../../interfaces/comman";
import { Table } from "./../../shared/table/Table";

const columns: IColumn[] = [{ accessor: "name", label: "Colleges" }];

const CollegeList = () => {

  const [colleges, setColleges] = useState([]);
  const [dataSize, setdataSize] = useState(0);
  const navigate = useNavigate();
  const page = useSelector(
    (state: { counter: { page: number } }) => state.counter.page
  );
  const limit =10

  useEffect(() => {
    http
      .get(
        `${endpoint.COLLEGE_PAGINATE}?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setColleges(res?.data.results);
        setdataSize(res?.data.dataSize);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const collegefullInfo = (id?: string) => {
    navigate(`/colleges/${id}`);
  };

  const handleAddCollege = () => {
    navigate("/colleges/add");
  };

  return (
    <>
      <Table
        rowsPerPage={10}
        rows={colleges}
        onClickName={collegefullInfo}
        columns={columns}
        heading={"Colleges"}
        btnText={"Add College"}
        onClickBtn={() => handleAddCollege()}
        dataSize={dataSize}       />
    </>
  );
};

export default CollegeList;
