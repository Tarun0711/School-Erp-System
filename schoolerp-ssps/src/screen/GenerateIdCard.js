import React, { useState, useEffect } from "react";
import IdCardStudentSelectionTable from "../components/reuse/IdCardStudentSelectionTable";
import "../Css/FindStudent.css";
import { BASE_URL } from "../appconfig";
import Sections from "../components/screens/SectionData";

function GenerateIdCard() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentClass, setStudentClass] = useState("");
  const [studentSection, setStudentSection] = useState("");
  const [searchQueryType, setSearchQueryType] = useState(""); // New state for selected query type
  const [searchQueryValue, setSearchQueryValue] = useState(""); // New state for search query value

  const findStudentWithClassAndSection = () => {
    fetch(
      `${BASE_URL}api/student/byClassOrSection/${studentClass}/${studentSection}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const searchStudentByQuery = () => {
    const url = `${BASE_URL}api/student/students/query?${searchQueryType}=${searchQueryValue}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
        console.log(result,"hii");
      })
      .catch((err) => console.log(err));
  };

  const fetchClasses = () => {
    fetch(`${BASE_URL}api/class/getAll`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        // Handle error
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Define possible search query options
  const searchQueryOptions = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "gender",
    "address",
    "email",
    "phoneNumber",
    "class",
    "section",
  ];

  return (
    <div className="findStudent">
      <h2>Generate ID Cards</h2>
      <div className="findStudentForm">
        <div className="form">
          <div className="form-control">
            <label htmlFor="name">Class</label>
            <select
              id="class"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              required
            >
              <option value="">Select Class</option>
              {classes &&
                classes.map((classData) => (
                  <option key={classData._id} value={classData._id}>
                    {classData.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="section">Section</label>
            <select
              id="section"
              value={studentSection}
              onChange={(e) => setStudentSection(e.target.value)}
              required
            >
              <option value="">Select Section</option>
              {Sections.map((option) => {
                return (
                  <option key={option.id} value={option.section}>
                    {option.section}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            className="btn"
            type="submit"
            onClick={() => {
              findStudentWithClassAndSection();
            }}
          >
            Search
          </button>
        </div>

        <div className="form">
          <div className="form-control">
            <label htmlFor="queryType">Select Search Query</label>
            <select
              id="queryType"
              value={searchQueryType}
              onChange={(e) => setSearchQueryType(e.target.value)}
              required
            >
              <option value="">Select Query</option>
              {searchQueryOptions.map((queryType) => (
                <option key={queryType} value={queryType}>
                  {queryType}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="search">Enter Search Value</label>
            <input
              type="text"
              id="search"
              value={searchQueryValue}
              onChange={(e) => setSearchQueryValue(e.target.value)}
            />
          </div>
          <button className="btn" onClick={searchStudentByQuery}>
            Search
          </button>
        </div>
      </div>

      <br />
      <br />
      {/* Render the IdCardStudentSelectionTable component with the retrieved students */}
      {students.length > 0 && (
        <div>
          <IdCardStudentSelectionTable students={students} />
        </div>
      )}
      <br />
      <br />
      <br />
    </div>
  );
}

export default GenerateIdCard;
