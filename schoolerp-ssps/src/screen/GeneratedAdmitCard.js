import React, { useEffect, useState } from "react";
import AdmitCardTemplate from '../components/AdmitCardTemplate'
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../appconfig.js";
import '../Css/generatedAdmitcard.css'
function GeneratedAdmitCard() {
    const [students, setStudents] = useState();
    const [sittingPlan,setSittingPlan]=useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedStudentsString = searchParams.get("selectedStudents");
  const selectedSittingPlan=searchParams.get("selectedSettingPlan")
  console.log(sittingPlan,"exam data")
  // Convert selectedStudentsString into an array of IDs
  const selectedStudents = selectedStudentsString
    ? selectedStudentsString.split(",")
    : [];


    const fetchSittingplan=async()=>{
        const response = await fetch(`${BASE_URL}api/sitting/sittingPlans/${selectedSittingPlan}`)
            const data = await response.json();
            setSittingPlan(data);  
    }
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
    fetchSittingplan();
  }, []);



  const handlePrint = () => {
    window.print();
  };
  return (
    <div style={{display:"flex" ,flexDirection:"column", overflowY:"scroll",gap:"10px"}} className=''>
              <button onClick={handlePrint} style={{width:"fit-content",marginLeft:"40%"}}>Print Admit Card</button>

        {
           students &&  students.map((student)=>(
            <AdmitCardTemplate key={student._id} admitCardDetails={sittingPlan} student={students}/>
           ))
        }

    </div>
  )
}

export default GeneratedAdmitCard