/* eslint-disable */
import React, { useState, useEffect } from "react";
import BoxLogo from "./logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const addOrDelete = () => {
  //hooks
  const navigate = useNavigate();
  
  // Name of the inventory
  const [textValue, setTextValue] = useState("");
  // 
  const [imageValue, setImageValue] = useState("");
  const [showInputs, setShowInputs] = useState(true);
  //for items in the box
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  ////////////////////////////////////////////////////////////////////////////////////////
  // Get all the items
  const [get_Items, set_Items] = useState([]);
  useEffect(() => {
    const fetchALlInventory = async () => {
      try {
        const res = await axios.get("http://localhost:5050/addOrDelete");
        set_Items(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchALlInventory();
  }, []);

  // console.log(get_Items)

  const user_Name = localStorage.getItem("userName");
  const userID = localStorage.getItem("userID")

    // mapping through the boxes object and
  // only getting logged in users boxes
  const user_Items = boxes.map(box => {
    if (box.customer_id === parseInt(localStorage.getItem("userID"))) {
      return {
        box_id: box.box_id,
        box_name: box.box_name,
        total_items: box.total_items,
        description: box.description,
        customer_id: box.customer_id
      };
    }
    return null;
  }).filter(Boolean);

  
  ////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList); //this can stay like this since it is for the session and not for the database
    }
  }, []);

  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask])); //this is for entering the item into the databse
      setTask("");
    }
  };

  const handleDelete = (task) => {
    const deleted = tasks.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted)); //this will be to delete the item from the databse ex. ( await axios.delete(`http://localhost:8800/books/${id}`);)
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks"); //this will be to clear the list of items
  };

  const userName = JSON.parse(localStorage.getItem("user"));

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

  // Update local storage whenever the text input value changes
  const handleTextChange = (event) => {
    const value = event.target.value;
    setTextValue(value);
    localStorage.setItem("textValue", value);
  };

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

  const handleLogout = () => {
    //handling logout
    localStorage.removeItem("loggedin");
    localStorage.removeItem("textValue");
    localStorage.removeItem("imageValue");
    navigate("/");
  };

  return (
    //html start
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

        <div className="text-white text-xl py-4 mr-10">Add or Delete Items</div>

        <div className="flex">
          <button className="py-4 cursor-pointer relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left mr-10 text-white">
            {userName.name}
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
        {" "}
        {/*Middle of the page*/}
        <div className="flex items-center h-screen">
          <div className="w-[900px] h-[1200px]  mx-auto  p-8 rounded-2xl">
            <div className="flex ">
              {showInputs ? (
                <div className="flex justify-center items-center h-full">
                  <div className="p-8">
                    <h1 className="text-2xl text-blue-600/100 dark:text-blue-500/100">
                      {" "}
                      Name the inventory
                      <input
                        className="border relative bg-white p-2 "
                        type="text"
                        value={textValue}
                        onChange={handleTextChange}
                        placeholder="Type something..."
                      />
                    </h1>
                  </div>
                  <div className="p-8">
                    <h1 className="text-2xl text-blue-600/100 dark:text-blue-500/100">
                      {" "}
                      Picture of the inventory:
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </h1>
                  </div>
                  <button
                    className="w-72 py-3 mt-8 bg-indigo-600 hover:bg-indigo-500  text-white"
                    onClick={handleDisplay}
                  >
                    Save
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
            </div>{" "}
            {/*end of inventory pic and name*/}
            <div className="text-center ">
              {" "}
              {/*ADDING ITEMS*/}
              <div className="">
                <h1 className="mt-3 text-5xl font-semibold text-blue-600/100 dark:text-blue-500/100">
                  ADD ITEMS
                </h1>
                <div className="col-8">
                  <input
                    name="task"
                    type="text"
                    value={task}
                    placeholder="add your item..."
                    className="border relative bg-white p-2 w-full mt-4"
                    onChange={(e) => setTask(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <button
                    className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-500 relative text-white"
                    onClick={addTask}
                  >
                    add
                  </button>
                </div>
                <div className="text-white">
                  Box has
                  {!tasks.length
                    ? " no items"
                    : tasks.length === 1
                    ? " 1 item"
                    : tasks.length > 1
                    ? ` ${tasks.length} items`
                    : null}
                </div>
                {tasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <h1>
                      <h1
                        className="w-full py-1 mt-2 bg-white text-black relative text-BLACK px-4"
                        style={{ textAlign: "left", fontWeight: "bold" }}
                      >
                        {task.title}
                      </h1>
                    </h1>

                    <div className="flex relative">
                      <button
                        className=" mt-2 text-white"
                        onClick={() => handleDelete(task)}
                      >
                        delete
                      </button>
                    </div>
                  </React.Fragment>
                ))}
                {!tasks.length ? null : (
                  <div>
                    <button
                      className="btn btn-secondary  mt-4 mb-4 text-white"
                      onClick={() => handleClear()}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>{" "}
            {/*ADDING ITEMS*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default addOrDelete;
