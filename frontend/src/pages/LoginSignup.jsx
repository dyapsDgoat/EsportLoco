import React, { useState } from "react";
import axios from "axios";
import "./LoginSignup.css";
import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post("http://localhost:8800/user_info", {
        username: username,
        password: password,
      });

      console.log("Server Response:", response.data);

      if (response.data.success) {
        const userID = response.data.userId;
        window.alert("Login successful!");
        console.log(userID);

        // Set loggedIn state to true to trigger conditional rendering
        setLoggedIn(true);

        // Perform navigation to "admindashboard"
        navigate("/admindashboard/");
      } else {
        console.log("Login unsuccessful! Reason:", response.data.message);
        window.alert("Login unsuccessful! " + response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login");
      window.alert("Login unsuccessful! An error occurred during login");
    }
  };

  return (
    <div>
      <div className="ls-container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={handleLogin}>
              <div className="login__field">
                <i className="login__icon">
                  <FaUser />
                </i>
                <input
                  type="text"
                  className="login__input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="User name / Email"
                />
              </div>
              <div className="login__field">
                <i className="login__icon">
                  <FaLock />
                </i>
                <input
                  type="password"
                  className="login__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="button login__submit">
                <span className="button__text">Log In Now</span>
                <i className="button__icon">
                  <FaArrowRight />
                </i>
              </button>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
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

export default LoginSignup;
