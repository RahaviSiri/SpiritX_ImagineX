import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [uToken, setUToken] = useState(localStorage.getItem("uToken") || "");
  const backendURL = "http://localhost:3000";

  const [userData,setUserData] = useState();

  const fetchUser = async () => {
    const token = localStorage.getItem('uToken')
      const { data :response} = await axios.get(`${backendURL}/api/user/get-user-byId`, {
        headers: {
          Authorization: `Bearer ${uToken}`, // Add space after Bearer
        },
        withCredentials :true
      });
      console.log(response)
      if (response.success) {
        
        setUserData(response.coach);
        
      } else {
        toast.error("Error in fetching user");
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
    <UserContext.Provider value={{ uToken, setUToken,backendURL,userData,setUserData  }}>
      {children}
    </UserContext.Provider>
  );
};