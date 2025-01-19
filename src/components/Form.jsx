import React, { useState } from "react";
import "./Form.css";

const Form = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [error, seterror] = useState({});
  const [isvalid, setisvalid] = useState({
    email: false,
    password: false,
    confirmpassword: false, 
  });

  // Email validation
  const validateemail = (value) => {
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailregex.test(value)) {
      seterror((prev) => ({ ...prev, email: "Invalid email address" }));
      setisvalid((prev) => ({ ...prev, email: false }));
    } else {
      seterror((prev) => ({ ...prev, email: "" }));
      setisvalid((prev) => ({ ...prev, email: true }));
    }
  };

  // Password validation
  const validatepassword = (value) => {
    if (value.length < 8) {
      seterror((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters",
      }));
      setisvalid((prev) => ({ ...prev, password: false }));
    } else {
      seterror((prev) => ({ ...prev, password: "" }));
      setisvalid((prev) => ({ ...prev, password: true }));
    }
  };

  // Confirm password validation
  const validateconfirmpassword = (value) => {
    if (value !== password) {
      seterror((prev) => ({
        ...prev,
        confirmpassword: "Passwords do not match", // Match key to "confirmpassword"
      }));
      setisvalid((prev) => ({ ...prev, confirmpassword: false })); // Match key
    } else {
      seterror((prev) => ({ ...prev, confirmpassword: "" })); // Match key
      setisvalid((prev) => ({ ...prev, confirmpassword: true })); // Match key
    }
  };

  // Form submission
  const handlesubmit = (e) => {
    e.preventDefault();

    // Check for all fields being valid
    if (isvalid.email && isvalid.password && isvalid.confirmpassword) {
      alert("Form submitted successfully");
    } else {
      alert("Can't submit the form");
    }
  };

  return (
    <form className="signup-form" onSubmit={handlesubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
            validateemail(e.target.value);
          }}
          className={`input ${
            isvalid.email ? "valid" : error.email ? "invalid" : ""
          }`}
        />
        {error.email && <p className="error">{error.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
            validatepassword(e.target.value);
          }}
          className={`input ${
            isvalid.password ? "valid" : error.password ? "invalid" : ""
          }`}
        />
        {error.password && <p className="error">{error.password}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          id="confirmpassword"
          type="password"
          value={confirmpassword}
          onChange={(e) => {
            setconfirmpassword(e.target.value);
            validateconfirmpassword(e.target.value);
          }}
          className={`input ${
            isvalid.confirmpassword
              ? "valid"
              : error.confirmpassword
              ? "invalid"
              : ""
          }`}
        />
        {error.confirmpassword && (
          <p className="error">{error.confirmpassword}</p>
        )}
      </div>

      <button type="submit" className="submit-button">
        Sign Up
      </button>
    </form>
  );
};

export default Form;
