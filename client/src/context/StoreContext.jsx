import react, {createContext,useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom"; 
export const Context = createContext();

export const ContextProvider = ({children}) => {
  
const [currentState, setCurrentState] = useState("Sign Up");
  const [showlogin, setShowlogin] = useState(true);
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

      // Navigate to dashboard after successful login/signup
      navigate("/deshbord"); // Ensure your path is correct

    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
      alert("Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

const toggleState = () => {
    setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up");
  };

  const contextValue = {
    currentState,
    formData,
    handleChange,
    handleSubmit,
    toggleState,
  }
  
  return(
       <Context.Provider value={{contextValue}}>
         
         {children}
         
       </Context.Provider>
    )
 
}