import React, { useState } from "react";
import InputField from "../../shared/Input";
import logo from "./../../assets/images/atharva-brand-logo-dark.png";
import http from "../../utils/http";
import endpoint from '../../constants/endPoint';


const ForgotPassword = () => {

  const [email, setemail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const response = {
      email: email,
    };
    http
      .post(`${endpoint.auth.PASSWORD_RESET_MAIL}`, response)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="mx-auto w-full max-w-[450px]">
          <div className="text-center pb-6">
            <img className="mx-auto" src={logo} alt="Atharva System" />
          </div>
          <div className="card">
            <div className="card-header text-center">
              <h3 className="font-[600] text-[26px] text-black">
                Forgot Password
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <InputField
                  labelText={"Email"}
                  inputType={"email"}
                  inputName={"email"}
                  inputValue={email}
                  inputPlaceHolder={"email"}
                  onChange={setemail}
                  id={"email"}
                />
                <div className="mt-6">
                  <button className="w-full btn btn-primary">Send</button>
                </div>
              </form>
              <p className="m-0 text-center pt-3">
                Back to{" "}
                <a className="text-blue-600 hover:text-blue-700" href="/">
                  Login?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
