import React from "react";
import "../Css/Dashboard.css";
import { Link } from "react-router-dom";

export default function DashboardCard({ takeme, count, heading, subHeading ,backgroundColor, backgroundImage}) {
  return (
    <div className="dashcard"
    style={{
      backgroundColor: backgroundColor,
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      backgroundSize:"100px 100px"
    }}
  >
      <Link to={takeme}>
        <h2 style={{ fontSize: "55px" }}>{count ? count : "0"}</h2>
        <p style={{ fontSize: "20px" }}>{heading}</p>
        <p style={{ fontSize: "15px" }}>{subHeading}</p>
      </Link>
    </div>
  );
}
