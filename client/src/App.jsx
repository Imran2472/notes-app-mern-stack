import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import AppContext from "./Context/AppContext";
import Verification from "./Components/User/Verifications";
import Profile from "./Components/User/Profile";
function App() {
  const { Authentication } = useContext(AppContext);
  return (
    <>
      <Routes>
        <Route path="/" element={Authentication ? <HomePage /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verification" element={<Verification />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
