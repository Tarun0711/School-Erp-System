import React from "react";

import Sections from "../../components/screens/SectionData";
import "../../Css/StudentDetails.css";
import { useParams, Link } from "react-router-dom";

export default function SectionItem() {
  const { classid } = useParams();

  return (
    <div className="section">
      <h1>Choose Section</h1>
      <div className="sections">
        {Sections.map((sectioninfo) => (
          <Link to={`/studentDeepDetails/${classid}/${sectioninfo.section}`}>
            <p className="section-list">{sectioninfo.section}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
