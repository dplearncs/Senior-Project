import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import loginImg from "./login.jpg";
import { Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // dev function 1.
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log(input)

  // dev function 2
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/register", input);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginImg}
        alt="/login"
      />

      <div className="flex justify-center items-center h-full">
        <div className="max-w-[400px] w-full mx-auto bg-blue-100 p-8 rounded-2xl">
          <h2 className="text-4xl text-center py-4">
            Tally<span className="font-bold">Crate</span>
          </h2>
          <div className="flex flex-col mb-4">
            <label>Name</label>
            <input
              className="border relative bg-white p-2"
              type="text"
              name="name"
              value={input.name}
              required
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Password</label>
            <input
              className="border relative bg-white p-2"
              type="password"
              name="password"
              value={input.password}
              required
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col ">
            <label>Email</label>
            <input
              className="border relative bg-white p-2"
              type="email"
              name="email"
              value={input.email}
              required
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button
            className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white rounded"
            onClick={handleClick}
          >
            Sign Up
          </button>
          <button
            className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white rounded"
            onClick={() => navigate("/login")}
          >
            already a user? log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
