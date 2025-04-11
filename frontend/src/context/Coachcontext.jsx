import { createContext, useState } from "react";

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

  const backend_url = 'http://localhost:3000';

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

    backend_url
  };
  
  return (
    <CoachContext.Provider value={value}>
      {props.children}
    </CoachContext.Provider>
  );
};
