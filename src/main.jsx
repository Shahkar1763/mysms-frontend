import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdmissionForm from "./components/AdmissionForm.jsx";
import HomeInfo from "./components/HomeInfo.jsx";
import StudentRecord from "./components/StudentRecord.jsx";
import StudentList from "./components/StudentList.jsx";
import LeaveCertificate from "./components/LeaveCertificate.jsx";
import CreateCertificate from "./components/CreateCertificate.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import DailyAttandence from "./components/DailyAttandence.jsx";
import GenerateFeeBill from "./components/GenerateFeeBill.jsx";
import FeeBill from "./components/FeeBill.jsx";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import Register from "./components/Register.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<App />}>
              <Route
                path="/"
                element={
                  <>
                    <HomeInfo /> <StudentRecord />{" "}
                  </>
                }
              ></Route>
              <Route path="/admissionform" element={<AdmissionForm />}></Route>
              <Route path="/StudentList" element={<StudentList />}></Route>
              <Route path="/slc" element={<LeaveCertificate />}></Route>
              <Route
                path="/createCertificate"
                element={<CreateCertificate />}
              ></Route>
              <Route
                path="/dailyAttandence"
                element={<DailyAttandence />}
              ></Route>
              <Route path="/feeBill" element={<GenerateFeeBill />}></Route>
              <Route path="/feeBill/create" element={<FeeBill />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
