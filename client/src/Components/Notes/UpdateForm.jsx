import React, { useContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import Spiners from "../Spiners/Spiners";
import AppContext from "../../Context/AppContext";

function UpdateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { SingleNote, toggleFormUpdate, UpdateNotes } = useContext(AppContext);
  const [id, setId] = useState("");
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    if (SingleNote) {
      setTitle(SingleNote?.data?.note?.title);
      setDescription(SingleNote?.data?.note?.description);
      setId(SingleNote?.data?.note?._id);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [SingleNote]);

  const HandleSubit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await UpdateNotes(id, title, description);
    setLoading(false);
    if (res?.data?.success === true) {
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
    } else {
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
    }
    toggleFormUpdate();
  };

  return (
    <div className="updateNotes fixed top-0 left-0 right-0 bottom-0 z-[999] h-[100vh] w-[100%] flex justify-center items-center px-[10px]">
      {/* Notes Form Title Descrition  */}
      <form
        action=""
        className="border p-5 rounded-xl w-[40%] max-[700px]:w-[100%] bg-white"
        onSubmit={HandleSubit}
      >
        <h1 className="text-3xl font-bold text-center text-gry-700 mb-4">
          Update a Note
        </h1>
        {/* Input Field  */}
        <input
          type="text"
          className="border-[1.4px] border-gray-200 px-[15px] py-[8px] rounded-md w-full mb-2"
          placeholder="Note here..."
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="content"
          className=" border-[1.4px] border-gray-200 px-[15px] py-[8px] rounded-md w-full resize-none"
          placeholder="Note Description..."
          rows={5}
          cols={5}
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="flex gap-2 items-center mt-3">
          <div
            className="bg-blue-500 text-white py-3 px-4 rounded-md cursor-pointer"
            onClick={toggleFormUpdate}
          >
            cancel
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-4 rounded-md "
          >
            {Loading ? <Spiners /> : "Update Note"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;
