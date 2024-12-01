import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import UpdateForm from "./UpdateForm";
import NoNotes from "./NoNotes";
import { FaEye } from "react-icons/fa";
import AppContext from "../../Context/AppContext";

function Notes() {
  const {
    Notes,
    GetSingleNotes,
    toggleFormUpdate,
    showFormUpdate,
    Authentication,
    setReload,
    DeleteNotes,
  } = useContext(AppContext);
  const [Time, setTime] = useState("");
  const [showDate, setShowDate] = useState();
  const SingleNot = async (id) => {
    await GetSingleNotes(id);
    toggleFormUpdate();
    setReload(true);
  };

  const GetRealTime = () => {
    Notes?.notes?.map((data) => {
      setTime(data?.createdAt);
    });
    const realDate = new Date(Time).toDateString();
    setShowDate(realDate);
  };

  useEffect(() => {
    GetRealTime();
    // eslint-disable-next-line
  }, [Notes, Time]);
  return (
    <div className="py-[50px] lg:px-[90px] md:px-[50px] px-[10px]">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 items-start">
        {Notes?.notes?.length === 0 ? (
          <>
            <NoNotes />
          </>
        ) : (
          <>
            {Authentication ? (
              <>
                {Notes?.notes?.map((note) => (
                  <div
                    className="notes bg-white shadow-md border rounded-md p-4"
                    key={note?._id}
                  >
                    <div className="title text-[20px] font-medium text-gray-900 cursor-pointer">
                      {note?.title}
                    </div>
                    <div className="content text-[12px] font-normal text-gray-600 mt-4 description">
                      {note?.description}
                    </div>
                    <div className="date text-[12px] text-gray-500 font-normal text-end">
                      {showDate}
                    </div>
                    <div className="actions text-end flex gap-1 justify-end mt-2">
                      <button
                        className="delete text-[20px] bg-blue-700 text-white py-[5px] px-[7px] rounded-md"
                        onClick={() => SingleNot(note?._id)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="delete text-[20px] bg-red-700 text-white py-[5px] px-[7px] rounded-md"
                        onClick={() => DeleteNotes(note?._id)}
                      >
                        <MdDelete />
                      </button>
                      <button
                        className="edit text-[20px] bg-green-700 text-white py-[5px] px-[7px] rounded-md"
                        onClick={() => SingleNot(note?._id)}
                      >
                        <FaEdit />
                      </button>
                      {showFormUpdate && <UpdateForm />}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div>Please Login To See Your Notes</div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Notes;
