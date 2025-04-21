import React, { useState } from "react";
import { BASE_URL } from "../../appconfig";
import { toast } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // Update this line
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const StudentTable = ({ students, refereshStudent }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const navigate = useNavigate(); // Update this line

  const handleDelete = (id) => {
    setStudentIdToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = () => {
    fetch(`${BASE_URL}api/student/deleteStudent/${studentIdToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Student deleted successfully') {
          console.log('Student deleted successfully');
          toast.success("Student deleted successfully");
          refereshStudent();
        } else {
          console.error('Error deleting student');
          // toast.error('Error while deleting student');
        }
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
        toast.error('Error while deleting student');
      });
    setShowDeleteAlert(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
  };

  const handleEdit = (student) => {
    // Navigate to the add student form and pass the student data as state
    navigate({ 
      pathname: '/admin/addStudent',
      state: { student }
    });
  };

  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th>ADM NO</Th>
            <Th>Roll No.</Th>
            <Th>Name</Th>
            <Th>Class</Th>
            <Th>Section</Th>
            <Th>Phone Number</Th>
            <Th>F Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student, index) => (
            <Tr key={index}>
              <Td>{student.admission_Number}</Td>
              <Td>{student.roll_Number}</Td>
              <Td>
                <Link
                  to={`/admin/studentProfile/${student._id}`}
                  key={student._id}
                  className="link-items"
                >
                  {student.first_Name} {student.last_Name}
                </Link>
              </Td>
              <Td>{student.class_Id.name}</Td>
              <Td>{student.section}</Td>
              <Td>{student.contact_Number}</Td>
              <Td>{student.father_Name}</Td>
              <Td style={{ textAlign: "center" }}>
                <MdDelete
                  style={{
                    background: "red",
                    borderRadius: "100%",
                    color: "white",
                    padding: "2px",
                    cursor: "pointer",
                    margin: "10px",
                  }}
                  fontSize={28}
                  onClick={() => handleDelete(student._id)}
                />
                <MdEdit
                  style={{
                    background: "green",
                    borderRadius: "100%",
                    color: "white",
                    padding: "2px",
                    cursor: "pointer",
                    margin: "10px",
                  }}
                  fontSize={28}
                  onClick={() => handleEdit(student)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {showDeleteAlert && (
        <div style={{position:"fixed",backdropFilter:"blur(5px)",height:"100vh",width:"100%",top:"0",display:"flex",alignItems:"center",justifyContent:"center"}} className="delete-alert">
          <div style={{background:"white",padding:"10px",borderRadius:"10px"}}>
            <h2>Are you sure you want to delete this student?</h2>
            <button style={{background:"red"}} onClick={handleDeleteConfirm}>Yes, delete</button>
            <button onClick={handleDeleteCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
