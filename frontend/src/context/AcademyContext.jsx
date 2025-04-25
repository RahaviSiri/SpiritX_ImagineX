import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AcademyContext = createContext();

export const AcademyContextProvider = (props) => {
    const [academies, setAcademies] = useState([]);
    const [academy, setAcademy] = useState(null);
    const [AToken, setAToken] = useState('');

    const backend_url = 'http://localhost:3000';

    const getAllAcademies = async () => {
        try {
            const { data } = await axios.get(`${backend_url}/api/academy/get-all-academies`);
            if (data.success) {
                setAcademies(data.academies);
            } else {
                toast.error("Error in fetching all academies");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getAcademy = async (id) => {
        try {
            const { data } = await axios.get(`${backend_url}/api/academy/get-academy/${id}`);
            console.log(data);
            if (data.success) {
                setAcademy(data.academy);
            } else {
                toast.error("Error in fetching academy");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // const fetchAcademy = async () => {
    //     try {
    //       const Atoken = localStorage.getItem('Atoken')
    //       const { data :response} = await axios.get(`${backend_url}/api/academy/get-academy-token`, {
    //         headers: {
    //           Authorization: `Bearer ${Atoken}`, // Add space after Bearer
    //         },
    //         // withCredentials :true
    //       });
    //       console.log(response)
    //       if (response.success) {
    //         setAcademy(response.academy);
    //         console.log(response.academy);
    //       } else {
    //         toast.error("Error in fetching user");
    //       }
    //     } catch (error) {
          
    //       toast.error("An error occurred while fetching user data");
          
    //     }
    //   };

    
    useEffect(() => {
        const storedtoken = localStorage.getItem('Atoken')
        if(storedtoken){
            console.log("Hi"); 
        }
    },[AToken]) 

    const value = {
        backend_url,
        academy,
        academies,
        setAcademy,
        setAcademies,
        getAllAcademies,
        getAcademy,
        AToken,
        setAToken
    }

    return (
        <AcademyContext.Provider value={value}>
            {props.children}
        </AcademyContext.Provider>
    );
}
