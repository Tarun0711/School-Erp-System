import React, { useState ,useEffect} from "react";
import "../Css/AdmissionReceipt.css"; // Import the CSS file for styling
import { BASE_URL } from "../appconfig.js";

const AdmissionReceipt = ({ studentData }) => {
  const [className, setClassName] = useState("");
  const [formattedDateOfAdmission, setFormattedDateOfAdmission] = useState("");
  const [formattedDateOfBirth, setFormattedDateOfBirth] = useState("");

  useEffect(() => {
    const fetchClassName = async (class_Id) => {
      try {
        const response = await fetch(`${BASE_URL}api/class/get/${class_Id}`, {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        });
        const data = await response.json();
        setClassName(data.name);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchClassName(studentData.class_Id);

     // Format date of admission
     const dateOfAdmission = new Date(studentData.date_Of_Admission);
     const formattedDate = `${dateOfAdmission.getDate()}-${dateOfAdmission.getMonth() + 1}-${dateOfAdmission.getFullYear()}`;
     setFormattedDateOfAdmission(formattedDate);
     
     // Format date of birth
     const dateOfBirth = new Date(studentData.date_Of_Birth);
     const formattedDateOfBirth = `${dateOfBirth.getDate()}-${dateOfBirth.getMonth() + 1}-${dateOfBirth.getFullYear()}`;
     setFormattedDateOfBirth(formattedDateOfBirth);





  //    window.onload = function () {
  //     let canvas = document.getElementById("school-name-canvas");
  //     let context = canvas.getContext("2d");
  
  //     let schoolName = "Satya Sai Public School, Jakhar";
  //     let fontSize = 30;
  //     let angle = Math.PI * 0.1; // Adjust the angle for the curve
  //     let radius = 200;
  //     let centerX = canvas.width / 2;
  //     let centerY = canvas.height / 2;
  
  //     context.font = `${fontSize}px serif`;
  //     context.fillStyle = "green";
  //     context.textAlign = "center";
  
  //     context.translate(centerX, centerY);
  //     context.rotate(-1 * angle / 2);
  
  //     for (let i = 0; i < schoolName.length; i++) {
  //         context.rotate(angle / schoolName.length);
  //         context.save();
  //         context.translate(0, -1 * radius);
  //         context.fillText(schoolName[i], 0, 0);
  //         context.restore();
  //     }
  // };



  }, [studentData.class_Id, studentData.date_Of_Admission, studentData.date_Of_Birth]);
  return (
    <div className="admission-receipt">
      {/* School Name and Logo */}
      <div className="school-info">
        <img
          src="https://res.cloudinary.com/dttmlghjm/image/upload/v1714852409/logo-removebg-preview_as5e3l.png"
          alt="School Logo"
          className="school-logo-adm-res"
        />
        <div className="school-details">
          <h1 className="school-name-adm-res curved-text">Satya Sai Public School</h1>
          {/* <canvas id="school-name-canvas" width="600" height="200"></canvas> */}
          

          <div className="school-address">
            <p>Jakhar, Samastipur, Bihar, India - 848216</p>
            <p>शिक्षा है अनमोल रतन</p>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/dttmlghjm/image/upload/v1715728995/ssps_scurhe.png"
          alt="School QR"
          className="school-logo-adm-res"
        />
      </div>

      {/* Horizontal line */}
      <hr className="divider" />

      {/* Student Details */}
      <div className="student-details">
        <h3>Student Details</h3>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Admission Number:</strong>
              </td>
              <td>{studentData.admission_Number}</td>
              <td rowSpan="7" className="student-photo-cell">
                {studentData.student_Photo && (
                  <img
                    src={studentData.student_Photo}
                    alt="Student"
                    className="student-photo-image"
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Roll Number:</strong>
              </td>
              <td>{studentData.roll_Number}</td>
            </tr>
            <tr>
              <td>
                <strong>Name:</strong>
              </td>
              <td colSpan="2">
                {studentData.first_Name} {studentData.last_Name}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Date of Birth:</strong>
              </td>
              <td>{formattedDateOfBirth}</td>
            </tr>
            <tr>
              <td>
                <strong>Gender:</strong>
              </td>
              <td>{studentData.gender}</td>
            </tr>
            <tr>
              <td>
                <strong>Contact Number:</strong>
              </td>
              <td>{studentData.contact_Number}</td>
            </tr>
            {/* Add other student details here */}
          </tbody>
        </table>
      </div>

      {/* Academic Details */}
      <div className="academic-details">
        <h3>Academic Details</h3>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Session:</strong>
              </td>
              <td>{studentData.session}</td>
              <td>
                <strong>Class:</strong>
              </td>
              <td>{className}</td>
              <td>
                <strong>Section:</strong>
              </td>
              <td>{studentData.section}</td>
            </tr>
            {/* Add other academic details here */}
          </tbody>
        </table>
      </div>

      {/* Additional Details */}
      <div className="additional-details">
        <h3>Additional Details</h3>
        <table>
          <tbody className="info-table">
            <tr>
              <td>
                <strong>Permanent Address:</strong>
              </td>
              <td className="address-cell">{studentData.permanent_Address}</td>
            </tr>
            {/* <tr>
              <td>
                <strong>Address for Correspondence:</strong>
              </td>
              <td className="address-cell">{studentData.address_For_Correspondence}</td>
            </tr> */}
            <tr>
              <td>
                <strong>Alternate Contact Number:</strong>
              </td>
              <td>{studentData.alternet_Contact_Number}</td>
            </tr>
            <tr>
              <td>
                <strong>Email:</strong>
              </td>
              <td>{studentData.email}</td>
            </tr>
            <tr>
              <td>
                <strong>Nationality:</strong>
              </td>
              <td>{studentData.nationality}</td>
            </tr>
            <tr>
              <td>
                <strong>Religion:</strong>
              </td>
              <td>{studentData.religion}</td>
            </tr>
            <tr>
              <td>
                <strong>Category:</strong>
              </td>
              <td>{studentData.category}</td>
            </tr>
            <tr>
              <td>
                <strong>Date of Admission:</strong>
              </td>
              {/* <td>{dateParts[2]}/${dateParts[1]}/${dateParts[0]}</td> */}
              <td>{formattedDateOfAdmission}</td>
            </tr>
            <tr>
              <td>
                <strong>Blood Group:</strong>
              </td>
              <td>{studentData.blood_Group}</td>
            </tr>
            <tr>
              <td>
                <strong>Father's Name:</strong>
              </td>
              <td>{studentData.father_Name}</td>
            </tr>
            {/* <tr>
              <td>
                <strong>Father's Occupation:</strong>
              </td>
              <td>{studentData.father_Occupation}</td>
            </tr> */}
            <tr>
              <td>
                <strong>Mother's Name:</strong>
              </td>
              <td>{studentData.mother_Name}</td>
            </tr>
            {/* <tr>
              <td>
                <strong>Mother's Occupation:</strong>
              </td>
              <td>{studentData.mother_Occupation}</td>
            </tr> */}
            <tr>
              <td>
                <strong>Aadhar Number:</strong>
              </td>
              <td>{studentData.aadhar_number}</td>
            </tr>
            <tr>
              <td>
                <strong>Due Amount:</strong>
              </td>
              <td>{studentData.due_amount}</td>
            </tr>
            {/* Add other additional details here */}
          </tbody>
        </table>
      </div>

      <div className="sign-section">
        <p>Parent Signature</p>
        
        <p>Admission Incharge Signature</p>
      </div>
    </div>
  );
};

export default AdmissionReceipt;
