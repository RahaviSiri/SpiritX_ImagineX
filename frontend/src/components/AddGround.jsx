import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UploadCloud } from "lucide-react";
import { toast } from "react-toastify";
import assets from "../assets/assets.js";
import axios from "axios"
import { GroundContext } from "../context/GroundContext.jsx";

const AddGround = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState("");
  const [freeTime, setFreeTime] = useState([]);
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
      if (!name || !category || !image || !address || !freeTime) {
        toast.error("Please fill out all required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("image", image); 
      formData.append("address", address);
      formData.append("freeTime", JSON.stringify(freeTime));

      const { data } = await axios.post(`${backend_url}/api/ground/add-ground`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if(data.success){
        toast.success("Ground Registered Successfully!");
        setName("");
        setAddress("");
        setCategory("");
        setImage(null);
        setFreeTime([]);
        navigate("/all-ground");
      }
      toast.success("Ground Registered Successfully!");
    } catch (error) {
      toast.success("Ground Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 font-sans" style={{
      backgroundImage: `url(${assets.AddGroundBackroundImage})`,
      backgroundSize: "cover", 
      backgroundPosition: "center", 
      backgroundRepeat: "no-repeat", 
    }}>
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
              className="w-full border border-blue-300 p-2 rounded-md outline-none "
              required
            />

            <select
              className="w-full border border-blue-300 p-2 rounded-md outline-none "
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
              className="w-full border border-blue-300 p-2 rounded-md outline-none "
              required
            />

            <input
              type="text"
              value={freeTime}
              onChange={(e) => {
                const input = e.target.value;
                const timeSlots = input.split(",").map(slot => slot.trim()).filter(slot => slot !== "");
                setFreeTime(timeSlots);
              }}              
              placeholder="Free Time (e.g., 8:00 AM - 10:00 AM, 2:00 PM - 4:00 PM)*"
              className="w-full border border-blue-300 p-2 rounded-md outline-none "
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-blue-500  hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition"
          >
            Register Ground
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGround;
