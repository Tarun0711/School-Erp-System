import React from "react";
import "../Css/AdmissionReceipt.css";

function AdmitCardTemplate({ admitCardDetails, student }) {
  return (
    <div style={{background:"white"}} className="admitCard-receipt">
      <div className="school-info">
        <img
          src="https://res.cloudinary.com/dttmlghjm/image/upload/v1714852409/logo-removebg-preview_as5e3l.png"
          alt="School Logo"
          className="school-logo-adm-res"
        />
        <div className="school-details">
          <h1 className="school-name-adm-res curved-text">
            Satya Sai Public School
          </h1>
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
      <div className="student-details">
        <h3>Student Details</h3>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Admission Number:</strong>
              </td>
              <td>{student.admission_Number}</td>
              <td rowSpan="7" className="student-photo-cell">
                {student.student_Photo && (
                  <img
                    src={student.student_Photo}
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
              <td>{/* {studentData.roll_Number} */}</td>
            </tr>
            <tr>
              <td>
                <strong>Name:</strong>
              </td>
              <td colSpan="2">
                {/* {student.first_Name} {student.last_Name} */}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Date of Birth:</strong>
              </td>
              <td>{/* {formattedDateOfBirth} */}</td>
            </tr>
            <tr>
              <td>
                <strong>Gender:</strong>
              </td>
              <td>{/* {studentData.gender} */}</td>
            </tr>
            <tr>
              <td>
                <strong>Contact Number:</strong>
              </td>
              <td>{/* {studentData.contact_Number} */}</td>
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
              <td>{/* {studentData.session} */}</td>
              <td>
                <strong>Class:</strong>
              </td>
              <td>{/* {className} */}</td>
              <td>
                <strong>Section:</strong>
              </td>
              <td>{/* {studentData.section} */}</td>
            </tr>
            {/* Add other academic details here */}
          </tbody>
        </table>
      </div>
      <h1>Admit Card</h1>
      {/*exam details*/}
      <div>
        <h3>{admitCardDetails.examName} Setting Plan</h3>
        <table>
          <thead>
            <tr>
              <th>Exam Date</th>
              {admitCardDetails?.examDates?.map((sitting, index) => (
                <th key={index}>
                  {"Sitting "}
                  {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          {admitCardDetails?.examDates?.map((date, index) => (
            <tbody>
              <tr key={index}>
                <td>{new Date(date.date).toLocaleDateString()}</td>
                {date.sittings.map((sitting, i) => (
                  <td key={i}>
                    {sitting.examTitle} ({sitting.classRange.from} to{" "}
                    {sitting.classRange.to})
                  </td>
                ))}
              </tr>
            </tbody>
          ))}
        </table>
        <div style={{display:"flex",width:"100%",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"column"}}>
            <strong style={{textAlign:"start"}}>Parents</strong>
            <p>....................................</p>
          </div>
          <div style={{display:"flex",flexDirection:"column"}}>
            <strong style={{textAlign:"start"}}>Principal</strong>
            <img
            style={{objectFit:"cover",height:"60px",width:"80px"}}
              className="signature"
              src="https://logomakerr.ai/uploads/output/2024/01/25/851796214d8115e381d44038dbea19b4.jpg"
             
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmitCardTemplate;
