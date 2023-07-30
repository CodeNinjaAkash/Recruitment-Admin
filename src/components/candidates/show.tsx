import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import http from "../../utils/http";
import endpoint from '../../constants/endPoint'
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { getToken } from "../../Services/LocalStorageService";
import InputField from "../../shared/table/commanFields/Input";
import Textarea from "../../shared/table/commanFields/textarea";
import Dropdawn from "../../shared/dropdawn";
import { ICollegeOption } from "../../interfaces/college";
interface ICollege {
  _id: string;
  name?: string;
}
interface ICandidatedata {
  _id?: string;
  optionType?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  mobileNo?: string;
  educationDetails?: string;
  areaOfInterest?: string;
  futureGoal?: string;
  currentAddress?: string;
  experience?: string;
  college?: string;
}

const experienceArr = [
  {
    name: "Trainee",
  },
  {
    name: "1-2",
  },
  {
    name: "3-4",
  },
  {
    name: "5-6",
  },
  {
    name: "7-8",
  },
  {
    name: "9-10",
  },
  {
    name: "10+",
  },
];

const CandidateShow = () => {

  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<ICandidatedata>({});
  const [collegeOptions, setCollegeOptions] = useState<ICollegeOption[]>([]);
  const [collegeId, setCollegeId] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [firstName, setfirstName] = useState<string>("");
  const [middleName, setmiddleName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [dob, setdob] = useState<string>("");
  const [mobileNo, setmobileNo] = useState<string>("");
  const [educationDetails, seteducationDetails] = useState<string>("");
  const [areaOfInterest, setAreaOfInterest] = useState<string>("");
  const [futureGoal, setfutureGoal] = useState<string>("");
  const [currentAddress, setcurrentAddress] = useState<string>("");
  const [experience, setexperience] = useState<string>("");
  let token = getToken();
  const { id } = useParams();

  const confirmDelete = () => {

    confirmAlert({
      title: "Are you sure to delete candidate details?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDelete();
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

  const confirmSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    confirmAlert({
      title: "Are you sure to edit candidate details?",
      buttons: [
        {
          label: "Yes",
          onClick: (e) => {
            handleSubmit(e);
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
    http
    .get(`${endpoint.CANDIDATE}`.replace(':id', `${id}`), {})
      .then((res) => {
        setCandidate(res.data.candidate);
      })
      .catch((err) => {
        console.log(err);
      });

      http.get(`${endpoint.COLLEGES}`).then((res) => {
      setCollegeOptions(
        res?.data.colleges.map((i: ICollege) => ({
          value: i._id,
          name: i.name,
        }))
      );
    });

  }, [ id, token]);

  useEffect(() => {
    setfirstName(candidate.firstName ? candidate.firstName : "");
    setmiddleName(candidate.middleName ? candidate.middleName : "");
    setlastName(candidate.lastName ? candidate.lastName : "");
    setdob(candidate.dob ? candidate.dob : "");
    setemail(candidate.email ? candidate.email : "");
    setmobileNo(candidate.mobileNo ? candidate.mobileNo : "");
    setcurrentAddress(candidate.currentAddress ? candidate.currentAddress : "");
    seteducationDetails(
      candidate.educationDetails ? candidate.educationDetails : ""
    );
    setAreaOfInterest(candidate.areaOfInterest ? candidate.areaOfInterest : "");
    setfutureGoal(candidate.futureGoal ? candidate.futureGoal : "");
    setCollegeId(candidate.college ? candidate.college : "");
    setexperience(candidate.experience ? candidate.experience : "");
  }, [candidate]);

  const handleOnChangeExperience = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setexperience(e.target.value);
  };

  const handleOnChangeCollege = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCollegeId(e.target.value);
  };

  const handleDelete = () => {
    http
      .delete(`${endpoint.DELETE_CANDIDATE}`.replace(`:id`, `${id}`))
      .then((res) => {
        if (res.data.status) {
          toast.success("Delete candidate details successfully!");
          navigate("/candidates");
        }
      })
      .catch((err) => {});
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const response = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      dob: dob,
      mobileNo: mobileNo,
      educationDetails: educationDetails,
      areaOfInterest: areaOfInterest,
      futureGoal: futureGoal,
      currentAddress: currentAddress,
      collegeId: collegeId,
      experience: experience,
    };
    http
    .get(`${endpoint.CANDIDATE}`.replace(':id', `${id}`), {})
      .then((users) => {
        if (users.data.candidate.email !== email) {
          Object.assign(response, { email });
        }
      })
      .then(() => {
        http
          .put(`${endpoint.UPDATE_CANDIDATE}`.replace(':id', `${id}`), response)
          .then((res) => {
            if (res.data.status) {
              toast.success(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  // const handleResume = (id) => {
  //   http
  //     .get(`${endpoint.DOWNLOAD}`.replace(':id', `${id}`), {
  //       responseType: "blob",
  //     })
  //     .then((res) => {
  //       res.data.size > 165
  //         ? window.open(URL.createObjectURL(res.data))
  //         : toast.success("Resume doesn't exist");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <div className="card">
        <div className="card-header bg-white space-y-2 p-4 sm:px-8 sm:py-4 lg:p-4 xl:px-4 xl:py-4 border-2 border-white border-b-gray-300">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 text-lg">
              Candidate Details
            </h2>

            <div className="ml-auto text-center flex">
              <Link
                to={"/candidates"}
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
              {/* <Link
                to={"#!"}
                onClick={() => handleResume(id)}
                className="hover:bg-blue-600 group flex rounded-md bg-blue-700 text-center text-white text-sm font-medium mr-1 pl-2 pr-2 py-2 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-down-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                </svg>
              </Link> */}
              <Link
                to={"#!"}
                onClick={() => setIsEdit(!isEdit)}
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
              </Link>
              <span
                onClick={() => confirmDelete()}
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
        <form onSubmit={(e) => confirmSubmit(e)}>
          <div className="card-body">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  labelText={"First Name"}
                  inputType={"text"}
                  inputName={"FirstName"}
                  inputValue={firstName}
                  inputPlaceHolder={"First Name"}
                  onChange={setfirstName}
                  id={"firstName"}
                  isDisabled={!isEdit}
                />
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  labelText={"Middle Name"}
                  inputType={"text"}
                  inputName={"MiddleName"}
                  inputValue={middleName}
                  inputPlaceHolder={"Middle Name"}
                  onChange={setmiddleName}
                  id={"middleName"}
                  isDisabled={!isEdit}
                />
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  labelText={"Last Name"}
                  inputType={"text"}
                  inputName={"LastName"}
                  inputValue={lastName}
                  inputPlaceHolder={"Last Name"}
                  onChange={setlastName}
                  id={"lastName"}
                  isDisabled={!isEdit}
                />
              </div>
              <div className="col-span-12">
                <InputField
                  labelText={"Email"}
                  inputType={"email"}
                  inputName={"email"}
                  inputValue={email}
                  inputPlaceHolder={"Email"}
                  onChange={setemail}
                  id={"email"}
                  isDisabled={!isEdit}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <InputField
                  labelText={"Date of Birth"}
                  inputType={"date"}
                  inputName={"dob"}
                  inputValue={dob}
                  inputPlaceHolder={"Date of birth"}
                  onChange={setdob}
                  max={Number(
                    `${new Date().getFullYear() - 18}${
                      (new Date().getMonth() + 1).toString().padStart(2, "0")
                    }${new Date().getDate().toString().padStart(2, "0")}`
                  )
                  }
                  id={"dob"}
                  isDisabled={!isEdit}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <InputField
                  labelText={"Mobile NO."}
                  inputType={"text"}
                  inputName={"phone"}
                  inputValue={mobileNo}
                  inputPlaceHolder={"mobile No."}
                  minLength={10}
                  maxLength={10}
                  onChange={setmobileNo}
                  id={"phone"}
                  isDisabled={!isEdit}
                />
              </div>
              <div className="col-span-12">
                <Textarea
                  labelText={"Current Address"}
                  inputName={"currentAddress"}
                  inputValue={currentAddress}
                  inputPlaceHolder={"Current Address"}
                  onChange={setcurrentAddress}
                  isDisabled={!isEdit}
                  id={"currentAddress"}
                  rows={"4"}
                  class={"form-control"}
                />
              </div>

              <div className="col-span-12">
                <Dropdawn
                  onChange={handleOnChangeExperience}
                  selectedValue={experience}
                  id={"exerience"}
                  name={"experience"}
                  labelText={"Experience"}
                  dropdownArr={experienceArr}
                  Select={"Select Experience"}
                  isDisabled={!isEdit}
                />
              </div>
              {experience === "Trainee" ||
              experience === "1-2" ||
              experience === "0" ? (
                <>
                  <div className="col-span-12">
                    <Dropdawn
                      onChange={handleOnChangeCollege}
                      selectedValue={collegeId}
                      id={"collegeId"}
                      name={"collegeId"}
                      labelText={"College"}
                      dropdownArr={collegeOptions}
                      Select={"Select College"}
                      isDisabled={!isEdit}
                      required={true}
                    />
                  </div>
                  <div className="col-span-12">
                    <Textarea
                      labelText={
                        "Education Details : Last Semester Score/Grade"
                      }
                      inputName={"educationDetails"}
                      inputValue={educationDetails}
                      inputPlaceHolder={
                        "Education Details : Last Semester Score/Grade"
                      }
                      onChange={seteducationDetails}
                      isDisabled={!isEdit}
                      id={"educationDetails"}
                      rows={"4"}
                      class={"form-control"}
                    />
                  </div>
                  <div className="col-span-12">
                    <Textarea
                      labelText={"Area of Interest"}
                      inputName={"areaOfInterest"}
                      inputValue={areaOfInterest}
                      inputPlaceHolder={"Area Of Interest"}
                      onChange={setAreaOfInterest}
                      isDisabled={!isEdit}
                      id={"areaOfInterest"}
                      rows={"4"}
                      class={"form-control"}
                    />
                  </div>
                  <div className="col-span-12">
                    <Textarea
                      labelText={"Future Goal"}
                      inputName={"futureGoal"}
                      inputValue={futureGoal}
                      inputPlaceHolder={"Future Goal"}
                      onChange={setfutureGoal}
                      isDisabled={!isEdit}
                      id={"futureGoal"}
                      rows={"4"}
                      class={"form-control"}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>{" "}
          {isEdit ? (
            <div className="card-footer">
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
          ) : null}
        </form>
      </div>
    </>
  );
};

export default CandidateShow;
