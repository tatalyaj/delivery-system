// import logo from './logo.svg';
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Manager from "./pages/admin";
import Driver from "./pages/delivery";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin" element={<Manager />} />
        <Route path="/delivery" element={<Driver />} />
      </Routes>
    </Router>
  );
}

export default App;
