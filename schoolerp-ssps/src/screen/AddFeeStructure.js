import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../Css/AddClassForm.css";
import { BASE_URL } from "../appconfig";
import { MdDelete, MdEdit } from "react-icons/md";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const AddFeeStructure = () => {
  const [value, setValue] = useState("1");
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [feeGroups, setFeeGroups] = useState([
    { feeType: "", amount: "", dueDate: "" },
  ]);
  const [classList, setClassList] = useState([]);
  const [feesTypeList, setFeesTypeList] = useState([]);
  const [feeStructures, setFeeStructures] = useState([]); // Add this state to store fee structures
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [feeStructureIdToDelete, setFeeStructureIdToDelete] = useState(null);
  const [editMode, setEditMode] = useState(false); // New state to track edit mode
  const [editId, setEditId] = useState(null); // New state to store the ID of the fee structure being edited

  useEffect(() => {
    fetchClasses();
    fetchFeesType();
    fetchFeeStructures();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "1") {
      setName("");
      setSelectedClass("");
      setFeeGroups([{ feeType: "", amount: "", dueDate: "" }]);
      setEditMode(false);
      setEditId(null);
    }
  

  };

  const handleDelete = (id) => {
    setFeeStructureIdToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = () => {
    fetch(`${BASE_URL}api/fee/feestructure/delete/${feeStructureIdToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Fee structure deleted successfully') {
          console.log('Fee structure deleted successfully');
          toast.success("Fee structure deleted successfully");
          fetchFeeStructures();
        } else {
          console.error('Error deleting Fee Structure');
          toast.error('Error while deleting Fee Structure');
        }
      })
      .catch((error) => {
        console.error('Error deleting Fee Structure:', error);
      });
    setShowDeleteAlert(false);
  };

  const fetchFeeStructures = () => {
    fetch(`${BASE_URL}api/fee/feestructure/getAll`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeeStructures(data);
        console.log(feeStructures);
      })
      .catch((error) => {
        console.error("Error fetching fee structures:", error);
        notifyError("An error occurred while fetching fee structures.");
      });
  };

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const fetchClasses = () => {
    fetch(`${BASE_URL}api/class/getAll`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClassList(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        notifyError("An error occurred while fetching classes.");
      });
  };

  const fetchFeesType = () => {
    fetch(`${BASE_URL}api/fee/feetypes/getAll`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeesTypeList(data);
      })
      .catch((error) => {
        console.error("Error fetching fees types:", error);
        notifyError("An error occurred while fetching fees types.");
      });
  };

  const handleFeeGroupChange = (index, field, value) => {
    const updatedFeeGroups = [...feeGroups];
    updatedFeeGroups[index][field] = value;
    setFeeGroups(updatedFeeGroups);
  };

  const handleAddFeeGroup = () => {
    setFeeGroups([...feeGroups, { feeType: "", amount: "", dueDate: "" }]);
  };

  const handleDeleteFeeGroup = (index) => {
    const updatedFeeGroups = feeGroups.filter((_, i) => i !== index);
    setFeeGroups(updatedFeeGroups);
  };

  const handleEdit = (data) => {
    setName(data.name);
    setSelectedClass(data.class._id);
    setFeeGroups(data.feeGroups.map((group) => ({
      feeType: group.feeType,
      amount: group.amount,
      dueDate: group.dueDate.substring(0, 10), // Extract the date part from the ISO string
    })));
  
    setEditId(data._id);
    setEditMode(true);
    setValue("2");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !selectedClass ||
      feeGroups.some(
        (group) => !group.feeType || !group.amount || !group.dueDate
      )
    ) {
      notifyError(
        "Please fill in all fields for the fee structure and fee groups."
      );
      return;
    }

    const feeStructure = {
      name,
      class: selectedClass,
      feeGroups,
    };

    const url = editMode
      ? `${BASE_URL}api/fee/feestructure/update/${editId}`
      : `${BASE_URL}api/fee/feestructure/add`;
    const method = editMode ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feeStructure),
    })
      .then((res) => res.json())
      .then(() => {
        notifySuccess(
          editMode
            ? "Fee structure updated successfully."
            : "Fee structure created successfully."
        );
        setName("");
        setSelectedClass("");
        setFeeGroups([{ feeType: "", amount: "", dueDate: "" }]);
        setEditMode(false);
        setValue("1");
        fetchFeeStructures();
      })
      .catch((error) => {
        console.error("Error creating/updating fee structure:", error);
        notifyError(
          "An error occurred while creating/updating the fee structure."
        );
      });
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
  };

  return (
    <Box style={{ overflowY: "scroll" }} sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box style={{ background: "white" }} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab style={{ background: "white" }} label="Fee Structure" value="1" />
            <Tab style={{ background: "white" }} label="Create Fee Structure" value="2" />
          </TabList>
        </Box>
        <TabPanel value="2">
          <div className="add-form" style={{ width: "100%" }}>
            <h2>{editMode ? "Edit Fee Structure" : "Create Fee Structure"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <br />
              <div className="form-control">
                <label htmlFor="class">Class:</label>
                <select
                  id="class"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  required
                >
                  <option value="">Select Class</option>
                  {classList.map((classItem) => (
                    <option key={classItem._id} value={classItem._id}>
                      {classItem.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fee-group">
                <h3>Fee Groups:</h3>
                {feeGroups.map((group, index) => (
                  <div className="fee-grp-row" key={index}>
                    <div>
                      <label htmlFor={`feeType-${index}`}>Fee Type:</label>
                      <select
                        id={`feeType-${index}`}
                        value={group.feeType}
                        onChange={(e) =>
                          handleFeeGroupChange(index, "feeType", e.target.value)
                        }
                        required
                      >
                        <option value="">Select Fee Type</option>
                        {feesTypeList.map((feeType) => (
                          <option key={feeType._id} value={feeType.name}>
                            {feeType.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`amount-${index}`}>Amount:</label>
                      <input
                        type="number"
                        id={`amount-${index}`}
                        value={group.amount}
                        onChange={(e) =>
                          handleFeeGroupChange(index, "amount", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`dueDate-${index}`}>Due Date:</label>
                      <input
                        type="date"
                        id={`dueDate-${index}`}
                        value={group.dueDate}
                        onChange={(e) =>
                          handleFeeGroupChange(index, "dueDate", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <button
                        className="btn-dlt"
                        type="button"
                        onClick={() => handleDeleteFeeGroup(index)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={handleAddFeeGroup}>
                  Add Fee Group
                </button>
              </div>
              <button type="submit">{editMode ? "Update Fee Structure" : "Create Fee Structure"}</button>
            </form>
          </div>
        </TabPanel>
        <TabPanel value="1">
          <Table style={{ background: "white" }}>
            <Thead>
              <Tr>
                <Th>Fee Structure</Th>
                <Th>Class</Th>
                <Th>Fee Groups (amount)</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {feeStructures && feeStructures.map((data) => (
                <Tr key={data._id}>
                  <Td>{data.name}</Td>
                  <Td>{data?.class?.name}</Td>
                  <Td>
                  {data?.feeGroups.map((group, index) => (
                   <>
                   {group.feeType}{"("}{group.amount}{")"}
                   {index !== data.feeGroups.length - 1 ? ", " : ""}
                   </> 
                  ))}
                  </Td>
                  
                  <Td>
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
                      onClick={() => handleDelete(data._id)}
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
                      onClick={() => handleEdit(data)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TabPanel>
      </TabContext>
      {showDeleteAlert && (
        <div style={{ position: "fixed", backdropFilter: "blur(5px)", height: "100vh", width: "100%", top: "0", display: "flex", alignItems: "center", justifyContent: "center" }} className="delete-alert">
          <div style={{ background: "white", padding: "10px", borderRadius: "10px" }}>
            <h2>Are you sure you want to delete this Fee Structure?</h2>
            <button style={{ background: "red", }} onClick={handleDeleteConfirm}>Yes, delete</button>
            <button onClick={handleDeleteCancel}>Cancel</button>
          </div>
        </div>
      )}
    </Box>
  );
};

export default AddFeeStructure;
