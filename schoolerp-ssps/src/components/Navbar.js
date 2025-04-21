import React, { useState } from "react";
import "../Css/navbar.css";
import { CiMenuFries } from "react-icons/ci";
import Sidebar from "./Sidebar";
import { RiDashboardFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdClass, MdFindInPage } from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa";
import { MdOutlineDynamicFeed } from "react-icons/md";
import { SiBuzzfeed } from "react-icons/si";
import { Link } from "react-router-dom";

const menuItem = [
  {
    path: "/admin/home",
    name: "Dashboard",
    icon: <RiDashboardFill />,
  },
  {
    path: "/admin/addStudent",
    name: "Add Students",
    icon: <IoPersonAdd />,
  },
  {
    path: "/admin/feeStructure",
    name: "Fee Structure",
    icon: <BsFillPersonLinesFill />,
  },
  {
    path: "/admin/findStudent",
    name: "Find Student",
    icon: <MdFindInPage />,
  },
  {
    path: "/admin/addClass",
    name: "Class",
    icon: <MdClass />,
  },
  {
    path: "/admin/generateId",
    name: "ID Cards",
    icon: <FaRegIdCard />,
  },
  {
    path: "/admin/feeType",
    name: "Fees Type",
    icon: <MdOutlineDynamicFeed />,
  },
  {
    path: "/admin/paymentHistory",
    name: "Payment History",
    icon: <SiBuzzfeed />,
  },
];

export default function Navbar() {
  const [isopenSideBar,setisOpenSideBar]=useState(false)

  const handleClick=()=>{
    setisOpenSideBar(!isopenSideBar)
  }
  return (
    <nav className="navbar">
      
      {/* <input type="checkbox" id="check" />
     
      <label className="logo">Satya Sai Public School, Jakhar</label> */}
      <p className="title">Satya Sai Public School, Jakhar</p>
      <div className="menu">
        <CiMenuFries onClick={handleClick} />
      </div>
      <ul>
        <li>
          <a className="active" target="blank" href="https://sspsjakhar.in/">
            Site
          </a>
        </li>
      </ul>
      {isopenSideBar? (
              <div className="menu-bar">
              {menuItem.map((item,index)=>(   
                <div key={index} className="menu-item" onClick={()=>setisOpenSideBar(false)}>
                  <span className="menu-item-icon">
                    {item.icon}
                  </span>
                  <Link to={item.path}>{item.name}</Link>
                </div>
              ))}
              </div>


      ):(
        <></>
      )
      }
     
      
    </nav>
  );
}
