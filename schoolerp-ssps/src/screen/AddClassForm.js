import React, { useState, useEffect } from "react";
import "../Css/AddClassForm.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../appconfig";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function AddClassForm() {
  const [className, setClassName] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // Toast function
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  // Fetch class data from API on component mount
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    fetch(`${BASE_URL}api/class/getAll`, {
      method: "GET",
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        notifyError("An error occurred while fetching classes.");
      });
  };

  const handleEditClick = (classData) => {
    setEditingClass(classData);
    setClassName(classData.name);
    setSelectedSections(classData.sections);
    setIsEditing(true);
  };

  const handleDeleteClick = (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      fetch(`${BASE_URL}api/class/delete/${classId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Class deleted successfully:", data);
          notifySuccess("Class deleted successfully.");
          fetchClasses(); // Fetch updated class data
        })
        .catch((error) => {
          console.error("Error deleting class:", error);
          notifyError("An error occurred while deleting the class.");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!className || selectedSections.length === 0) {
      notifyError("Please fill in all fields.");
      return;
    }

    // Send data to server
    fetch(`${BASE_URL}api/class/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: className,
        sections: selectedSections,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data posted successfully:", data);
        notifySuccess("Class added successfully.");
        fetchClasses(); // Fetch updated class data
        resetForm();
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        notifyError("An error occurred while adding the class.");
      });
  };

  const handleUpdateClass = () => {
    fetch(`${BASE_URL}api/class/update/${editingClass._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: className,
        sections: selectedSections,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Class updated successfully:", data);
        notifySuccess("Class updated successfully.");
        fetchClasses(); // Fetch updated class data
        resetForm();
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating class:", error);
        notifyError("An error occurred while updating the class.");
      });
  };

  const handleCancelEdit = () => {
    setEditingClass(null);
    resetForm();
    setIsEditing(false);
  };

  const resetForm = () => {
    setClassName("");
    setSelectedSections([]);
  };

  const handleCheckboxChange = (e) => {
    const section = e.target.value;
    if (e.target.checked) {
      setSelectedSections([...selectedSections, section]);
    } else {
      setSelectedSections(selectedSections.filter((s) => s !== section));
    }
  };

  return (
    <div className="class">
      <div className="add-form">
        <h1>{isEditing ? "Edit Class" : "Add Class"}</h1>
        <form id="addClassForm" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="className">Class Name</label>
            <input
              type="text"
              id="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label>Select Sections</label>
            <div className="section-box">
              {["A", "B", "C", "D", "E", "F", "G"].map((section) => (
                <div key={section}>
                  <input
                    type="checkbox"
                    id={`section-${section}`}
                    value={section}
                    checked={selectedSections.includes(section)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`section-${section}`}>{section}</label>
                </div>
              ))}
            </div>
          </div>

          {isEditing ? (
            <div>
              <input style={{margin:"10px"}} type="button" className="btn" value="Update" onClick={handleUpdateClass} />
              <input style={{margin:"10px"}} type="button" className="btn" value="Cancel" onClick={handleCancelEdit} />
            </div>
          ) : (
            <input type="submit" className="btn" value="Add Class" />
          )}
        </form>
      </div>

      <div className="classes-table">
        <h2>Class List</h2>
        {classes.length > 0 ? (
          <Table>
            <Thead>
              <Tr>
                <Th>Class Name</Th>
                <Th>Sections</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {classes.map((classData) => (
                <Tr key={classData._id}>
                  <Td>{classData.name}</Td>
                  <Td>{classData.sections.join(", ")}</Td>
                  <Td>
                    
                    <button onClick={() => handleEditClick(classData)}>Edit</button>
                    <button onClick={() => handleDeleteClick(classData._id)}>Delete</button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <p>No classes available.</p>
        )}
      </div>
    </div>
  );
}
