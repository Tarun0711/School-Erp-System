
import "../App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "../components/Home";
import AddStudent from "./AddStudent";
import StudentDetails from "./student details/StudentDetails";
import StudentDeepDetails from "../components/screens/StudentDeepDetails";
import SectionItem from "./student details/SectionItem";
import FindStudent from "./FindStudent";
import AddClassForm from "./AddClassForm";
import GenerateIdCard from "./GenerateIdCard";
import AddFeeGroup from "./AddFeeGroup";
import { Outlet } from "react-router-dom";
import PaymentHistory from "./PaymentHistory";

function AdminDashboard() {
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <div className="app-body">
        <Navbar></Navbar>
        <>
          <Outlet></Outlet>
        </>
        <ToastContainer theme="dark" />
      </div>
    </div>
  )
}

export default AdminDashboard
