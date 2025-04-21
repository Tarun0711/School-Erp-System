import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../appconfig";
import "../../Css/Accordion.css";
import moment from "moment";

function AdmitCardAccordian({ sittingData, onSelect }) {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
};

  const handleCheckboxChange = (e,id) => {
    const isChecked = e.target.checked; 
    if (isChecked) {
      onSelect((prevSelected) => [...prevSelected, id]); // Add the new ID to the previous selected IDs
    } else {
      onSelect((prevSelected) => prevSelected.filter(sittingID => sittingID !== id)); // Remove the ID from the selected IDs
    }
  };
  return (
    <div>
      {sittingData && (
        <div key={sittingData._id}>
          <div className="accordion">
            <input
              type="checkbox"
              onChange={(e) => handleCheckboxChange(e, sittingData._id)}
            />
            <div onClick={() => setIsActive(!isActive)}>
              {sittingData.examName}
            </div>
          </div>
          {isActive && (
            <div
              className={`panel ${
                activeAccordion === sittingData._id ? "active" : ""
              }`}
            >
              <table>
                <thead>
                  <tr>
                    <th>Exam Dates</th>
                    {/* <th>Sittings Timings</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {sittingData.examDates.map((examDate) => (
                        <div key={examDate._id}>
                          {moment(examDate.date).format("D MMM YYYY")}
                        </div>
                      ))}
                    </td>
                    {/* <td> */}
                      {/* {sittingData.examDates.sittings.map((data)=>(
                        <div key={data.sittingTime}>{data.sittingTime}</div>
                      ))} */}
                    {/* </td> */}
                    
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdmitCardAccordian;
