import React, { useEffect, useState } from "react";
import "../Css/GeneratedIdCards.css"; // Import the CSS file for styling
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../appconfig.js";

const GeneratedIdCards = () => {
  const [students, setStudents] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedStudentsString = searchParams.get("selectedStudents");

  // Convert selectedStudentsString into an array of IDs
  const selectedStudents = selectedStudentsString
    ? selectedStudentsString.split(",")
    : [];

  useEffect(() => {
    const fetchStudentProfiles = async () => {
      try {
        const studentProfiles = [];

        for (const studentId of selectedStudents) {
          const response = await fetch(
            `${BASE_URL}api/student/getStudent/${studentId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            studentProfiles.push(data); // Push student profile data into the array
            console.log(data); // Log student profile data
          } else {
            console.error("Error fetching student profile:", response.status);
          }
        }

        setStudents(studentProfiles);
        console.log(studentProfiles);
        return studentProfiles;
      } catch (error) {
        console.error("Error fetching student profiles:", error);
        return [];
      }
    };

    fetchStudentProfiles();
  }, []);

  const handlePrint = () => {
    // window.print();
  };

  return (
    <div className="generated-id-cards">
        {/* Print button */}
      <div className="print-button">
        <button onClick={handlePrint}>Print All ID Cards</button>
      </div>
      
      {/* Render ID cards for each selected student */}
      {students
        ? students.map((student, index) => (
            // <div className="id-card" key={index}>
            //   <div className="school-info">
            //     <img
            //       src="https://res.cloudinary.com/dttmlghjm/image/upload/v1714852409/logo-removebg-preview_as5e3l.png"
            //       alt="School Logo"
            //       className="school-logo"
            //     />
            //     <div className="school-details">
            //       <h1 className="school-name">
            //         Satya Sai Public School, Jakhar
            //       </h1>
            //       <div className="school-address">
            //         <p>Jakhar, Samastipur, Bihar, India - 848216</p>
            //         <p>शिक्षा है अनमोल रतन</p>
            //       </div>
            //     </div>
            //     <img
            //       src="https://res.cloudinary.com/dttmlghjm/image/upload/v1715728995/ssps_scurhe.png"
            //       alt="School QR"
            //       className="school-logo"
            //     />
            //   </div>

            //   <hr className="divider" />

            //   <img
            //     src={student.student_Photo}
            //     alt="Student Photo"
            //     className="student-photo"
            //   />
            //   <div className="student-details">
            //     {/* <h3>Student Details</h3> */}
            //     <table>
            //       <tbody>
            //         <tr>
            //           <td>
            //             <strong>Name:</strong>
            //           </td>
            //           <td>
            //             {student.first_Name} {student.last_Name}
            //           </td>
            //         </tr>
            //         <tr>
            //           <td>
            //             <strong>Father's Name:</strong>
            //           </td>
            //           <td>{student.admission_Number}</td>
            //         </tr>
            //         <tr>
            //           <td>
            //             <strong>Roll Number:</strong>
            //           </td>
            //           <td>{student.roll_Number}</td>
            //         </tr>
            //       </tbody>
            //     </table>
            //   </div>

            //   <div className="additional-details">
            //     {/* <h3>Additional Details</h3> */}
            //     <table>
            //       <tbody>
            //         <tr>
            //           <td>
            //             <strong>Class:</strong>
            //           </td>
            //           <td>{student.class_Id.name}</td>
            //         </tr>
            //         <tr>
            //           <td>
            //             <strong>Section:</strong>
            //           </td>
            //           <td>{student.section}</td>
            //         </tr>
            //       </tbody>
            //     </table>
            //   </div>

            //   <div className="sign-section">
            //     <p>Parent Signature</p>
            //     <p>Admission Incharge Signature</p>
            //   </div>
            // </div>

            <div className="id-card" key={index}>
              <div className="card-header">
                <img
                  src="https://res.cloudinary.com/dttmlghjm/image/upload/v1714852409/logo-removebg-preview_as5e3l.png"
                  alt="School Logo"
                  className="school-logo"
                />
                <div className="school-details">
                  <h2 className="school-name">
                    Satya Sai Public School
                  </h2>
                  <p className="school-address">
                    Jakhar, Samastipur, Bihar, India - 848216
                  </p>
                  <p className="school-motto">शिक्षा है अनमोल रतन</p>
                </div>
                <img
                  src="https://res.cloudinary.com/dttmlghjm/image/upload/v1715728995/ssps_scurhe.png"
                  alt="School QR"
                  className="school-qr"
                />
              </div>

              <div className="card-body">
                <img
                  src={student.student_Photo}
                  alt="Student Photo"
                  className="student-photo"
                />
                <div className="student-details-id">
                  <h4 className="student-name">
                    Name: {student.first_Name} {student.last_Name}
                  </h4>
                  <p className="student-info">
                    <strong>Father's Name:</strong> {student.admission_Number}
                  </p>
                  <p className="student-info">
                    <strong>Roll Number:</strong> {student.roll_Number}
                  </p>
                  <p className="student-info">
                    <strong>Class:</strong> {student.class_Id.name}
                  </p>
                  <p className="student-info">
                    <strong>Section:</strong> {student.section}
                  </p>
                  <p className="student-info">
                    <strong>Address:</strong> {student.permanent_Address}
                  </p>
                </div>
              </div>

              {/* <div className="card-footer">
    <div className="signature-section">
      <img className="signature" src="https://logomakerr.ai/uploads/output/2024/01/25/851796214d8115e381d44038dbea19b4.jpg"></img>
    </div>
  </div> */}

              <div className="card-footer">
                <div className="signature-section">
                  <div>
                    <img
                      className="signature"
                      src="https://logomakerr.ai/uploads/output/2024/01/25/851796214d8115e381d44038dbea19b4.jpg"
                    ></img>
                    <p className="signature-label">Director Signature</p>
                  </div>
                  <div>
                    <img
                      className="signature"
                      src="https://logomakerr.ai/uploads/output/2024/01/25/851796214d8115e381d44038dbea19b4.jpg"
                    ></img>
                    <p className="signature-label">Principal Signature</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}

      
    </div>
  );
};

export default GeneratedIdCards;
