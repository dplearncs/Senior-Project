/* eslint-disable */
import React, { useState } from "react";
import BoxLogo from "./logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const profilePage = () => {
  const navigate = useNavigate();

  // const [input, setInput] = useState({
  //   first_name: "",
  //   customer_id: "",
  //   email: "",
  //   password: "",
  // });

  const [boxes, setBoxes] = useState([]);
  // get all the container or box
  useEffect(() => {
    const fetchALlInventory = async () => {
      try {
        const res = await axios.get("http://localhost:5050/profilePage");
        setBoxes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchALlInventory();
  }, []);

  // console.log("**********************************************")
  // console.log(box)
  // console.log("**********************************************")

  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("userID");
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/profilePage/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      class="bg-[url(https://img.freepik.com/free-photo/close-up-warehouse-view_23-2148923142.jpg?t=st=1712775495~exp=1712779095~hmac=28eed57d40cee743ab53eb5208d0b0b4a96094ad42f2170e6571b95ac96b94c9&w=1800)]
     bg-cover bg-no-repeat bg-center h-screen"
    >
      {" "}
      {/*main div*/}
      <div className="mx-auto flex justify-between items-center p-4 bg-black">
        {/* Left side */}

        <div className="flex items-center text-white">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 cursor-pointer">
            Tally<span className="font-bold">Crate</span>
          </h1>
          <div>
            <img src={BoxLogo} className="h-11" />
          </div>
        </div>

        <div className="text-white text-xl py-4 mr-10">
          Create or Edit your inventory
        </div>

        <div className="flex">
          <button className="py-4 cursor-pointer relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left mr-10 text-white">
            {userName}
          </button>
          <button
            onClick={handleLogout}
            className="py-4 cursor-pointer relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left mr-10 text-white"
          >
            Log out
          </button>
        </div>
      </div>
      <div className="relative w-full h-screen bg-zinc-900/90">
        <img className="absolute w-full h-full object-cover mix-blend-overlay" />
        <div className="flex justify-center items-center h-screen">
          {/* <div className="w-[500px] h-[500px]  mx-auto bg-blue-100 p-8 rounded-2xl">
            <h2 className="text-4xl text-center py-4">Inventory #2</h2>
            <img
              className="h-72 w-full object-cover object-center rounded-lg"
              src="https://img.freepik.com/free-photo/boxes-packed-relocation_23-2147758885.jpg?t=st=1713157679~exp=1713161279~hmac=13aab102d6955621a6834a69777bdfcea5c091051b318b6bed1f5e0f02c73965&w=1800"
              alt="nature image"
            />
            <button
              className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white rounded-lg"
              onClick={() => navigate("/addOrDelete")}
            >
              Add Items or Edit
            </button>
          </div> */}
          {boxes.map((box) => (
            <div className="w-[500px] h-[500px]  mx-auto bg-blue-100 p-8 rounded-2xl">
              <h2 className="text-4xl text-center py-4">{box.box_name}</h2>
              <img
                className="h-72 w-full object-cover object-center rounded-lg"
                src="https://img.freepik.com/free-photo/boxes-packed-relocation_23-2147758885.jpg?t=st=1713157679~exp=1713161279~hmac=13aab102d6955621a6834a69777bdfcea5c091051b318b6bed1f5e0f02c73965&w=1800"
                alt="nature image"
              />
              <button
                className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white rounded-lg"
                onClick={() => navigate("/addOrDelete")}
              >
                Add Items or Edit
              </button>
              <button
                className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white rounded-lg"
                onClick={() => handleDelete(box.box_id)}
              >
                Delete container
              </button>
            </div>
          ))}{" "}
          {/* second box */}
        </div>
      </div>
    </div>
  );
};

export default profilePage;
