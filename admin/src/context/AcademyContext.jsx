import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AcademyContext = createContext();

export const AcademyContextProvider = (props) => {
  const backendURL = "http://localhost:3000";
  const [Academy, setAcademy] = useState([]);

  const fetchAcademies = async () => {
    try {
      const { data: response } = await axios.get(`${backendURL}/api/academy/getAcademies`);
      if (response.success) {
        setAcademy(response.academies);
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
    console.log(Academy);
  }, []);

  const value = {
    backendURL,
    Academy,
    setAcademy,
  };

  return (
    <AcademyContext.Provider value={value}>
      {props.children}
    </AcademyContext.Provider>
  );
};
