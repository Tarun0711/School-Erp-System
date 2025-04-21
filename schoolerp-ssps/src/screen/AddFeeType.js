import React, { useState, useEffect } from "react";
import "../Css/AddClassForm.css";
import { toast } from "react-toastify";
import { BASE_URL } from "../appconfig";
import { MdEdit, MdDelete } from "react-icons/md";

const ManageFeeTypes = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [feeTypes, setFeeTypes] = useState([]);
  const [selectedFeeTypeId, setSelectedFeeTypeId] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [feeStructureIdToDelete, setFeeStructureIdToDelete] = useState(null);

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  useEffect(() => {
    fetchFeeTypes();
  }, []);

  const fetchFeeTypes = () => {
    fetch(`${BASE_URL}api/fee/feetypes/getAll`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeeTypes(data);
      })
      .catch((error) => {
        console.error("Error fetching fee types:", error);
        notifyError("An error occurred while fetching fee types.");
      });
  };

  const handleEdit = (feeType) => {
    setName(feeType.name);
    setDescription(feeType.description);
    setSelectedFeeTypeId(feeType._id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      notifyError("Please fill in all fields.");
      return;
    }

    if (selectedFeeTypeId) {
      fetch(`${BASE_URL}api/fee/feetypes/update/${selectedFeeTypeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name,
          description,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          notifySuccess("Fee type updated successfully.");
          fetchFeeTypes(); // Refresh fee types list
          resetForm();
        })
        .catch((error) => {
          console.error("Error updating fee type:", error);
          notifyError("An error occurred while updating the fee type.");
        });
    } else {
      fetch(`${BASE_URL}api/fee/feetypes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name,
          description,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          notifySuccess("Fee type added successfully.");
          fetchFeeTypes(); // Refresh fee types list
          resetForm();
        })
        .catch((error) => {
          console.error("Error adding fee type:", error);
          notifyError("An error occurred while adding the fee type.");
        });
    }
  };

  const handleDelete = (id) => {
    setFeeStructureIdToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = () => {
    fetch(`${BASE_URL}api/fee/feetypes/delete/${feeStructureIdToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Fee type deleted successfully") {
          notifySuccess("Fee type deleted successfully");
          fetchFeeTypes();
        } else {
          notifyError("Error while deleting Fee type");
        }
      })
      .catch((error) => {
        console.error("Error deleting Fee type:", error);
        notifyError("An error occurred while deleting the fee type.");
      });
    setShowDeleteAlert(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedFeeTypeId(null);
  };

  return (
    <div className="feesTypePage">
      <div className="add-form">
        <h2>{selectedFeeTypeId ? "Edit Fee Type" : "Add Fee Type"}</h2>
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
          <div className="form-control">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-buttons">
            <button className="btn" type="submit">
              {selectedFeeTypeId ? "Update Fee Type" : "Add Fee Type"}
            </button>
            {selectedFeeTypeId && (
              <button className="btn" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        {feeTypes.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feeTypes.map((feeType) => (
                <tr key={feeType._id}>
                  <td>{feeType.name}</td>
                  <td>{feeType.description}</td>
                  <td style={{ textAlign: "center" }}>
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
                      onClick={() => handleDelete(feeType._id)}
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
                      onClick={() => handleEdit(feeType)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Fees Type available.</p>
        )}
      </div>

      {showDeleteAlert && (
        <div
          style={{
            position: "fixed",
            backdropFilter: "blur(5px)",
            height: "100vh",
            width: "100%",
            top: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="delete-alert"
        >
          <div
            style={{
              background: "white",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <h2>Are you sure you want to delete this Fee Type?</h2>
            <button
              style={{ background: "red", marginRight: "10px" }}
              onClick={handleDeleteConfirm}
            >
              Yes, delete
            </button>
            <button onClick={handleDeleteCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFeeTypes;
