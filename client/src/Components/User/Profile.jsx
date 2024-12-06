import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import Navbar from "../Navbar/Navbar";
import { Bounce, toast } from "react-toastify";
import Spiners from "../Spiners/Spiners";
function Profile() {
  const { user, UpdateProfile } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const RenderValues = () => {
      setName(user?.user?.name);
      setEmail(user?.user?.email);
      setId(user?.user?._id);
      profile && setProfile(user?.user?.profile);
      setPreview(user?.user?.profile);
    };
    RenderValues();
  }, [user]);

  const HandleEdite = () => {
    setUpdate(!update);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    setLoading(true)
    profile && formData.append("profile", profile);
    const res = await UpdateProfile(id, formData);
    if (res.success) {
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
      setLoading(false)
      HandleEdite();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
    <>
      <Navbar />
      <div className="lg:px-[90px] md:px-[50px] sm:px-[30px] px-[10px]">
        <div className="py-[3rem]">
          <h1 className="text-xl font-semibold mb-4">Your Profile</h1>
          <form
            action=""
            className="bg-white shadow-md rounded-lg p-9 w-[60%] max-[600px]:w-[100%]"
            onSubmit={HandleSubmit}
          >
            {/* pofile Image  */}
            <h1 className="text-xl font-medium text-gray-800 cursor-auto mb-2">
              Update Your Profile{" "}
            </h1>
            <p className="text-sm text-gray-600 font-light mb-4">
              Update your profile information, including your name, email, and
              profile picture
            </p>
            <div className="mb-[2rem]">
              <>
                {update ? (
                  <>
                    <label
                      htmlFor="profile"
                      className="border w-[120px] h-[120px"
                    >
                      <>
                        {profile ? (
                          <img
                            src={
                              profile ? URL.createObjectURL(profile) : profile
                            }
                            alt=""
                            className="w-[120px] h-[120px] rounded-lg object-cover border object-top"
                          />
                        ) : (
                          <img
                            src={preview}
                            alt=""
                            className="w-[120px] h-[120px] object-cover rounded-lg object-top"
                          />
                        )}
                      </>
                      {update && (
                        <input
                          type="file"
                          id="profile"
                          className="hidden"
                          onChange={(e) => setProfile(e.target.files[0])}
                        />
                      )}
                    </label>
                  </>
                ) : (
                  <>
                    <img
                      src={preview}
                      alt=""
                      className="w-[120px] h-[120px] object-cover rounded-lg object-top"
                    />
                  </>
                )}
              </>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-[18px] mb-2">Name:</label>

              {update ? (
                <input
                  type="text"
                  className="border w-full px-3 py-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <>
                  <div className="name py-[10px] text-base font-normal">
                    {user?.user?.name}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col mt-[1rem]">
              <label className="text-gray-600 text-[18px] mb-2">Email:</label>

              {update ? (
                <input
                  type="email"
                  className="border w-full px-3 py-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <>
                  <div className="email py-[10px] text-base font-normal">
                    {user?.user?.email}
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end items-center gap-4 mt-7">
              {update ? (
                <>
                  <button
                    type="submit"
                    className="text-white bg-blue-500 px-[20px] py-[10px] rounded-lg hover:bg-blue-600"
                  >
                    {loading ? <Spiners /> : "update now"}
                  </button>
                  <div
                    className="text-white bg-blue-500 px-[20px] py-[10px] rounded-lg hover:bg-blue-600 cursor-pointer"
                    onClick={HandleEdite}
                  >
                    Cancel
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="text-white bg-blue-500 px-[20px] py-[10px] rounded-lg hover:bg-blue-600 cursor-pointer"
                    onClick={HandleEdite}
                  >
                    edite
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
