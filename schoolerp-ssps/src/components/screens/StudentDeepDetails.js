import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function StudentDeepDetails() {
  const [data, setData] = useState([]);

  const { classid, sectionid } = useParams();

  useEffect(() => {
    // fetching all students
    if (classid == "all") {
      fetch("http://localhost:5000/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result);

        })
        .catch((err) => console.log(err));
    } else {
      fetch("http://localhost:5000/mystuds", {
        headers: {
          "Content-Type": "application/json",
          class: classid,
          section: sectionid,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result);

        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className="deepDetails">
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search student with name?"
          />
          <button type="submit" className="searchButton">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      <table cellSpacing="0">
        <thead>
          <tr>
            <th>SN</th>
            <th>Admission No</th>
            <th>Roll no.</th>
            <th>Student Name</th>
            <th>DOB</th>
            <th>Father Name</th>
            <th>Mother Name</th>
            <th>Address</th>
            <th>Father Mobile</th>
            <th>Admission Date</th>
            <th>Class</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, i) => (
            <tr key={i} className="contents">
              <td>{i + 1}</td>
              <td>{student.Admission_No}</td>
              <td>{student.Roll_No}</td>
              <td>{student.First_Name}</td>
              <td>{student.DOB}</td>
              <td>{student.Father_Name}</td>
              <td>{student.Mother_Name}</td>
              <td>{student.Address}</td>
              <td>{student.Father_Mobile}</td>
              <td>{student.Admission_Date}</td>
              <td>{student.Class}</td>
              <td>{student.Section}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
