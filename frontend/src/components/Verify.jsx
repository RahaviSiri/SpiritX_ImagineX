import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CoachContext } from "../context/Coachcontext";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  console.log(success)
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  const { backend_url } = useContext(CoachContext);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data: response } = await axios.post(
          `${backend_url}/api/coach/verify`,
          { success, userId },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.success) {
          toast.success(response.message);
          navigate("/coach-list");
        } else {
          toast.error(response.message || "Something went wrong");
        }
      } catch (error) {
        toast.error(error.message || "Error during verification");
      }
    };

    if (success && userId) {
      verifyUser();
    }
  }, [success, userId, navigate, backend_url]);

  return <div>Verifying your registration...</div>;
};

export default Verify;
