import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AcademyContext = createContext();

export const AcademyContextProvider = (props) => {
    const [academies, setAcademies] = useState([]);
    const [academy, setAcademy] = useState(null);

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
            if (data.success) {
                setAcademy(data.academy);
            } else {
                toast.error("Error in fetching academy");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const addAcademy = async (formData) => {
        try {
            const { data } = await axios.post(`${backend_url}/api/academy/add-academy`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
    
            if (data.success) {
                toast.success(data.message || "Academy registered successfully!");
                return data;
            } else {
                toast.error(data.message || "Failed to register academy");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error submitting academy");
        }
    };
    

    const value = {
        backend_url,
        academy,
        academies,
        setAcademy,
        setAcademies,
        getAllAcademies,
        getAcademy,
        addAcademy,
    }

    return (
        <AcademyContext.Provider value={value}>
            {props.children}
        </AcademyContext.Provider>
    );
}
