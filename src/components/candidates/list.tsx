import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../../utils/http";
import endpoint from '../../constants/endPoint';
import { Table } from "./../../shared/table/Table";
import Dropdawn from "../../shared/dropdawn";
import InputField from "../../shared/table/commanFields/Input";
import MInputField from "../../shared/table/commanFields/mobileInput";
import { pagenum } from "../../redux/features/counter/CounterSlice";
import { ICandidatedata, ICandidate } from "../../interfaces/candidate";
import { ICollegeOption, ICollege } from "../../interfaces/college";
import { IColumn } from "../../interfaces/comman";

// import { CSVLink } from "react-csv";

const columns: IColumn[] = [
  { accessor: "firstName", label: "Name" },
  { accessor: "email", label: "Email" },
  { accessor: "collegeName", label: "COLLAGE" },
  { accessor: "mobileNo", label: "MOBILE NO" },
  { accessor: "registerDate", label: "Register Date" },
  { accessor: "resultPercentage", label: "Result (%)" },
  { accessor: "link", label: "Join Link" },
];
interface Action {
  name: string;
}

const actions: Action[] = [
  { name: "Result" },
  { name: "Resume" },
  { name: "Rejoin Link" },
];

const CandidateList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [firstName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [endDate, setEndDate] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [collegeOptions, setCollegeOptions] = useState<ICollegeOption[]>([]);
  const [dataSize, setDataSize] = useState(0);
  const [joinlink, setjoinlink] = useState("");
  const [value, setState] = useState(true);
  const [click, setclick] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [candidates, setCandidates] = useState<ICandidatedata[]>([]);
  const page = useSelector(
    (state: { counter: { page: number } }) => state.counter.page
  );

  const clearAll = () => {
    setclick(true);
    dispatch(pagenum(1));
    setName("");
    setEmail("");
    setMobileNo("");
    setStartDate("");
    setEndDate("");
    setCollegeId("");
  };

  useEffect(() => {
    if (click && isSearch) {
      handleSubmit();
      setIsSearch(false);
    }
    setTimeout(() => {
      setclick(false);
    }, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    click,
    collegeId,
    email,
    endDate,
    firstName,
    mobileNo,
    startDate,
    isSearch,
  ]);

  const handleAddCandidate = () => {
    navigate("/candidates/add");
  };

  // const exportd = <CSVLink data={alldata}>All Export</CSVLink>;

  const CandidatafullInfo = (id?: string) => {
    navigate(`/candidates/${id}`);
  };

  const handleClickAction = (id?: string, actionName?: string) => {
    if (actionName === "Result") navigate(`/candidates/${id}/result`);
    else if (actionName === "Resume") {
      if (id) {
        handleResume(id);
      }
    } else if (actionName === "Rejoin Link") {
      setState(!value);
      navigate(`/candidates?${id}`);
      http
        .put(`${endpoint.CREATE_REJOIN_LINK}?id=${id}`, )
        .then((res) => {
          setjoinlink(res.data.link);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleResume = (id: string) => {
    http
      .get(`${endpoint.DOWNLOAD}`.replace(':id', `${id}`), {
        responseType: "blob",
      })
      .then((res) => {
        window.open(URL.createObjectURL(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnChangeCollege = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCollegeId(e.target.value);
  };

  const handleSubmit = () => {
    http
      .get(`${endpoint.FILTER}`, {
        params: {
          page: page,
          limit: 10,
          startDate: startDate ? startDate : null,
          endDate: endDate ? endDate : null,
          collegeId: collegeId ? collegeId : null,
          firstName: firstName ? firstName : null,
          email: email ? email : null,
          mobileNo: mobileNo ? mobileNo : null,
        },
      })
      .then((res) => {
        setCandidates(
          res.data.results.map((i: ICandidate) => ({
            _id: i._id,
            firstName: i.firstName,
            middleName: i.middleName,
            lastName: i.lastName,
            email: i.email,
            collegeName: i.college ? i.college.name : null,
            mobileNo: i.mobileNo,
            registerDate: i.registerDate,
            resultPercentage: i.resultPercentage,
            link: i.link,
          }))
        );
        setDataSize(res.data.dataSize);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    http.get(`${endpoint.COLLEGES}`).then((res) => {
      setCollegeOptions(
        res?.data.colleges.map((i: ICollege) => ({ value: i._id, name: i.name }))
      );
    });

    handleSubmit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinlink, page]);

  // const handleDownload = useCallback(
  //   (e) => {
  //     e.preventDefault();

  //     http
  //       .get(`/management/download/candidateData/get`, {
  //         params: {
  //           page: page,
  //           limit: 10,
  //           startDate: startDate ? startDate : null,
  //           endDate: endDate ? endDate : null,
  //           collegeId: collegeId ? collegeId : null,
  //           firstName: firstName ? firstName : null,
  //           email: email ? email : null,
  //           mobileNo: mobileNo ? mobileNo : null,
  //         },
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((res) => {
  //         setexportData(res.data.results);
  //         const get = document.getElementById("btn");
  //         setTimeout(() => {
  //           get?.click();
  //         }, 1000);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   },

  //   [collegeId, email, endDate, firstName, mobileNo, page, startDate]
  // );

  const filter = (
    <>
      {/* <CSVLink data={exportData} type="submit" id="btn"></CSVLink>
      <div className="inline-grid grid-cols-2 gap-2 ml-6">
        <button
          className="hover:bg-neutral-600 group flex  cursor-pointer rounded-md bg-neutral-900 text-white text-center text-sm font-medium  pl-2 pr-2 py-2 shadow-sm"
          onClick={handleDownload}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-filetype-csv"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.517 14.841a1.13 1.13 0 0 0 .401.823c.13.108.289.192.478.252.19.061.411.091.665.091.338 0 .624-.053.859-.158.236-.105.416-.252.539-.44.125-.189.187-.408.187-.656 0-.224-.045-.41-.134-.56a1.001 1.001 0 0 0-.375-.357 2.027 2.027 0 0 0-.566-.21l-.621-.144a.97.97 0 0 1-.404-.176.37.37 0 0 1-.144-.299c0-.156.062-.284.185-.384.125-.101.296-.152.512-.152.143 0 .266.023.37.068a.624.624 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.092 1.092 0 0 0-.2-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.551.05-.776.15-.225.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.122.524.082.149.2.27.352.367.152.095.332.167.539.213l.618.144c.207.049.361.113.463.193a.387.387 0 0 1 .152.326.505.505 0 0 1-.085.29.559.559 0 0 1-.255.193c-.111.047-.249.07-.413.07-.117 0-.223-.013-.32-.04a.838.838 0 0 1-.248-.115.578.578 0 0 1-.255-.384h-.765ZM.806 13.693c0-.248.034-.46.102-.633a.868.868 0 0 1 .302-.399.814.814 0 0 1 .475-.137c.15 0 .283.032.398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.441 1.441 0 0 0-.489-.272 1.838 1.838 0 0 0-.606-.097c-.356 0-.66.074-.911.223-.25.148-.44.359-.572.632-.13.274-.196.6-.196.979v.498c0 .379.064.704.193.976.131.271.322.48.572.626.25.145.554.217.914.217.293 0 .554-.055.785-.164.23-.11.414-.26.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.799.799 0 0 1-.118.363.7.7 0 0 1-.272.25.874.874 0 0 1-.401.087.845.845 0 0 1-.478-.132.833.833 0 0 1-.299-.392 1.699 1.699 0 0 1-.102-.627v-.495Zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879l-1.327 4Z"
            />
          </svg>
          &nbsp; Download
        </button>
      </div> */}
      <form
        className="inline-grid grid-cols-7 gap-2 ml-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <InputField
          inputType={"text"}
          labelText={"Name"}
          inputName={"name"}
          inputValue={firstName}
          inputPlaceHolder={"Name"}
          onChange={setName}
          id={"name"}
        />
        <InputField
          inputType={"email"}
          labelText={"Email"}
          inputName={"email"}
          inputValue={email}
          inputPlaceHolder={"Email"}
          onChange={setEmail}
          id={"email"}
        />
        <MInputField
          inputType={"tel"}
          labelText={"Mobile Number"}
          inputName={"mobile number"}
          inputValue={mobileNo}
          inputPlaceHolder={"Mobile Number"}
          onChange={setMobileNo}
          id={"mobile number"}
          pattern="\d*"
        />
        <InputField
          inputType={"date"}
          labelText={"Start date"}
          inputName={"date"}
          inputValue={startDate}
          onChange={setStartDate}
          id={"date"}
        />
        <InputField
          inputType={"date"}
          labelText={"End date"}
          inputName={"date"}
          inputValue={endDate}
          onChange={setEndDate}
          id={"date"}
        />
        <Dropdawn
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleOnChangeCollege(e)
          }
          selectedValue={collegeId}
          id={"collegeId"}
          name={"collegeId"}
          labelText={"College"}
          dropdownArr={collegeOptions}
          Select={"Select College"}
        />

        <div className="d-flex items-center">
          <button
            onClick={() => {
              dispatch(pagenum(1));
              setIsSearch(true);
            }}
            type="submit"
            className="hover:bg-neutral-600 group flex cursor-pointer rounded-md bg-neutral-900 text-white text-center text-sm font-medium  pl-2 pr-2 py-2 mt-2.5 shadow-sm mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            &nbsp; Search
          </button>
          <button
            type="reset"
            className="hover:bg-red-400 group flex cursor-pointer rounded-md bg-red-500 text-white text-center text-sm font-medium  pl-2 pr-2 py-2 mt-2.5 shadow-sm mr-2"
            onClick={() => {
              clearAll();
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );

  return (
    <Table
    exportdata={true}
      rowsPerPage={10}
      rows={candidates}
      onClickName={CandidatafullInfo}
      actions={actions}
      onClickAction={handleClickAction}
      columns={columns}
      heading="Candidates"
      btnText={"Add Candidate"}
      onClickBtn={handleAddCandidate}
      dataSize={dataSize}
      joinlink={joinlink}
      filter={filter}
    />
  );
};

export default CandidateList;
