import React, { useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../../utils/http";
import endpoint from '../../constants/endPoint';
import { storeToken } from "../../Services/LocalStorageService";
import InputField from "../../shared/Input";


const ResetPassword = () => {

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setConfirm_password] = useState("");
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const response = {
        password: password,
        passwordConfirmation: passwordConfirmation,
      };
      http
        .post(`${endpoint.auth.RESET_PASSWORD}`.replace(':id', `${id}`).replace('token', `${token}`), response)
        .then((res) => {
          if (res.data.status) {
            storeToken(`${token}`);
            alert("reset password successfully");
            navigate("/candidates");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      e.preventDefault();
    },
    [id, navigate, password, passwordConfirmation, token]
  );

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="mx-auto w-full max-w-[450px]">
          <div className="card">
            <div className="card-header text-center">
              <h3 className="font-[600] text-[26px] text-black">
                Reset Password
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => handleSubmit(e)}>
                <InputField
                  labelText={"Password"}
                  inputType={"Password"}
                  inputName={"Password"}
                  inputValue={password}
                  inputPlaceHolder={"Password"}
                  onChange={setPassword}
                  id={"Password"}
                />

                <InputField
                  labelText={"Confirm Password"}
                  inputType={"Password"}
                  inputName={"confirm_password"}
                  inputValue={passwordConfirmation}
                  inputPlaceHolder={"confirm_password"}
                  onChange={setConfirm_password}
                  id={"confirm_password"}
                />

                <div className="mt-6">
                  <button className="w-full btn btn-primary">RESET</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
