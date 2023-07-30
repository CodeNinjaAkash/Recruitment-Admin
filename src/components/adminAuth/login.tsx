import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import http from "../../utils/http";
import endpoint from '../../constants/endPoint';
import InputField from "../../shared/table/commanFields/Input";
import { getToken, storeToken } from "../../Services/LocalStorageService";
import { user_token } from "../../redux/features/counter/CounterSlice";
import logo from "../../assets/images/atharva-brand-logo-dark.png";


const Login = () => {

  const navigate = useNavigate();
  const token = getToken();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/candidates");
    }
  }, [navigate, token]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      const response = {
        email: email,
        password: password,
      };
      http
        .post(`${endpoint.auth.LOGIN}`, response)
        .then((response) => {
          if (response.data.status !== "failed") {
            let token = response.data.token;
            storeToken(token);
            dispatch(user_token(getToken()));
            toast.success("Login Successfully");
            navigate("/candidates");
          } else {
          }
        })
        .catch((err) => {
          toast.error("Login Failed please try again");
          console.log(err);
        });
      e.preventDefault();
    },
    [dispatch, email, navigate, password]
  );

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="mx-auto w-full max-w-[450px]">
        <div className="text-center pb-6">
          <img className="mx-auto" src={logo} alt="Atharva System" />
        </div>

        <div className="card">
          <div className="card-header text-center">
            <h3 className="font-[600] text-[26px] text-black">Login</h3>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e)} className="mt-6">
              <InputField
                labelText={"Email"}
                inputType={"email"}
                inputName={"email"}
                inputValue={email}
                inputPlaceHolder={"Email"}
                onChange={setemail}
                id={"email"}
                Asterisk={<span className="text-red-500">*</span>}
                required
                autocomplete={"current-password"}
              />

              <InputField
                labelText={"Password"}
                inputType={"password"}
                inputName={"password"}
                inputValue={password}
                inputPlaceHolder={"Password"}
                onChange={setPassword}
                id={"Password"}
                Asterisk={<span className="text-red-500">*</span>}
                required
                autocomplete={"current-password"}
              />

              <div className="mt-6">
                <button className="w-full btn btn-primary">Login</button>
              </div>
            </form>
            {/* <p className="m-0 text-center pt-6">
            <Link
                to={"/forget-password"}
                className="text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </Link>
          </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
