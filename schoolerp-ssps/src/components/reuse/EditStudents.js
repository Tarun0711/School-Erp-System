import React, { useState } from "react";
import "../../Css/EditStudents.css";

export default function EditStudents() {
  const [name, setName] = useState("");
  const [classname, setClassname] = useState("");
  const [section, setSection] = useState("");
  const [fname, setFname] = useState("");
  const [age, setAge] = useState("");
  const [adm, setAdm] = useState("");

  return (
    <div className="editStudents">
      <div className="addStudentForm centered">
        <h1 style={{ color: "white" }}>Register Student</h1>
        <div className="form">
          <div className="form-control">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="name">Class</label>
            <select
              id="class"
              value={classname}
              onChange={(e) => setClassname(e.target.value)}
              required
            >
              <option value="">Select Class</option>
              <option value="Nursery">Nursery</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
              <option value="Four">Four</option>
              <option value="Five">Five</option>
              <option value="Six">Six</option>
              <option value="Seven">Seven</option>
              <option value="Eight">Eight</option>
              <option value="Nine">Nine</option>
              <option value="Ten">Ten</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="name">Section</label>
            <select
              id="section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="name">Parent's Name</label>
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>
          {/* <div className='form-control'>
              <label htmlFor='name'>Joining Date</label>
              <input type='date' />
            </div>{' '} */}
          <div className="form-control">
            <label htmlFor="name">Admmision number</label>
            <input
              type="number"
              value={adm}
              onChange={(e) => setAdm(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="name">age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
        </div>
        <input
          className="btn-register"
          type="submit"
          value="Register"
          // onClick={() => {
          //   postData();
          // }}
        ></input>
      </div>
    </div>
  );
}
