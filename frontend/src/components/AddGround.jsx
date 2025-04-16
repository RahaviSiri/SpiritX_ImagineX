import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import { toast } from "react-toastify";
import assets from "../assets/assets.js";
import axios from "axios";
import { GroundContext } from "../context/GroundContext.jsx";

const AddGround = () => {
  const { id } = useParams();
  console.log(id);
  const { getGround, ground } = useContext(GroundContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState("");
  const [freeTime, setFreeTime] = useState([]);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [groundType, setGroundType] = useState("");

  const { backend_url } = useContext(GroundContext);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!id){
        if (
          !name ||
          !category ||
          (!image && !imagePreview) ||
          !address ||
          !freeTime ||
          !ownerEmail ||
          !ownerPassword ||
          !groundType
        ) {
          toast.error("Please fill out all required fields.");
          return;
        }
      }else{
        if (
          !name ||
          !category ||
          (!image && !imagePreview) ||
          !address ||
          !freeTime ||
          !groundType
        ) {
          toast.error("Please fill out all required fields.");
          return;
        }
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("image", image);
      formData.append("address", address);
      formData.append("freeTime", JSON.stringify(freeTime));
      formData.append("ownerEmail", ownerEmail);
      formData.append("ownerPassword", ownerPassword);
      formData.append("groundType", groundType);

      let data;

      if (id) {
        const response = await axios.post(
          `${backend_url}/api/ground/update-ground/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        data = response.data;
      } else {
        const response = await axios.post(
          `${backend_url}/api/ground/add-ground`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        data = response.data;
      }

      if (data.success) {
        toast.success("Ground Registered Successfully!");
        setName("");
        setCategory("");
        setImage(null);
        setImagePreview(null);
        setAddress("");
        setFreeTime([]);
        setOwnerEmail("");
        setOwnerPassword("");
        setGroundType("");
        navigate("/all-ground");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        toast.error(
          error.response.data.message || "Ground Registration Failed"
        );
      } else {
        toast.error("Ground Registration Failed");
      }
    }
  };

  useEffect(() => {
    if (id) {
      getGround(id);
    }
  }, [id]);

  useEffect(() => {
    if (id && ground) {
      setName(ground.name || "");
      setCategory(ground.category || "");
      setAddress(ground.address || "");
      setFreeTime(ground.freeTime || []);
      // setOwnerEmail(ground.ownerEmail || "");
      // setOwnerPassword(ground.ownerPassword || "");
      setGroundType(ground.groundType || "");
      setImagePreview(ground.image || null);
    }
  }, [ground]);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-50 px-4 font-sans"
      style={{
        backgroundImage: `url(${assets.AddGroundBackroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-3xl bg-black/30 p-8 rounded-2xl shadow-xl space-y-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center text-white mb-4">
            Register Your Ground
          </h1>

          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ground Name*"
              className="w-full border border-blue-300 p-2 rounded-md outline-none"
              required
            />

            <select
              className="w-full border border-blue-300 p-2 rounded-md outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
              <option value="sports">Sports</option>
            </select>

            {imagePreview ? (
              <div
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                className="cursor-pointer"
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover border border-blue-300 rounded-md"
                />
              </div>
            ) : (
              <label className="flex items-center gap-2 text-white hover:underline cursor-pointer text-sm font-medium border border-dashed border-white-400 p-2 rounded-md">
                <UploadCloud size={16} /> Upload Ground Image*
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  hidden
                  onChange={handleImageChange}
                  required
                />
              </label>
            )}

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address*"
              className="w-full border border-blue-300 p-2 rounded-md outline-none"
              required
            />

            <input
              type="text"
              value={freeTime}
              onChange={(e) => {
                const input = e.target.value;
                const timeSlots = input
                  .split(",")
                  .map((slot) => slot.trim())
                  .filter((slot) => slot !== "");
                setFreeTime(timeSlots);
              }}
              placeholder="Free Time (e.g., 8:00 AM - 10:00 AM, 2:00 PM - 4:00 PM)*"
              className="w-full border border-blue-300 p-2 rounded-md outline-none"
              required
            />

            {!id && (
              <>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder="Owner Email*"
                  className="w-full border border-blue-300 p-2 rounded-md outline-none"
                  required
                />

                <input
                  type="password"
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                  placeholder="Owner Password*"
                  className="w-full border border-blue-300 p-2 rounded-md outline-none"
                  required
                />
              </>
            )}

            <select
              className="w-full border border-blue-300 p-2 rounded-md outline-none"
              value={groundType}
              onChange={(e) => setGroundType(e.target.value)}
              required
            >
              <option value="">-- Select Ground Type --</option>
              <option value="Cricket">Cricket</option>
              <option value="Basket Ball">Basket Ball</option>
              <option value="Volley Ball">Volley Ball</option>
              <option value="Badminton">Badminton</option>
              <option value="Net Ball">Net Ball</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition"
          >
            Register Ground
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGround;
