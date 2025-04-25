import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import { toast } from "react-toastify";
import assets from "../assets/assets.js";
import axios from "axios";
import { GroundContext } from "../context/GroundContext.jsx";

const AddGround = () => {
  const { id } = useParams();
  const { getGround, ground, backend_url } = useContext(GroundContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState("");
  const [freeTime, setFreeTime] = useState([]);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [groundType, setGroundType] = useState("");

  const navigate = useNavigate();

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  //   setImagePreview(URL.createObjectURL(file));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!id) {
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
      } else {
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
      setGroundType(ground.groundType || "");
      setImagePreview(ground.image || null);
    }
  }, [ground]);

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4 font-sans relative pt-20 pb-4"
      style={{
        backgroundImage: `url(${assets.AddGround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Yellow Glow Background Layer */}
      <div className="absolute top-1/2 left-1/2 w-[50vw] h-[50vw] bg-yellow-300 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />

      <div className="relative w-full max-w-3xl bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl z-10 text-white space-y-6 border border-yellow-600">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center text-yellow-400 drop-shadow-lg mb-4">
            Register Your Ground
          </h1>

          <div className="space-y-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ground Name*"
              className="w-full bg-transparent border border-yellow-500 text-white px-4 py-2 rounded-lg outline-none placeholder-gray-400 focus:border-yellow-400"
              required
            />

            <select
              className="w-full bg-transparent border border-yellow-500 text-white px-4 py-2 rounded-lg outline-none focus:border-yellow-400"
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
                  className="h-32 w-32 object-cover border border-yellow-400 rounded-lg"
                />
              </div>
            ) : (
              <label className="flex items-center gap-2 text-white hover:underline cursor-pointer text-sm font-medium border border-dashed bg-transparent border-yellow-500 p-3 rounded-lg bg-gray-800">
                <UploadCloud size={18} /> Upload Ground Image*
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImage(file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  required
                />
              </label>
            )}

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address*"
              className="w-full bg-transparent border border-yellow-500 text-white px-4 py-2 rounded-lg outline-none placeholder-gray-400 focus:border-yellow-400"
              required
            />

            <input
              type="text"
              value={freeTime.join(", ")}
              onChange={(e) => {
                const input = e.target.value;
                const timeSlots = input
                  .split(",")
                  .map((slot) => slot.trim())
                  .filter((slot) => slot !== "");
                setFreeTime(timeSlots);
              }}
              placeholder="Free Time (e.g., 8:00 AM - 10:00 AM, 2:00 PM - 4:00 PM)*"
              className="w-full bg-transparent border border-yellow-500 text-white px-4 py-2 rounded-lg outline-none placeholder-gray-400 focus:border-yellow-400"
              required
            />

            {!id && (
              <>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder="Owner Email*"
                  className="w-full bg-transparent border border-yellow-500 text-white px-4 py-2 rounded-lg outline-none placeholder-gray-400 focus:border-yellow-400"
                  required
                />

                <input
                  type="password"
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                  placeholder="Owner Password*"
                  className="w-full bg-transparent border border-yellow-500 text-white px-4 py-2 rounded-lg outline-none placeholder-gray-400 focus:border-yellow-400"
                  required
                />
              </>
            )}

            <select
              className="w-full bg-transparent border border-yellow-500 text-white px-4 py-2 rounded-lg outline-none focus:border-yellow-400"
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
            className="mt-6 w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black text-lg font-bold rounded-xl transition duration-300"
          >
            Register Ground
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGround;
