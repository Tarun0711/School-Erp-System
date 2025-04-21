import React, { useState } from "react";
import "../Css/LoginForm.css";
import { useNavigate } from "react-router-dom";
import SCHOOLIMG from "../assets/Students walking in front of university flat vector illustration.jpg";
import { BASE_URL } from "../appconfig";

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [userType, setUserType] = useState("admin");
  const [userId, setUserId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const userTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userType === "admin") {
      // Handle admin login
      const response = await fetch(`${BASE_URL}api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userId,
          password: adminPassword,
          role: "admin"
        }),
      });
      const data = await response.json();
      // Handle response data as needed
      if (data.token) {
        localStorage.setItem("token", data.token); // Save token to localStorage
        // Redirect to admin dashboard or perform any other action
        navigate("/admin/home");
        console.log("Admin Login Response:", data);
      } else {
        // Handle login error
        console.log("Admin Login Error:", data.error);
      }
      console.log("Admin Login Response:", data);
    } else {
      // Handle parent login
      console.log("Parent Login:", userName, password, mobileNumber);
      navigate("/parent/home");
    }
  };

  return (
    <div className="pages">
      <div className="left_sec">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="title selector">Login</div>
            <div className="selector">
              <select value={userType} onChange={userTypeChange}>
                <option value="admin">Admin</option>
                <option value="parent">Parent</option>
              </select>
            </div>

            {userType === "admin" ? (
              <div className="admin_sec">
                <div className="input-box underline">
                  <input
                    type="text"
                    value={userId}
                    placeholder="Enter Your Username"
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                  <div className="underline"></div>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    required
                  />
                  <div className="underline"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="input-box underline">
                  <input
                    type="text"
                    placeholder="Enter Your Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                  <div className="underline"></div>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="underline"></div>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Enter Your Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                  <div className="underline"></div>
                </div>
              </>
            )}
            <div className="input-box button">
              <input type="submit" name="" value="Continue" />
            </div>
          </form>
        </div>
      </div>
      <div className="right_sec">
        <div className="side_img">
          <img src={SCHOOLIMG} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
