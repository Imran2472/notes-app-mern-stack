import { useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AppState = (props) => {
  const [Count, setCount] = useState(0);
  const [Authentication, setAuthentication] = useState(false);
  const [user, setUser] = useState(null);
  const [Notes, setNotes] = useState([]);
  const [reload, setReload] = useState(false);
  const [SingleNote, setSingleNote] = useState([]);
  const navigate = useNavigate();
  const URI = "https://notes-app-mern-stack.vercel.app/v1/api";
  // const URI = "http://localhost:4000/v1/api";
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const toggleFormUpdate = () => setShowFormUpdate(!showFormUpdate);
  const GetToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthentication(true);
      } else {
        setAuthentication(false);
      }
    } catch (error) {
      console.log("Error in token check", error);
    }
  };
  useEffect(() => {
    GetToken();
    UserProfile();
  }, [reload, localStorage.getItem("token")]);

  useEffect(() => {
    GetAllNotes();
  }, [reload, localStorage.getItem("token")]);

  const Register = async (formData) => {
    try {
      const response = await axios.post(`${URI}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response?.data;
    } catch (error) {
      console.log("Error in Registration", error);
    }
  };
  const Verification = async (verificationcode) => {
    try {
      const Response = await axios.post(
        `${URI}/user/verify`,
        {
          verificationcode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return Response?.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  const Login = async (email, password) => {
    try {
      const response = await axios.post(
        `${URI}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        setReload(true);
      }
      return response?.data;
    } catch (error) {
      console.log("Error in Login", error);
    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setAuthentication(false);
    toast.success("Logout Successfully", {
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
    navigate("/");
  };

  const UserProfile = async () => {
    try {
      const response = await axios.get(`${URI}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      setUser(response?.data);
      return response?.data;
    } catch (error) {}
  };

  const CreateNote = async (title, description) => {
    try {
      const response = await axios.post(
        `${URI}/notes/create`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      return response?.data;
    } catch (error) {
      console.log("Error in Create Note", error);
    }
  };
  const GetAllNotes = async () => {
    try {
      const response = await axios.get(`${URI}/notes/allnotes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      });

      setNotes(response.data);
      return response?.data;
    } catch (error) {
      console.log("Error in Get All Notes", error);
    }
  };
  const UpdateNotes = async (noteId, title, description) => {
    try {
      const response = await axios.put(
        `${URI}/notes/updatenotes/${noteId}`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      return response?.data;
    } catch (error) {
      console.log("Error in Update Notes", error);
    }
  };
  const GetSingleNotes = async (id) => {
    try {
      const response = await axios.get(`${URI}/notes/singlenotes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      setSingleNote(response);
      return response?.data;
    } catch (error) {
      console.log("Error in Get Single Notes", error);
    }
  };
  const DeleteNotes = async (id) => {
    try {
      const response = await axios.delete(`${URI}/notes/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      setReload(!reload);
      if (response.data.success) {
        toast.success(response?.data?.message, {
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
        toast.error(response?.data?.message, {
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
      return response;
    } catch (error) {
      console.log("Error in Delete Notes", error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        Count,
        Register,
        Login,
        Authentication,
        Logout,
        user,
        CreateNote,
        Notes,
        GetSingleNotes,
        showForm,
        toggleForm,
        showFormUpdate,
        toggleFormUpdate,
        setReload,
        SingleNote,
        UpdateNotes,
        DeleteNotes,
        Verification,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
