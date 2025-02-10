import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [currentState, setCurrentState] = useState("Sign Up");
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editNote, setEditNote] = useState(null); // 🔹 Store the note being edited
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // ✅ Load User from LocalStorage on First Render
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (token) {
            verifyToken(token);
        } else {
            setLoading(false);
        }
    }, []);

    // ✅ Verify Token (Auto-Login)
    const verifyToken = async (token) => {
        try {
            const res = await axios.get("http://localhost:8001/api/user/verify-token", {
                headers: { Authorization: token },
            });

            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashbord");
        } catch (err) {
            console.error("Invalid token, logging out.");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch Notes When User is Set
    useEffect(() => {
        if (user?._id) {
            fetchAllNotes();
        }
    }, [user]);

    const fetchAllNotes = async () => {
        if (!user?._id) return;

        try {
            const response = await axios.get(`http://localhost:8001/api/notes/${user._id}`);
            setNotes(response.data.notes || []);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    // ✅ Handle Login / Signup
    const handleSubmit = async (e) => {
        e.preventDefault();

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

            alert(response.data.message);
            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);

            navigate("/dashbord");
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Something went wrong"));
        }
    };

    // ✅ Logout Function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    // ✅ Toggle Between Login & Sign Up
    const toggleState = () => {
        setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up");
    };

    // ✅ Handle Notes (Task) Creation & Editing
    const [taskData, setTaskData] = useState({
        project: "Important",
        task: "",
        taskDisc: "",
        dueDate: "",
        document: "",
    });

    const notesHandleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ Handle Adding or Editing Task
    const handleNotes = async (e) => {
        e.preventDefault();

        if (!user || !user._id) {
            alert("User session not found. Please log in again.");
            return;
        }

        if (!taskData.task || !taskData.taskDisc || !taskData.dueDate) {
            alert("Please fill all required fields.");
            return;
        }

        try {
            if (editNote) {
                // 🔹 Update existing note
                const response = await axios.put(
                    `http://localhost:8001/api/notes/update/${editNote._id}`,
                    { ...taskData, userId: user._id },
                    { headers: { "Content-Type": "application/json" } }
                );

                if (response.data.success) {
                    alert(response.data.message);
                    setNotes((prevNotes) =>
                        prevNotes.map((note) =>
                            note._id === editNote._id ? response.data.note : note
                        )
                    );
                    setEditNote(null);
                }
            } else {
                // 🔹 Add a new task
                const response = await axios.post(
                    "http://localhost:8001/api/notes/create/",
                    { ...taskData, userId: user._id },
                    { headers: { "Content-Type": "application/json" } }
                );

                alert(response.data.message);
                setNotes((prevNotes) => [...prevNotes, response.data.note]);
            }

            resetTaskForm();
        } catch (error) {
            console.error("Error handling task:", error.response?.data || error.message);
            alert("Error handling task.");
        }
    };

    // ✅ Reset Form (Fix for Add/Edit Task conflict)
    const resetTaskForm = () => {
        setTaskData({
            project: "Important",
            task: "",
            taskDisc: "",
            dueDate: "",
            document: "",
        });
        setShowTaskForm(false);
        setEditNote(null);
    };

    // ✅ Handle Note Deletion
    const handleDelete = async (noteId) => {
        if (!user) {
            alert("You must be logged in to delete notes.");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8001/api/notes/delete/${noteId}`, {
                data: { userId: user._id },
            });

            if (response.data.success) {
                alert("Note deleted successfully");
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            alert("Error deleting note.");
        }
    };

    // ✅ Handle Edit Task
    const handleEdit = (note) => {
        setEditNote(note);
        setTaskData(note); // 🔹 Load note data into form
        setShowTaskForm(true);
    };

    // ✅ Provide Context Values
    const contextValue = {
        currentState,
        setCurrentState,
        formData,
        handleChange: (e) => setFormData({ ...formData, [e.target.name]: e.target.value }),
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
        handleEdit,
        editNote,
        resetTaskForm,
    };

    if (loading) return <p>Loading...</p>;

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
