import React, { useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spiners from "../Spiners/Spiners";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const { Login } = useContext(AppContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await Login(email, password);
    setLoading(false);
    console.log(res);
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
      navigate("/");
      setEmail("");
      setPassword("");
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
    <div className="w-[100%] flex place-content-center place-items-center py-[5rem] px-[10px]">
      <form
        action=""
        className="border p-5 rounded-xl w-[40%] max-[700px]:w-[100%] bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-medium text-center text-gray-800">Login</h1>

        <input
          type="email"
          id="email"
          name="email"
          className=" w-[100%] border px-[15px] py-[8px] border-gray-300 rounded-md my-3"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="password"
          name="password"
          className="w-[100%] border px-[15px] py-[8px] border-gray-300 rounded-md"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* dont have accont */}
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer underline"
          >
            Register
          </span>
        </p>
        <button className="bg-blue-400 py-[8px] text-center w-[100%] text-white text-[14px] mt-4 font-normal rounded-md">
          {Loading ? <Spiners /> : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Login;
