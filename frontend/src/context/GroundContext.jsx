import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"

export const GroundContext = createContext();

export const GroundContextProvider = (props) => {
    const [grounds,setGrounds] = useState([]);
    const [ground,setGround] = useState(null);

    const backend_url = 'http://localhost:3000';

    const getAllGrounds = async () => {
        try {
            const { data } = await axios.get(`${backend_url}/api/ground/get-all-grounds`);
            if(data.success){
                setGrounds(data.grounds);
            }else{
                toast.error("Error in fetching all grounds");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getGround = async (id) => {
        try {
            const { data } = await axios.get(`${backend_url}/api/ground/get-ground/${id}`);
            if(data.success){
                setGround(data.ground);
            }else{
                toast.error("Error in fetching ground");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        backend_url,
        ground,
        grounds,
        setGround,
        setGrounds,
        getAllGrounds,
        getGround,
    }
    
    return (
        <GroundContext.Provider value={value}>
          {props.children}
        </GroundContext.Provider>
    );
}