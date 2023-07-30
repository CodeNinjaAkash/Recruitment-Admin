import React, { useState, useRef, useEffect } from "react";
import http from "../../utils/http";
import endpoint from '../../constants/endPoint'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ICollegeOption, ICollege } from "../../interfaces/college";

function AddCandidate() {

  const [isLoad, setIsLoad] = useState(false);
  const [collegeOptions, setCollegeOptions] = useState<ICollegeOption[]>([]);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const middleNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const collegeRef = useRef<HTMLSelectElement>(null);
  const [experience, setExperience] = useState("");
  const dateOfBirthRef = useRef<HTMLInputElement>(null);
  const educationDetailsRef = useRef<HTMLTextAreaElement>(null);
  const areaOfInterestRef = useRef<HTMLTextAreaElement>(null);
  const futureGoalRef = useRef<HTMLTextAreaElement>(null);
  const currentAddressRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    http.get(`${endpoint.COLLEGES}`).then((res) => {
      setCollegeOptions(
        res?.data.colleges.map((i: ICollege) => ({ value: i._id, name: i.name }))
      );
    });
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("firstName", firstNameRef.current?.value as string);
    formData.append("middleName", middleNameRef.current?.value as string);
    formData.append("lastName", lastNameRef.current?.value as string);
    formData.append("mobileNo", phoneRef.current?.value as string);
    formData.append("email", emailRef.current?.value as string);
    formData.append("collegeId", collegeRef.current?.value as string);
    formData.append("experience", experience);
    formData.append("dob", dateOfBirthRef.current?.value as string);
    formData.append(
      "educationDetails",
      educationDetailsRef.current?.value as string
    );
    formData.append(
      "areaOfInterest",
      areaOfInterestRef.current?.value as string
    );
    formData.append("futureGoal", futureGoalRef.current?.value as string);
    formData.append(
      "currentAddress",
      currentAddressRef.current?.value as string
    );

    setIsLoad(true);

    http
      .post(`${endpoint.CREATE_CANDIDATE}`, formData)
      .then((res) => {
        setIsLoad(false);
        toast.success("new candidate added.");
      })
      .catch((error) => {
        if (error?.response?.data?.message === "Email already exists") {
          toast.error("Email already exists");
        } else {
          toast.error(error?.response?.data?.message);
        }
        console.error(error?.response?.data?.message);
        setIsLoad(false);
        return false;
      });
  };

  const handleOnChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (phoneRef.current) {
        phoneRef.current.value = e.target.value;
      }
    } else {
      if (phoneRef.current) {
        phoneRef.current.value = "";
      }
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body ">
          <form className="registration-from" onSubmit={(e) => onSubmit(e)}>
            <div className="grid grid-cols-12 gap-4 mt-5">
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="floating-label">
                  <label htmlFor="firstName">
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    placeholder=" "
                    type="text"
                    className="form-control"
                    ref={firstNameRef}
                    required
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="floating-label">
                  <label htmlFor="middleName">
                    Middle Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="middleName"
                    placeholder=" "
                    type="text"
                    className="form-control"
                    ref={middleNameRef}
                    required
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="floating-label">
                  <label htmlFor="LastName">
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    placeholder=" "
                    type="text"
                    className="form-control"
                    ref={lastNameRef}
                    required
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <div className="floating-label">
                  <label htmlFor="dateOfBirth">
                    Date of Birth<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="dateOfBirth"
                    placeholder=" "
                    type="date"
                    className="form-control"
                    max={Number(
                      `${new Date().getFullYear() - 18}${
                        (new Date().getMonth() + 1).toString().padStart(2, "0")
                      }${new Date().getDate().toString().padStart(2, "0")}`
                    )
                    }
                    ref={dateOfBirthRef}
                    required
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-5">
                <div className="floating-label">
                  <label htmlFor="email">
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    placeholder=" "
                    type="email"
                    className="form-control"
                    ref={emailRef}
                    required
                    pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="floating-label">
                  <label htmlFor="phone">
                    Mobile Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    placeholder=" "
                    type="text"
                    className="form-control"
                    onChange={(e) => handleOnChangePhone(e)}
                    ref={phoneRef}
                    minLength={10}
                    maxLength={10}
                    required
                  />
                </div>
              </div>
              <div className="col-span-12">
                <div className="floating-label">
                  <label htmlFor="experience">
                    Experience<span className="text-red-500">*</span>
                  </label>
                  <br />
                  <select
                    name="experience"
                    id="experience"
                    className="form-select"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                  >
                    <option value="">Select Experience</option>
                    <option value="Trainee">Trainee</option>
                    <option value="1-2">1-2</option>
                    <option value="3-4">3-4</option>
                    <option value="5-6">5-6</option>
                    <option value="7-8">7-8</option>
                    <option value="9-10">9-10</option>
                    <option value="10+">10+</option>
                  </select>
                </div>
              </div>
              <div className="col-span-12">
                <div className="floating-label">
                  <label htmlFor="currentAddress">
                    Current Address<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="currentAddress"
                    placeholder=" "
                    className="form-control !h-[100px]"
                    ref={currentAddressRef}
                    required
                  ></textarea>
                </div>
              </div>

              {(experience === "Trainee" || experience === "1-2") && (
                <>
                  <div className="col-span-12">
                    <div className="floating-label">
                      <label htmlFor="collegeName">
                        College<span className="text-red-500">*</span>
                      </label>
                      <br />
                      <select
                        name="college"
                        id="college"
                        className="form-select"
                        ref={collegeRef}
                        required
                      >
                        <option value="">Select College</option>
                        {collegeOptions.map((obj, index) => (
                          <option key={index} value={obj?.value}>
                            {obj?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="floating-label">
                      <label htmlFor="educationDetails">
                        Education Details : Last Semester score/Grade
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="educationDetails"
                        placeholder=" "
                        className="form-control !h-[100px]"
                        ref={educationDetailsRef}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="floating-label">
                      <label htmlFor="areaOfInterest">
                        Area of Interest
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="areaOfInterest"
                        placeholder=" "
                        className="form-control !h-[100px]"
                        ref={areaOfInterestRef}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="floating-label">
                      <label htmlFor="futureGoal">
                        Future Goal<span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="futureGoal"
                        placeholder=" "
                        className="form-control !h-[100px]"
                        ref={futureGoalRef}
                        required
                      ></textarea>
                    </div>
                  </div>
                </>
              )}

              <div className="col-span-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoad}
                >
                  {!isLoad ? (
                    <>
                      <span className="btn-text">Submit</span>
                      <span className="btn-icon">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12L5.2125 11.1937L9.84375 6.5625H0V5.4375H9.84375L5.2125 0.80625L6 0L12 6L6 12Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="btn-icon"></span>
                      <span className="btn-text">Loading...</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCandidate;
