import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {ErrorComponent} from "./ErrorComponent"; // Import the ErrorComponent

const Header = () => {
  const [error, setError] = useState(null);

  // Function to simulate an error (for demonstration purposes)
  const simulateError = () => {
    setError("An error occurred in the header");
  };

  return (
    <div className="bg-gradient-to-r from-[#7dbeff] to-[#6781ff] shadow-md text-[#ffffff] py-4 px-6 flex flex-col">
      <div className="flex justify-between items-center">
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
      {error && <ErrorComponent message={error} />}
      {/* Button to simulate error (remove in production) */}
      <button onClick={simulateError} className="mt-2 text-sm">Simulate Error</button>
    </div>
  );
};

export default Header;
