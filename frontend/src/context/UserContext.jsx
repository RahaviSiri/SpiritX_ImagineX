import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [uToken, setUToken] = useState(localStorage.getItem("uToken") || "");
  const backendURL = "http://localhost:3000";

  useEffect(() => {
    const token = localStorage.getItem('uToken');
    if (token) {
      setUToken(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ uToken, setUToken,backendURL  }}>
      {children}
    </UserContext.Provider>
  );
};