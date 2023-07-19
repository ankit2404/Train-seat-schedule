import React from "react";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  
  return (
    <div>
      <Navbar />
      <Main />
      <ToastContainer />

    </div>
  );
}

export default App;
