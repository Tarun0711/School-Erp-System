import React from 'react'
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../appconfig.js";
function GeneratedAdmitCard() {
    const [students, setStudents] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedStudentsString = searchParams.get("selectedStudents");

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

  return (
    <div className=''>


    </div>
  )
}

export default GeneratedAdmitCard