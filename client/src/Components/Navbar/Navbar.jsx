import React, { useContext, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
function Navbar() {
  const [Open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const { Authentication, Logout, user } = useContext(AppContext);
  const toggleMenu = () => {
    setOpen(!Open);
  };
  const toggleOpen = () => {
    setDropDown(!dropDown);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropsdown")) {
        setDropDown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropDown]);
  return (
    <>
      <header className="bg-white py-[20px] lg:px-[90px] md:px-[50px] px-[10px]">
        <nav className="flex justify-between items-center">
          <div className="logo text-[25px] text-gray-900 font-medium">
            Notes App
          </div>
          <div
            className={`navbar max-[600px]:fixed max-[600px]:top-0 max-[600px]:left-0 max-[600px]:right-0 max-[600px]:w-[90%] max-[600px]:h-[100vh] items-center justify-center max-[600px]:bg-gray-900 ${
              Open ? "max-[600px]:flex" : "max-[600px]:hidden"
            }`}
          >
            <ul className="flex items-center gap-5 max-[600px]:flex-col max-[600px]:gap-10">
              <li className="text-[16px] text-gray-800 font-normal max-[600px]:text-white cursor-pointer">
                Home
              </li>
              <li className="text-[16px] text-gray-800 font-normal max-[600px]:text-white cursor-pointer">
                About
              </li>
              <li className="text-[16px] text-gray-800 font-normal max-[600px]:text-white cursor-pointer">
                Services
              </li>
              <li className="text-[16px] text-gray-800 font-normal max-[600px]:text-white cursor-pointer">
                Contact
              </li>
              {Authentication ? (
                <>
                  <li className="dropsdown" onClick={toggleOpen}>
                    <img
                      src={user?.user?.profile}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full object-contain cursor-pointer"
                    />
                  </li>
                  {dropDown && (
                    <>
                      <ul className="fixed top-[70px] right-[2rem] w-[150px] bg-white p-3 border rounded-md z-10">
                        <li className="px-[10px] py-[5px] cursor-pointer rounded-md hover:bg-blue-500 hover:text-white">
                          {user?.user?.name}
                        </li>
                        <li
                          className="px-[10px] py-[5px] cursor-pointer mt-2 rounded-md hover:bg-blue-500 hover:text-white"
                          onClick={Logout}
                        >
                          Logout
                        </li>
                      </ul>
                    </>
                  )}
                </>
              ) : (
                <li
                  className="text-[16px] text-gray-800 font-normal max-[600px]:text-white cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </li>
              )}
            </ul>
          </div>
          <div
            className="menu-bar hidden max-[600px]:block"
            onClick={toggleMenu}
          >
            {Open ? <CloseIcon /> : <MenuIcon />}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
