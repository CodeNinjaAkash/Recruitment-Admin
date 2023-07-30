import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../Services/LocalStorageService";
import Sidebar from "../components/comman/sidebar";
import Login from "../components/adminAuth/login";

import ForgotPassword from "../components/adminAuth/forgot";
import ChangePassword from "../components/adminAuth/change";
import ResetPassword from "../components/adminAuth/reset";

import CandidateList from "../components/candidates/list";
import AddCandidate from "../components/candidates/add";
import CandidateShow from "../components/candidates/show";
import CandidateResult from "../components/candidates/result";

import QuestionList from "../components/questions/list";
import QuestionDetail from "../components/questions/show";
import QuestionAdd from "../components/questions/add";

import CollegeList from "../components/colleges/list";
import CollegeShow from "../components/colleges/show";
import CollegeAdd from "../components/colleges/add";

const AdminRoutes = () => {

  const userToken = useSelector((state: {counter: { value: string}}) => state.counter.value);
  const token = userToken || getToken();

  return (
    <main className="app-wrapper">
      <Sidebar />
      <div className="app-main">
        <Routes>
          <Route
            path="/"
            element={!token ? <Login /> : <Navigate to="/candidates" />}
          />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route
            path="management/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/change-password"
            element={token ? <ChangePassword /> : <Navigate to="/" />}
          />
          <Route
            path="/candidates"
            element={token ? <CandidateList /> : <Navigate to="/" />}
          />
          <Route
            path="/candidates/add"
            element={token ? <AddCandidate /> : <Navigate to="/" />}
          />
          <Route
            path="/candidates/:id"
            element={token ? <CandidateShow /> : <Navigate to="/" />}
          />
          <Route
            path="/candidates/:id/result"
            element={token ? <CandidateResult /> : <Navigate to="/" />}
          />
          <Route
            path="/questions"
            element={token ? <QuestionList /> : <Navigate to="/" />}
          />
          <Route
            path="/questions/add"
            element={token ? <QuestionAdd /> : <Navigate to="/" />}
          />
          <Route
            path="/questions/:id"
            element={token ? <QuestionDetail /> : <Navigate to="/" />}
          />
          <Route
            path="/colleges"
            element={token ? <CollegeList /> : <Navigate to="/" />}
          />
          <Route
            path="/colleges/:id"
            element={token ? <CollegeShow /> : <Navigate to="/" />}
          />
          <Route
            path="/colleges/add"
            element={token ? <CollegeAdd /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </main>
  );
};

export default AdminRoutes;
