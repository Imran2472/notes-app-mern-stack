import React from "react";

function Footer() {
  return (
    <div className="bg-white py-[15px] text-center flex items-center gap-2 justify-center max-[400px]:flex-col">
      <span className="text-gray-800 text-[15px] font-medium">
        Copyright &copy; {new Date().getFullYear()}
      </span>
      <span className="text-gray-800 text-[15px] font-medium">
        My Notes App. All rights reserved.
      </span>
    </div>
  );
}

export default Footer;
