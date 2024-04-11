import React, { useState } from "react";
import "./LoginSignup.css";
import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSignup2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      console.log("formData.password:", formData.password);
      console.log("formData.confirmPassword:", formData.confirmPassword);
      alert("Passwords do not match");
      return;
    }

    try {
      // Make an API call to the registration endpoint
      const response = await axios.post("http://localhost:8800/user_info", {
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      // Handle the response accordingly
      if (response.data.success) {
        window.alert("Registration Complete. Redirecting to adminlogin.");
        navigate("/adminlogin/");
        // You can add additional logic here, such as redirecting the user or showing a success message
      } else {
        // Display the error message to the user
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error.response.data);
      // Handle the error (display a message or perform other actions)
      alert(error.response.data.message || "Registration failed");
    }
  };

  return (
    <div>
      <div className="ls-container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={handleSubmit}>
              <div className="login__field">
                <i className="login__icon">
                  <FaUser />
                </i>
                <input
                  type="text"
                  className="username__input"
                  placeholder="Enter Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="login__field">
                <i className="login__icon">
                  <FaLock />
                </i>
                <input
                  type="password"
                  className="password__input"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="login__field">
                <i className="login__icon">
                  <FaLock />
                </i>
                <input
                  type="password"
                  className="confirmpassword__input"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="button login__submit">
                <span className="button__text">Register Now!</span>
                <i className="button__icon">
                  <FaArrowRight />
                </i>
              </button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup2;
