import React, { useState, useCallback, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import http from "../../utils/http";
import endpoint from '../../constants/endPoint';


const ChangePassword = () => {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setConfirm_password] = useState("");

  const confirmReset = (e: React.FormEvent) => {
    e.preventDefault();

    confirmAlert({
      title: "Are you sure you want to change your password?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleSubmit(e);
          },
        },
        {
          label: "No",
          onClick: () => false,
        },
      ],
    });

  };

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      http
        .post(`${endpoint.auth.CHANGE_PASSWORD}`, {
          password: password,
          passwordConfirmation: passwordConfirmation,
        })
        .then((res) => {
          if (res.data.status !== "failed") {
            toast.success("Password change Success!");
            navigate("/candidates");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      e.preventDefault();
    },

    [navigate, password, passwordConfirmation]
  );

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="font-[600] text-[26px] text-black">Change Password</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <form onSubmit={(e) => confirmReset(e)}>
                <div className="mb-2">
                  <label htmlFor="Password" className="form-label">
                    Enter New Password<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="Password"
                    placeholder="Enter New Password"
                    className="form-control"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="Confirm Password" className="form-label">
                    Confirm Password<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    onChange={(e) => {
                      setConfirm_password(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="mt-6">
                  <button className="w-full btn btn-primary">
                    password reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
