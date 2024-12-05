import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import AppContext from "../../Context/AppContext";

function Verification() {
  const navigate = useNavigate();
  const [verificationcode, setVerificationcode] = useState("");
  const { Verification } = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Verification(verificationcode);
    console.log(res);
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate("/login");
    } else {
      toast.error(res.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  return (
    <div className="bg-blue-100 w-[100%] py-[12rem] flex flex-col justify-center items-center">
      <form
        action=""
        className="border w-[40%] max-[600px]:w-[100%] p-5 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-gray-700 cursor-pointer font-medium capitalize text-center mb-3">
          Email Verification
        </h1>

        <input
          id="verificationcode"
          name="verificationcode"
          type="number"
          value={verificationcode}
          onChange={(e) => setVerificationcode(e.target.value)}
          required
          autoComplete="verificationcode"
          placeholder="Enter verificationcode"
          className="block w-full rounded-md bg-white px-3 py-[10px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <button className="btn text-gray-100 bg-blue-600 py-[8px] text-center w-[100%] mt-4 rounded-lg hover:bg-blue-800">
          Verify now
        </button>
      </form>
    </div>
  );
}

export default Verification;
