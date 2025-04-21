import React, { useState } from "react";
import "../Css/Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaBars } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";

import {
  MdClass,
  MdFindInPage,
  MdSystemSecurityUpdateGood,
} from "react-icons/md";

import { FaRegIdCard } from "react-icons/fa";
import { MdOutlineDynamicFeed } from "react-icons/md";
import { SiBuzzfeed } from "react-icons/si";

export default function Sidebar() {
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
      path:"/admin/createExam",
      name:"Add Exam",
      icon:<IoNewspaperOutline />
    },
    {
      path: "/admin/admitCard",
      name: "Admit Card",
      icon: <MdSystemSecurityUpdateGood />,
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
  const [isOpen, setIsOpen] = useState(true);

  const [selectedPath, setSelectedPath] = useState("");
  const location = useLocation();

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="sidebar-wrapper-container">
      <div
        className="sidebar-wrapper"
        style={{ minWidth: isOpen ? "250px" : "75px" }}
      >
        <div className="sidebar">
          <div className="top-section">
            <p style={{ display: isOpen ? "block" : "none" }}>SSPS</p>

            {isOpen ? (
              <FaAngleDoubleLeft
                className="arrow"
                style={{ cursor: "pointer" }}
                onClick={toggle}
              />
            ) : (
              <FaAngleDoubleRight
                className="arrow"
                style={{ cursor: "pointer" }}
                onClick={toggle}
              />
            )}
          </div>
          <div className="sidebar-menu">
            {menuItem.map((item) => {
              const isSelected = location.pathname === item.path;
              const itemStyle = {
                backgroundColor: isSelected ? "#ffffff" : "inherit",
                color: isSelected ? "black" : "inherit",
                border: isSelected ? "1px solid #435569" : "inherit",
              };

              return (
                <Link to={item.path} key={item.path}>
                  <div
                    className="option"
                    style={itemStyle}
                    onClick={() => setSelectedPath(item.path)}
                  >
                    <span
                      style={{
                        marginLeft: isOpen ? "15px" : "5px",
                        marginTop: isOpen ? "0px" : "5px",
                      }}
                      className="icons"
                    >
                      {item.icon}
                    </span>
                    <span
                      style={{
                        display: isOpen ? "block" : "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="sidebar" style={{ minWidth: isOpen ? "250px" : "50px" }}>
  //     <div className="top-section">
  //       <p style={{ display: isOpen ? " " : "none" }}>SSPS</p>

  //       {isOpen ? (
  //         <FaAngleDoubleLeft
  //           className="arrow"
  //           style={{ cursor: "pointer" }}
  //           onClick={toggle}
  //         />
  //       ) : (
  //         <FaAngleDoubleRight
  //           className="arrow"
  //           style={{ cursor: "pointer" }}
  //           onClick={toggle}
  //         />
  //       )}
  //     </div>
  //     <div className="sidebar-menu">
  //       {menuItem.map((item) => {
  //         return (
  //           <Link to={item.path} key={item.path}>
  //             <div className="option">
  //               {" "}
  //               <span className="icons">{item.icon}</span>{" "}
  //               <span style={{ display: isOpen ? " " : "none", whiteSpace: "nowrap" }}>
  //                 {item.name}
  //               </span>
  //             </div>
  //           </Link>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
}
