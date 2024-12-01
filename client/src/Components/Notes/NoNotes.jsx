import React, { useContext } from "react";
import empty from "../../assets/empty.png";
import NotesForm from "./NotesForm";
import AppContext from "../../Context/AppContext";
function NoNotes() {
  const { showForm, toggleForm } = useContext(AppContext);
  return (
    <div className="fixed top-[6rem] left-0 right-0 w-[100%] h-[auto] py-[1rem] flex flex-col justify-center items-center text-center ">
      <img
        src={empty}
        alt=""
        className="w-[400px] h-[300px] object-contain object-top max-[700px]:w-[100%] max-[700px]:h-[100%]"
      />
      <h1 className="text-xl text-gray-900 font-semibold mb-4">
        No Notes Available Please Creat a Note !
      </h1>
      <button
        className="text-[14px] text-gray-50 bg-blue-500 hover:bg-blue-700 cursor-pointer py-[10px] px-[25px] rounded-md"
        onClick={toggleForm}
      >
        Create a Notes
      </button>
      {showForm && <NotesForm />}
    </div>
  );
}

export default NoNotes;
