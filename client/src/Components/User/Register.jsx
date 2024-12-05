import React, { useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spiners from "../Spiners/Spiners";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [Loading, setLoading] = useState(false);
  const { Register } = useContext(AppContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile", profile);
    setLoading(true);
    const res = await Register(formData);
    setLoading(false);
    if (res?.success === true) {
      toast.success(res?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/email-verification");
      setName("");
      setEmail("");
      setPassword("");
      setProfile(null);
    } else {
      toast.error(res?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return (
    <div className="w-[100%] h-[100vh] place-content-center place-items-center px-[10px] flex flex-col  justify-center items-center max-w-[1600px] mx-auto">
      <form
        action=""
        className="border p-5 rounded-xl w-[40%] max-[700px]:w-[100%] bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-medium text-center text-gray-800">
          Register
        </h1>

        <div className="text-center flex justify-center items-center mt-3">
          <label className="h-[80px] w-[80px] rounded-full" htmlFor="profile">
            <img
              src={
                profile
                  ? URL.createObjectURL(profile)
                  : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
              }
              alt=""
              className="w-[100%] h-[100%] object-cover object-top cursor-pointer rounded-full"
            />
            <input
              type="file"
              id="profile"
              className="hidden"
              name="profile"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </label>
        </div>

        <input
          type="text"
          id="name"
          name="name"
          className="w-[100%] border px-[15px] py-[8px] border-gray-300 rounded-md mt-5"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          id="email"
          name="email"
          className=" w-[100%] border px-[15px] py-[8px] border-gray-300 rounded-md my-3"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="password"
          name="password"
          className="w-[100%] border px-[15px] py-[8px] border-gray-300 rounded-md"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-center text-gray-500 mt-4">
          Allready have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer"
          >
            Login
          </span>
        </p>
        <button className="bg-blue-400 py-[8px] text-center w-[100%] text-white text-[14px] mt-4 font-normal rounded-md">
          {Loading ? <Spiners /> : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
