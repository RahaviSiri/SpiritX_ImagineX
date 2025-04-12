import axios from "axios";
import React, { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CoachContext } from "../context/Coachcontext";
import { toast } from "react-toastify";

const Verify = async () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  const { backend_url } = useContext(CoachContext);

  try {
    const { data: response } = await axios.post(
      `${backend_url}/api/coach/verify`,
      { success, userId },
      {
        withCredentials: true,
      }
    );

    if (response.success) {
      navigate("/");
      toast.success(response.message);
    } else {
      toast.error(response.messge);
    }
  } catch (error) {
    toast.error(error.message);
  }

  return <div>Verify</div>;
};

export default Verify;
