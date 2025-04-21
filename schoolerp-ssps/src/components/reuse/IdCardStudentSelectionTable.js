import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const IdCardStudentSelectionTable = ({ students }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleGenerateIdCard = () => {
    // Logic to generate ID card for selected students
    console.log("Generating ID cards for selected students:", selectedStudents);
    // Here you can send the selected students' IDs to your backend for ID card generation

    // history.push({
    //     pathname: "/admin/generateId/generatedIdCards",
    //     state: { selectedStudents: selectedStudents }
    //   });

    // Build query string for selected student IDs
    const queryString = `?selectedStudents=${selectedStudents.join(",")}`;
    // Navigate to the next page with selected student IDs as query parameters
    // window.location.href = `/admin/generateId/generatedIdCards${queryString}`;
    const destination = `/admin/generatedIdCards${queryString}`;

    return (
        <Link to={destination}>
          <button className="generate-btn">Generate ID Card</button>
        </Link>
      );
  };

  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>Name</Th>
            <Th>ADM NO</Th>
            <Th>Roll No.</Th>
        
            <Th>Class</Th>
            <Th>Section</Th>
            <Th>F Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student, index) => (
            <Tr key={index}>
              <Td>
                <input
                  type="checkbox"
                  value={student._id}
                  checked={selectedStudents.includes(student._id)}
                  onChange={() => handleSelectStudent(student._id)}
                />
              </Td>
              <Td>
                <Link
                  to={`/admin/studentProfile/${student._id}`}
                  key={student._id}
                  className="link-items"
                >
                  {student.first_Name} {student.last_Name}
                </Link>
              </Td>
              <Td>{student.admission_Number}</Td>
              <Td>{student.roll_Number}</Td>
              
              <Td>{student.class_Id.name}</Td>
              <Td>{student.section}</Td>
              <Td>{student.father_Name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* <button className="generate-btn" onClick={handleGenerateIdCard}>Generate ID Card</button> */}
      {handleGenerateIdCard()}
    </div>
  );
};

export default IdCardStudentSelectionTable;
// export default withRouter(IdCardStudentSelectionTable);
