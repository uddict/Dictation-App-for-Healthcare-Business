import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-[#7dbeff] to-[#6781ff] shadow-md text-[#ffffff] py-4 px-6 flex justify-between items-center">
      <div className="w-24">{/*maybe for adding a logo*/}</div>
      <h1 className="text-2xl font-semibold flex-grow text-center">
        MEDISCRIBE
      </h1>
      <RouterLink to="/login" className="text-white hover:text-gray-200">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </RouterLink>
    </div>
  );
};

export default Header;
