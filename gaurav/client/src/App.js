import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Profile from "./components/profilePage";
import Register from "./components/Register";
import ProtectedRoutes from "./Services/ProtectedRoutes";
import Add from "./components/addOrDelete";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addOrDelete" element={<Add />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/profilePage" element={<Profile />} />
          </Route>
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
