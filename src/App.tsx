import React, {Suspense} from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/comman/header";
import AdminRoutes from "./Routes/routes";

import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./shared/css/common.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="body-bg">
        <div className="bg-full"></div>
        <div className="bg-ef bg-1"></div>
        <div className="bg-ef bg-2"></div>
        <div className="bg-ef bg-3"></div>
        <div className="bg-ef bg-4"></div>
      </div>

      <div className="app-root">
        <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <AdminRoutes />
            </Suspense>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
