import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLogin from "./components/Admin/AdminLogin";
import { useCookies } from "react-cookie";
import "react-datepicker/dist/react-datepicker.css";

import AddStudent from "./components/Admin/AddStudent";
import Students from "./components/Admin/Students";
import AdminNav from "./components/Admin/AdminNav";
// import EditStudent from "./components/Student/EditStudent";
import Login from "./components/Student/Login";

import Reset from "./components/Student/Reset";
import NewPassword from "./components/Student/NewPassword";
import StudentNav from "./components/Student/StudentNav";
import AddAdmin from "./components/Admin/AddAdmin";
import Admins from "./components/Admin/Admins";
import EditPage from "./components/Admin/EditPage";
import Subjects from "./components/Admin/Subjects";
import ExamSchedule from "./components/Admin/ExamSchedule";
import AddExamSchedule from "./components/Admin/AddExamSchedule";
import AddExam from "./components/Admin/AddExamForm";
import StudentExam from "./components/Student/StudentExamSchedule";
import AddResult from "./components/Admin/AddResult";
import AddResultForm from "./components/Admin/AddResultForm";
import Result from "./components/Admin/Result";
import StudentResult from "./components/Student/StudentResult";
import ResultNav from "./components/Student/ResultNav";
import Home from "./components/Student/Home";
import AdminReset from "./components/Admin/AdminReset";
import AdminNewPassword from "./components/Admin/AdminNewPassword";

import { useState } from "react";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Contact from "./components/Student/Contact";
import Info from "./components/Student/Info";
function App() {

  return (
    <Router basename="/">
      <div className="App">

        <Switch>
          <Route path="/" exact>
            <>
              <Login />
            </>
          </Route>
    
          <Route path="/contact" exact>
            <>
              <StudentNav />
              <Contact />
            </>
          </Route>

          <Route path="/info" exact>
            <>
              <StudentNav />
              <Info />
            </>
          </Route>
          <Route path="/home" exact>
            <>
              <StudentNav />
              <Home />
            </>
          </Route>
          <Route path="/admin/dashboard" exact>
            <>
              <AdminNav />
              <AdminDashboard />
            </>
          </Route>
          <Route path="/admin" exact>
            <AdminLogin />
          </Route>
          <Route path="/admin/add/exam/schedule/:department/:sem" exact>
            <>
              <AdminNav />
              <AddExam />
              {/* <AddExamSchedule /> */}
            </>{" "}
          </Route>
          <Route path="/admin/add/exam" exact>
            <>
              <AdminNav />

              <AddExamSchedule />
            </>{" "}
          </Route>
          <Route path="/admin/add" exact>
            <>
              <AdminNav />
              <AddAdmin />
            </>
          </Route>
          <Route path="/admin/view/subjects" exact>
            <>
              <AdminNav />
              <Subjects />
            </>
          </Route>
          <Route path="/admin/view/exam/schedule" exact>
            <>
              <AdminNav />
              <ExamSchedule />
            </>
          </Route>
          <Route path="/admin/view/exam/schedule/:year" exact>
            <>
              <AdminNav />
              <ExamSchedule />
            </>
          </Route>
          <Route path="/view/schedule/:sem" exact>
            <>
              <StudentNav />
              <StudentExam />
            </>
          </Route>
          <Route path="/admin/add/student" exact>
            <>
              <AdminNav />
              <AddStudent />
            </>
          </Route>{" "}
          <Route path="/admin/view/students" exact>
            <>
              <AdminNav /> <Students />
            </>
          </Route>
          <Route path="/admin/view/admin" exact>
            <>
              <AdminNav /> <Admins />
            </>
          </Route>
          <Route path="/admin/view/students/all/:dept" exact>
            <>
              <AdminNav /> <Students />
            </>
          </Route>
          <Route path="/admin/view/students/:year" exact>
            <>
              <AdminNav /> <Students />
            </>
          </Route>
          <Route path="/admin/add/result" exact>
            <>
              <AdminNav /> <AddResult />
            </>
          </Route>
          <Route path="/admin/view/result" exact>
            <>
              <AdminNav /> <Result />
            </>
          </Route>
          <Route path="/admin/add/result/:dept/:sem" exact>
            <>
              <AdminNav /> <AddResultForm />
            </>
          </Route>
          <Route path="/admin/edit/:id" exact>
            <>
              <AdminNav />
              <EditPage />
            </>
          </Route>
          <Route path="/forgot-password" exact>
            <Reset />
          </Route>
          <Route path="/admin/forgot-password" exact>
            <AdminReset />
          </Route>
          <Route path="/new-password/:token" exact>
            <NewPassword />
          </Route>
          <Route path="/admin/new-password/:token" exact>
            <AdminNewPassword />
          </Route>
          <Route path="/view/result/:enrollment" exact>
            <>
              <ResultNav />
              <StudentResult />
            </>
          </Route>
          <Route path="/result/:enrollment" exact>
            <>
              <StudentNav />
              <StudentResult />
            </>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
