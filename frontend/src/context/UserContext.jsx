import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [uToken, setUToken] = useState(localStorage.getItem("uToken") || "");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [userData,setUserData] = useState({});

  const fetchUser = async () => {
    try {
      const uToken = localStorage.getItem('uToken')
        const { data :response} = await axios.get(`${backendURL}/api/user/get-user-byId`, {
          headers: {
            Authorization: `Bearer ${uToken}`, // Add space after Bearer
          },
          withCredentials :true
        });
        console.log(response)
        if (response.success) {
          
          setUserData(response.user);
          // toast.success("successfully fetch data")
          
        } else {
          toast.error("Error in fetching user");
        }
    } catch (error) {
      // console.log(error)
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('uToken');
    if (token) {
      setUToken(token);
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ uToken, setUToken,backendURL,userData,setUserData,fetchUser  }}>
      {children}
    </UserContext.Provider>
  );
};