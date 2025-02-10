import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [refrash, setRefrash] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [notes, setNotes] = useState([]);

 
  // const triggerRefrash = () => setRefrash((prev) => prev);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });



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
    navigate("/"); // Redirect to login page
  };

  // 🔹 Toggle between Login and Sign Up
  const toggleState = () => {
    setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up");
  };


  // create notes 

  //state to store the input values from the form 
  const [taskData, setTaskData] = useState({
    project: 'Important',
    task: '',
    taskDisc: '',
    dueDate: '',
    document: '',
  });

  const notesHandleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle notes 
  const handleNotes = async (e) => {
    e.preventDefault();

    // chekc if usr is logged in
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    if (!userId) {
      alert("User not found.please log in");
      return;
    }

    //chack fill are complete
    if (!taskData.task || !taskData.taskDisc || !taskData.dueDate
    ) return alert("plese fill all the importants field");

    let response;

    // conect with yourmongodb
    try {
      response = await axios.post("http://localhost:8001/api/notes/create/", { ...taskData, userId },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("response", response.data);
      alert(response.data.message);
      setNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.log(error);
    }

    if (!response) {
      return;
    }

    setShowTaskForm(false);
    setTaskData({
      project: 'Important',
      task: '',
      taskDisc: '',
      dueDate: '',
      document: null,
    })
  }


  const fetchAllNotes = async () => {
    const userId = JSON.parse(localStorage.getItem('user'))?._id;
    if (!userId) {
      alert('User not found. Please log in');
      return [];
    }
    try {
      const response = await axios.get(`http://localhost:8001/api/notes/${userId}`);
      console.log("Fetched Notes:", JSON.stringify(response.data.notes, null, 2));
       return response.data.notes || []; // Return the notes array
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || 'Error fetching notes');
      return []; // Return an empty array if an error occurs
    }
  };
  useEffect(() => {
    fetchAllNotes();
  }, []);




  // for deleting notes 
  const handleDelete = async (noteId) => {

    // get user 
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) {
      alert('You must be logged in to delte note');
      return;
    };

    const userId = user._id;

    try {
      const response = await axios.delete(`http://localhost:8001/api/notes/delete/${noteId}`,
       {data: {userId},
      });
    

      if(response.data.success){
        alert("Note deleted successFully");
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      } else{
        alert(response.data.message);
      }
    } catch (error) {
      console.error('error deleting note:',error);
      alert("error deleting note");
    }


  }
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
    taskData,
    setTaskData,
    notesHandleChange,
    handleNotes,
    fetchAllNotes,
    notes,
    setNotes,
    handleDelete,
    handleLogout,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};


