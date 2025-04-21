import React from "react";
import "../../Css/Modal.css"

const ParentCredentialsModal = ({ parentCredentials, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Parent Credentials</h2>
        <p><strong>Username:</strong> {parentCredentials.username}</p>
        <p><strong>Password:</strong> {parentCredentials.password}</p>
      </div>
    </div>
  );
};

export default ParentCredentialsModal;
