import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AcademyContext = createContext();

export const AcademyContextProvider = (props) => {
  const backendURL = "http://localhost:3000";
  const [academies, setAcademies] = useState([]);  // Renamed to plural

  const fetchAcademies = async () => {
    try {
      const { data: response } = await axios.get(`${backendURL}/api/academy/get-all-academies`,{
        withCredentials:true
      });
      console.log(response);
      if (response.success) {
        setAcademies(response.academies); // Updated to plural
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAcademies();
  }, []);

  useEffect(() => {
    
    console.log(academies);  // Updated to plural
  }, [academies]);

  const value = {
    backendURL,
    academies,  // Updated to plural
    setAcademies,
  };

  return (
    <AcademyContext.Provider value={value}>
      {props.children}
    </AcademyContext.Provider>
  );
};
