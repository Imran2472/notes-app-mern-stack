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
    <div className="relative">
      <Navbar />
      <Notes />
      {Authentication ? (
        <>
          <div
            className="fixed bottom-[4rem] max-[400px]:bottom-[6rem] max-[400px]:right-[2rem] max-[400px]:w-[46px] max-[400px]:h-[46px] right-[3rem] h-[60px] w-[60px] rounded-full bg-black text-white max-[400px]:text-[20px] text-[25px] cursor-pointer flex justify-center items-center"
            onClick={toggleForm}
          >
            <FaPlus />
          </div>
          {showForm && <NotesForm />}
        </>
      ) : (
        <>{""}</>
      )}
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
