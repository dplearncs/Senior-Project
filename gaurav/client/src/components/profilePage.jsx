/* eslint-disable */
import React, { useState } from "react";
import BoxLogo from "./logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";


const profilePage = () => {
  const navigate = useNavigate();

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

  const userName = localStorage.getItem("userName");
  const userID = localStorage.getItem("userID");

  // mapping through the boxes object and
  // only getting logged in users boxes
  const boxId2 = boxes
    .map((box) => {
      if (box.customer_id === parseInt(localStorage.getItem("userID"))) {
        return {
          box_id: box.box_id,
          box_name: box.box_name,
          total_items: box.total_items,
          description: box.description,
          customer_id: box.customer_id,
        };
      }
      return null;
    })
    .filter(Boolean);

  // console.log("*****************************************************")
  // console.log(boxId2)
  // console.log("*****************************************************")

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

  // to add items
  const [input, setInput] = useState({
    box_name: "",
    customer_id: localStorage.getItem("userID"),
    image_name: "",
  });

  // dev function 2
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/profilepage", input);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddOrDelete = (box_id) => {
    localStorage.setItem("boxID", box_id);
    navigate("/addOrDelete");
  };

  return (
    <div className="bg-[url('https://img.freepik.com/free-photo/close-up-warehouse-view_23-2148923142.jpg?t=st=1712775495~exp=1712779095~hmac=28eed57d40cee743ab53eb5208d0b0b4a96094ad42f2170e6571b95ac96b94c9&w=1800')] 
    bg-cover
    bg-no-repeat
    bg-center h-screen text-center items-center">
      

      {" "}
      {/*main div*/}
      <div className="mx-auto flex justify-between  p-4 bg-black">
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
      {/* ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????*/}
      <div className=" ">
        <div>
         
            <div className="flex justify-center items-center h-full  mx-auto bg-blue-100 p-8 rounded-2xl mt-4">
              
              <div className="p-8">
                <h1 className="text-2xl text-black">
                  {" "}
                  Name the inventory
                  <div>
                    <input
                      name="box_name"
                      required
                      type="text"
                      className="border relative bg-white text-black p-2 "
                      value={input.box_name}
                      onChange={(e) =>
                        setInput({ ...input, [e.target.name]: e.target.value })
                      }
                      placeholder="Name your inventory..."
                    />
                  </div>
                </h1>
              </div>
              <button
                className="w-72 py-3 mt-8 bg-indigo-600 hover:bg-indigo-500  text-white"
                onClick={handleClick}
              >
                Create a new inventory
              </button>
            </div>
        </div>

      
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 ">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-blue-100 rounded-2xl">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        inventory name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Edit option
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Delete</span>
                    </th>
                </tr>
            </thead>
            <tbody>
          {boxId2.map((box) => (
                <tr class="bg-blue-100 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-2xl">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                    {box.box_name}
                    </th>
                    
                    <td class="px-6 py-4">
                    <button
                className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white rounded-lg"
                onClick={() => handleAddOrDelete(box.box_id)}
              >
                Add Items or Edit
              </button>
                    </td>
                    <td class="px-6 py-4 text-right">
                    <button
                className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white rounded-lg"
                onClick={() => handleDelete(box.box_id)}
              >
                Delete container
              </button>
                    </td>
                </tr>
                ))}{" "}
            </tbody>
        </table>
           
          
           </div>
        </div>

        {/*????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????*/}
      </div>

  );
};

export default profilePage;