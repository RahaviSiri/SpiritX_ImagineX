import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CoachContext = createContext();

export const CoachContextProvider = (props) => {
  // Personal Info
  const [fullName, setFullName] = useState("");
  const [profile, setProfile] = useState(null); // assuming file/image
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [NIC, setNIC] = useState("");
  const [NIC_photo, setNIC_photo] = useState(null); // assuming file/image

  // Contact Details
  const [contactNo, setContactNo] = useState("");
  const [HomeTP, setHomeTP] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  // Address
  const [Line1, setLine1] = useState("");
  const [Line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  // Coach Selection
  const [selectionType, setSelectionType] = useState("");
  const [school_Academics, setSchool_Academics] = useState("");
  const [sport, setSport] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [qualifications_photo, setQualifications_photo] = useState(null); // file/image

  //   const [profileState,setProfileState] = useState(true);
  //   const [NIC_photoState,setNIC_photoState] = useState(false);
  //   const [qualificaions_photoState,setQualificaions_photoState] = useState(false);

  const [approve, setApprove] = useState();
  const [token,setToken] = useState('');

  // comment

  const backend_url = "http://localhost:3000";
  const [userData,setUserData] = useState(null);
  const [userDatas,setUserDatas] = useState(null);

  const fetchCoaches = async () => {
    try {
      const {data:response} = await axios.get(`http://localhost:3000/api/coach/getCoaches`,{
        withCredentials:true
      })
      if(response.success){
        setUserDatas(response.users)
        toast.success(response.message)
      }
      else{
        toast.error(response.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const fetchCoach = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data :response} = await axios.get(`${backend_url}/api/coach/getCoach`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add space after Bearer
        },
        // withCredentials :true
      });
      console.log(response)
      if (response.success) {
        
        setUserData(response.coach);
        
      } else {
        toast.error("Error in fetching user");
      }
    } catch (error) {
      
      toast.error("An error occurred while fetching user data");
      
    }
  };
 

  useEffect(() => {
    const storedtoken = localStorage.getItem('token')
    if(storedtoken){
     
      fetchCoach();
        
        
    }
  },[])

  const value = {
    fullName,
    setFullName,
    profile,
    setProfile,
    DOB,
    setDOB,
    gender,
    setGender,
    NIC,
    setNIC,
    NIC_photo,
    setNIC_photo,

    contactNo,
    setContactNo,
    HomeTP,
    setHomeTP,
    whatsapp,
    setWhatsapp,
    email,
    setEmail,

    Line1,
    setLine1,
    Line2,
    setLine2,
    city,
    setCity,
    district,
    setDistrict,

    selectionType,
    setSelectionType,
    school_Academics,
    setSchool_Academics,
    sport,
    setSport,
    qualifications,
    setQualifications,
    qualifications_photo,
    setQualifications_photo,

    // profileState,
    // setProfileState,
    // NIC_photoState,
    // setNIC_photoState,
    // qualificaions_photoState,
    // setQualificaions_photoState

    fetchCoach,
    fetchCoaches,

    backend_url,
    userData,
    setUserData,
    userDatas,
    setUserDatas,
    token,
    setToken
  };

  return (
    <CoachContext.Provider value={value}>
      {props.children}
    </CoachContext.Provider>
  );
};
