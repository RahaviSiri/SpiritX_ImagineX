import { createContext, useEffect, useState } from "react";
import Coach from "../components/Coach";
import {toast} from 'react-toastify'
import axios from 'axios';
import React from "react";


export const CoachContext = createContext();

export const CoachContextProvider = (probs) => {

    const backendURL = 'http://localhost:3000'
    const [Coach,setCoach] = useState([]);
    const fetchcoaches = async () => {
        try {
            const {data:response} = await axios.get(`${backendURL}/api/coach/getCoaches`)
            // console.log(response)
            if(response.success){
                setCoach(response.users);

            }
            else{
                toast.error(response.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    useEffect(() => {
        fetchcoaches();
        
    },[])
    useEffect(() => {
        console.log(Coach)
    },[])
    
    const value = {
        backendURL,
        Coach,
        setCoach
    }

    return (
        <CoachContext.Provider value={value}>
            {probs.children}
        </CoachContext.Provider>
    )
}