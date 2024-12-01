import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Notes from "../Notes/Notes";
import { FaPlus } from "react-icons/fa";
import NotesForm from "../Notes/NotesForm";
import Footer from "../Footer/Footer";
import AppContext from "../../Context/AppContext";

function HomePage() {
  //   const [showForm, setShowForm] = React.useState(false);
  //     const toggleForm = () => setShowForm(!showForm);
  const { showForm, toggleForm, Authentication } = useContext(AppContext);
  return (
    <>
      <Navbar />
      <Notes />
      {Authentication ? (
        <>
          <div
            className="fixed bottom-[4rem] right-[3rem] h-[60px] w-[60px] rounded-full bg-black text-white text-[25px] cursor-pointer flex justify-center items-center"
            onClick={toggleForm}
          >
            <FaPlus />
          </div>
          {showForm && <NotesForm />}
        </>
      ) : (
        <>{""}</>
      )}
      <Footer />
    </>
  );
}

export default HomePage;
