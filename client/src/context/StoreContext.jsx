import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [showlogin, setShowlogin] = useState(true);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 🔹 Check for saved token when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user from localStorage
    }

    if (token) {
      verifyToken(token);
    }
  }, []);

  // 🔹 Function to verify token and auto-login
  const verifyToken = async (token) => {
    try {
      const res = await axios.get("http://localhost:8001/api/user/verify-token", {
        headers: { Authorization: token },
      });

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashbord"); // Redirect to dashboard if token is valid
    } catch (err) {
      console.error("Invalid token, logging out.");
      localStorage.removeItem("token"); // Remove invalid token
      localStorage.removeItem("user"); // Also clear user info
      setUser(null);
    }
  };

  // 🔹 Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from refreshing!

    // Validation before making the request
    if (!formData.email || !formData.password || (currentState === "Sign Up" && !formData.name)) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      let response;
      if (currentState === "Sign Up") {
        response = await axios.post("http://localhost:8001/api/user/create/", formData);
      } else {
        response = await axios.post("http://localhost:8001/api/user/login/", {
          email: formData.email,
          password: formData.password,
        });
      }

      console.log("Response:", response.data);
      alert(response.data.message);

      // Reset form only if request is successful
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      // Navigate to dashboard after successful login/signup
      navigate("/dashbord");

    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
      alert("Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  // 🔹 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Redirect to login page
  };

  // 🔹 Toggle between Login and Sign Up
  const toggleState = () => {
    setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up");
  };

  // Provide context value
  const contextValue = {
    currentState,
    setCurrentState,
    formData,
    handleChange,
    handleSubmit,
    toggleState,
    user,
    showTaskForm,
    setShowTaskForm,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};
