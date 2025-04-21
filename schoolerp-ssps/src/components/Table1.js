import React, { useState, useEffect } from "react";
import "../App.css";
import EditStudents from "./reuse/EditStudents";
import Sections from "./screens/SectionData";
import Classes from "./screens/ClassData";
import "../Css/EditStudents.css";
import { toast } from "react-toastify";

export default function Table1({ students, find }) {
  // const [students, setStudents] = useState(student);
  const [editStud, setEditStud] = useState(false);

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  // input fields
  const [name, setName] = useState("");
  const [adm, setAdm] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [fname, setFname] = useState("");
  const [Mname, setMname] = useState("");
  const [fMob, setFMob] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [rollNo, setRollNo] = useState("");

  // function to edit student
  const updateStudent = (studid) => {
    fetch("http://localhost:5000/editStudent", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: studid,
        student_name: name,
        classname: className,
        father_name: fname,
        mother_name: Mname,
        section: section,
        addmission_no: adm,
        address: address,
        DOB: dob,
        father_mobile: fMob,
        rollNo: rollNo,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        notifyB("successfully updated");
        find();
      });
  };

  useEffect(() => {
    setEditStud(false);
    setRollNo(students.Roll_No);
    setName(students.First_Name);
    setAdm(students.Admission_No);
    setClassName(students.Class);
    setSection(students.Section);
    setDob(students.DOB);
    setMname(students.Mother_Name);
    setFMob(students.Father_Mobile);
    setFname(students.Father_Name);
    setAddress(students.Address);
  }, [students]);

  return (
    //****************  Table **********************
    <div
      className="table1"
      style={{ display: "flex", justifyContent: "center", padding: "20px" }}
    >
      <table style={{ margin: "0px" }} className={editStud ? "edit" : ""}>
        <tbody style={{ fontSize: "15px" }}>
          {/******************* roll ***************************/}
          <tr>
            <th>Roll No</th>
            <td>
              {editStud ? (
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => {
                    setRollNo(e.target.value);
                  }}
                />
              ) : (
                students.Roll_No
              )}
            </td>
            {/******************* ADM *******************/}
            <th>Admission No</th>
            <td>
              {editStud ? (
                <input
                  type="text"
                  value={adm}
                  onChange={(e) => {
                    setAdm(e.target.value);
                  }}
                />
              ) : (
                students.Admission_No
              )}
            </td>
          </tr>
          {/******************* Name *******************/}
          <tr>
            <th>Name</th>
            <td colSpan="3">
              {" "}
              {editStud ? (
                <input
                  style={{ width: "-webkit-fill-available" }}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              ) : (
                students.First_Name
              )}
            </td>
          </tr>
          <tr>
            {/******************* class *******************/}
            <th>Class</th>
            <td>
              {editStud ? (
                <select
                  id="class"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                >
                  <option value={className}>{className}</option>

                  {Classes.map((option) => {
                    return (
                      <option key={option.id} value={option.classname}>
                        {option.classname}
                      </option>
                    );
                  })}
                </select>
              ) : (
                students.Class
              )}
            </td>
            {/******************* section *******************/}
            <th>Section</th>
            <td>
              {editStud ? (
                <select
                  id="section"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  required
                >
                  <option value={section}>{section}</option>
                  {Sections.map((option) => {
                    return (
                      <option key={option.id} value={option.section}>
                        {option.section}
                      </option>
                    );
                  })}
                </select>
              ) : (
                students.Section
              )}
            </td>
          </tr>
          <tr>
            {/******************* Fathers name *******************/}
            <th>Father Name</th>
            <td>
              {" "}
              {editStud ? (
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                />
              ) : (
                students.Father_Name
              )}
            </td>
            {/******************* Mothers name *******************/}
            <th>Mother Name</th>
            <td>
              {" "}
              {editStud ? (
                <input
                  type="text"
                  value={Mname}
                  onChange={(e) => {
                    setMname(e.target.value);
                  }}
                />
              ) : (
                students.Mother_Name
              )}
            </td>
          </tr>
          <tr>
            {/******************* DOB *******************/}
            <th>DOB</th>
            <td>
              {editStud ? (
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              ) : (
                students.DOB
              )}
            </td>
            {/******************* Father Mobile *******************/}
            <th>Father Mobile</th>
            <td>
              {editStud ? (
                <input
                  type="text"
                  value={fMob}
                  onChange={(e) => {
                    setFMob(e.target.value);
                  }}
                />
              ) : (
                students.Father_Mobile
              )}
            </td>
          </tr>
          <tr>
            {/******************* Address *******************/}
            <th>Address</th>
            <td colSpan="3">
              {" "}
              {editStud ? (
                <input
                  style={{ width: "-webkit-fill-available" }}
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              ) : (
                students.Address
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {editStud ? (
        <div className="buttons">
          {/******************* on edit *******************/}
          <button
            style={{ backgroundColor: "#14A44D" }}
            className="btn"
            onClick={() => {
              updateStudent(students._id);
            }}
          >
            Save
          </button>
          <button
            style={{ backgroundColor: "#DC4C64" }}
            className="btn"
            onClick={() => {
              setEditStud(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="buttons">
          {/******************* starting  *******************/}
          <button
            style={{ backgroundColor: "#14A44D" }}
            className="btn"
            onClick={() => {
              setEditStud(true);
            }}
          >
            Edit
          </button>
          <button
            style={{ backgroundColor: "#DC4C64" }}
            className="btn"
            // onClick={() => {
            //   setEditStud(true);
            // }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
