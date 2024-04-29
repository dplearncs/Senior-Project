/* eslint-disable */
import React, { useState } from "react";
import BoxLogo from "./logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const profilePage = () => {
  const navigate = useNavigate();

  const [textValue, setTextValue] = useState("");
  //
  const [imageValue, setImageValue] = useState("");
  const [showInputs, setShowInputs] = useState(true);

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

  //name and picture of incventory
  useEffect(() => {
    const savedTextValue = localStorage.getItem("textValue");
    const savedImageValue = localStorage.getItem("imageValue");

    if (savedTextValue) {
      setTextValue(savedTextValue);
    }

    if (savedImageValue) {
      setImageValue(savedImageValue);
    }

    if (savedTextValue || savedImageValue) {
      setShowInputs(false); // Hide inputs if there are saved values
    }
  }, []);

  // Update local storage whenever the image input value changes
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setImageValue(imageDataUrl);
        localStorage.setItem("imageValue", imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDisplay = () => {
    setShowInputs(false);
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
    <div className="bg-black h-screen bg-repeat-y">
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
          {showInputs ? (
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
              <div className="p-8">
                <h1 className="text-2xl text-black ">
                  {" "}
                  Picture of the inventory:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                  />
                </h1>
              </div>
              <button
                className="w-72 py-3 mt-8 bg-indigo-600 hover:bg-indigo-500  text-white"
                onClick={handleClick}
              >
                Create a new inventory
              </button>
            </div>
          ) : (
            <div className="flex  items-center h-full mx-auto space-x-2 md:space-x-8 p-4">
              <h1 className="text-5xl font-semibold text-blue-600/100 dark:text-blue-500/100 ">
                {textValue}
              </h1>
              {imageValue && (
                <img
                  className=" relative w-55 h-60 border-double border-4 border-black "
                  src={imageValue}
                  alt="Uploaded"
                />
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-x-2 gap-y-3 grid-flow-row-dense mt-8 flex">
          {boxId2.map((box) => (
            <div className=" h-72 bg-blue-100 p-8 rounded-2xl">
              <h2 className="text-4xl text-center py-4">{box.box_name}</h2>
              <img
                className="h-72 w-full object-cover object-center rounded-lg"
                src="https://img.freepik.com/free-photo/boxes-packed-relocation_23-2147758885.jpg?t=st=1713157679~exp=1713161279~hmac=13aab102d6955621a6834a69777bdfcea5c091051b318b6bed1f5e0f02c73965&w=1800"
                alt="nature image"
              />
              <button
                className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white rounded-lg"
                onClick={() => handleAddOrDelete(box.box_id)}
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
        </div>

        {/*????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????*/}
      </div>
    </div>
  );
};

export default profilePage;
