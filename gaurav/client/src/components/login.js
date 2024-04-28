import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import loginImg from "./login.jpg";
import { Navigate, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    first_name: "",
    customer_id: "",
    email: "",
    password: "",
  });

  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchAlluser = async () => {
      try {
        const res = await axios.get("http://localhost:5050/login");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlluser();
  }, {});

  // dev function 2
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      user.map((currentUser) => {
        if (
          currentUser.email === input.email &&
          currentUser.password === input.password
        ) {
          localStorage.setItem("loggedin", true); //this can remain in local storage since it will be for knowing that the user is logged in
          localStorage.setItem("userID", currentUser.customer_id);
          localStorage.setItem("userName", currentUser.first_name);
          navigate("/profilePage");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginImg}
        alt="/"
      />

      <div className="flex justify-center items-center h-full">
        <form className="max-w-[400px] w-full mx-auto bg-blue-100 p-8 rounded-2xl">
          <h2 className="text-4xl text-center py-4">
            Tally<span className="font-bold">Crate</span>
          </h2>

          <div className="flex flex-col mb-4">
            <label>Email</label>
            <input
              required
              className="border relative bg-white p-2"
              type="text"
              name="email"
              value={input.email}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col ">
            <label>Password</label>
            <input
              required
              className="border relative bg-white p-2"
              type="password"
              name="password"
              value={input.password}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>

          <button
            className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
            onClick={handleClick}
          >
            Sign In
          </button>
          <button
            className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
            onClick={() => navigate("/Register")}
          >
            Not a user? Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
