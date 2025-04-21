import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../Css/AddStudent.css";
import FeeStructureAccordion from "../components/FeeStructureAccordion";
import ParentCredentialsModal from "../components/reuse/ParentCredentialModal";
import { BASE_URL } from "../appconfig";
import { useLocation } from "react-router-dom";

import PhotoPreview from "../components/PhotoPreview";
import AdmissionReceipt from "../components/AdmissionReceipt";

const AddStudent = () => {
  const location = useLocation();

 

  const [formData, setFormData] = useState({
    admission_Number: "",
    roll_Number: "",
    first_Name: "",
    last_Name: "",
    class_Id: "",
    section: "",
    session: "",
    date_Of_Birth: "",
    gender: "",
    permanent_Address: "",
    address_For_Correspondence: "",
    contact_Number: "",
    alternet_Contact_Number: "",
    email: "",
    nationality: "India",
    religion: "",
    category: "",
    date_Of_Admission: "",
    blood_Group: "",
    father_Name: "",
    father_Occupation: "",
    mother_Name: "",
    mother_Occupation: "",
    student_Photo: null,
    aadhar_number: "",
    due_amount: "",
  });


  useEffect(() => {
    if (location.state && location.state.student) {
      setFormData(location.state.student);
    }
  }, [location.state]);

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [classList, setClassList] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
  ]);
  const [feeStructures, setFeeStructures] = useState([]);
  const [selectedFeeStructures, setSelectedFeeStructures] = useState([]);
  const [parentCredentials, setParentCredentials] = useState(null); // State to store parent credentials
  const [showParentCredentialsModal, setShowParentCredentialsModal] =
    useState(false); // State to manage modal visibility
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [lastAdmissionNumber, setLastAdmissionNumber] = useState(""); // State to store the last admission number
  const [isRegistering, setIsRegistering] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  const navigate = useNavigate();

  // Define required fields
  const requiredFields = [
    "admission_Number",
    "roll_Number",
    "class_Id",
    "section",
    "session",
    "first_Name",
    "last_Name",
    "date_Of_Birth",
    "gender",
    "permanent_Address",
    "contact_Number",
    "date_Of_Admission",
    "father_Name",
    "mother_Name",
    "student_Photo",
  ];

  useEffect(() => {
    fetchClassData();
    fetchFeeStructures();
    fetchLastAdmissionNumber();
  }, []);

  const fetchLastAdmissionNumber = () => {
    fetch(`${BASE_URL}api/student/getLastAdmissionNumber`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        console.log(
          "data.lastAdmissionNumber",
          data.lastGeneratedAdmissionNumber
        );
        setLastAdmissionNumber(data.lastGeneratedAdmissionNumber); // Set the last admission number in state
      })
      .catch((error) => {
        console.error("Error fetching last admission number:", error);
      });
  };

  const generateAdmissionNumber = () => {
    if (!lastAdmissionNumber) {
      return ""; // Return empty string if last admission number is not available
    }
    const numericPart = parseInt(lastAdmissionNumber.match(/\d+/)[0]); // Extract numeric part
    const nextAdmissionNumber = `AD-${numericPart + 1}`; // Increment numeric part and generate new admission number
    // const nextAdmissionNumber = `${numericPart + 1}`;
    return nextAdmissionNumber;
  };

  // Update admission number in form data whenever last admission number changes
  useEffect(() => {
    const newAdmissionNumber = generateAdmissionNumber();
    setFormData((prevFormData) => ({
      ...prevFormData,
      admission_Number: newAdmissionNumber,
    }));
  }, [lastAdmissionNumber]);

  const handleFeeSelection = (selectedFees) => {
    setSelectedFeeStructures(selectedFees);
  };

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/dcfrxghei/upload`;
    const fd = new FormData();

    fd.append("upload_preset", "myschool");

    fd.append("file", file);

    fetch(url, {
      method: "POST",
      body: fd,
    })
      .then((response) => response.json())
      .then((data) => {
        // File uploaded successfully
        const url = data.secure_url;
        console.log(url);
        setUrl(url);
        setFormData({
          ...formData,
          student_Photo: url,
        });
        setIsImageUploaded(true);
        toast.success("Image Upload Successfully");
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      })
      .finally(() => {
        setIsRegistering(false); // Reset registering state after the request is complete
      });
  }

  const fetchClassData = () => {
    fetch(`${BASE_URL}api/class/getAll`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClassList(data);
      })
      .catch((error) => {
        console.error("Error fetching class data:", error);
      });
  };

  const fetchFeeStructures = () => {
    fetch(`${BASE_URL}api/fee/feestructure/getAll`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeeStructures(data);
      })
      .catch((error) => {
        console.error("Error fetching fee structures:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e) => {
    const photo = e.target.files[0];
    setImage(photo);
    uploadFile(photo);
    // setFormData({
    //   ...formData,
    //   student_Photo: photo,
    // });
  };

  const postData = () => {
    if (isRegistering) return;
    setIsRegistering(true);

    // Check for required fields
    for (const field of requiredFields) {
      if (!formData[field]) {
        notifyError(`Please fill in the ${field.replace("_", " ")} field.`);
        return;
      }
    }
    formData["feeStructures"] = selectedFeeStructures;

    console.log("formData", formData);
    console.log("formData", JSON.stringify(formData));

    // Sending data to server
    // const formDataToSend = new FormData();

    // for (const key in formData) {
    //   formDataToSend.append(key, formData[key]);
    // }
    // console.log(formDataToSend);

    // for (const pair of formDataToSend.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    // setRegistrationCompleted(true);

    fetch(`${BASE_URL}api/student/addStudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // Check if student was successfully created
        if (data.message === "Student and Parent created successfully") {
          notifySuccess("Registered Successfully");
          setRegistrationCompleted(true); // Set the state to indicate registration completion
        } else {
          notifyError("An error occurred while registering.");
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        console.error("Error posting data:", error);
        notifyError("An error occurred while registering.");
      });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="addStudents">
      <div className="addStudentForm">
        {/* <h1>Register Student</h1> */}
        {!registrationCompleted ? ( // Render the form if registration is not completed
          <>
            <div className="form">
              {Object.entries(formData).map(([key, value]) => (
                <div className="form-control" key={key}>
                  <label htmlFor={key}>
                    {key
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}{" "}
                    {requiredFields.includes(key) && (
                      <span style={{ color: "red" }}>*</span>
                    )}
                  </label>
                  
                  {key === "gender" ? (
                    <select
                      className="form-control-feild"
                      name={key}
                      value={value}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : key === "class_Id" &&
                    Array.isArray(classList) &&
                    classList.length > 0 ? (
                    <select
                      className="form-control-feild"
                      name={key}
                      value={value}
                      onChange={handleChange}
                    >
                      <option value="">Select Class</option>
                      {classList.map((classItem) => (
                        <option key={classItem._id} value={classItem._id}>
                          {classItem.name}
                        </option>
                      ))}
                    </select>
                  ) : key === "section" ? (
                    <select
                      className="form-control-feild"
                      name={key}
                      value={value}
                      onChange={handleChange}
                    >
                      <option value="">Select Section</option>
                      {sectionOptions.map((section) => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                    </select>
                  ) : key === "session" ? (
                    <select
                      className="form-control-feild"
                      name={key}
                      value={value}
                      onChange={handleChange}
                    >
                      <option value="">Select Session</option>
                      {/* Add options for session here */}
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                      <option value="2026-2027">2023-2024</option>
                    </select>
                  ) : key === "date_Of_Birth" || key === "date_Of_Admission" ? (
                    <input
                      className="form-control-feild"
                      type="date"
                      name={key}
                      value={value}
                      onChange={handleChange}
                    />
                  ) : key === "blood_Group" ? (
                    <select
                      className="form-control-feild"
                      name={key}
                      value={value}
                      onChange={handleChange}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : key === "category" ? (
                    <select
                      className="form-control-feild"
                      name={key}
                      value={value}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : key === "nationality" ? (
                    <input
                      className="form-control-feild"
                      type="text"
                      name={key}
                      value="India"
                      disabled
                    />
                  ) : key === "religion" ? (
                    <select
                      className="form-control-feild"
                      name={key}
                      value={value}
                      onChange={handleChange}
                    >
                      <option value="">Select Religion</option>
                      <option value="Christian">Christian</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddhist">Buddhist</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : key === "student_Photo" ? (
                    <input
                      className="form-control-feild"
                      accept="image/*"
                      type="file"
                      name={key}
                      onChange={handlePhotoUpload}
                    />
                  ) : (
                    <input
                      className="form-control-feild"
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
              <label className="photo-preview-label">Photo Preview</label>
              <div className="photo-preview-container">
                <PhotoPreview photo={image} />
              </div>
            </div>

            <div className="fee-details">
              <header className="heading">Fees Details</header>
              <div className="fees-accordion-box">
                {feeStructures &&
                  feeStructures.map((feeStructure) => (
                    <FeeStructureAccordion
                      feeStructure={feeStructure}
                      onSelect={handleFeeSelection}
                      key={feeStructure._id}
                    />
                  ))}
              </div>
            </div>
          </>
        ) : (
          // Render Admission Receipt component if registration is completed

          <>
            <button className="btn-print" onClick={handlePrint}>
              Print
            </button>
            <AdmissionReceipt studentData={formData} />
          </>
        )}
        {!registrationCompleted && ( // Render Register button only if registration is not completed
          <input
            className="btn-register"
            type="submit"
            value="Register"
            onClick={postData}
            disabled={!isImageUploaded || isRegistering}
            style={
              !isImageUploaded ? {
                pointerEvents: "none",
                background: "red",
                opacity: 0.2,
              } : {}
            }
          />
        )}
      </div>
    </div>
  );
};

export default AddStudent;
