import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-[#7dbeff] to-[#6781ff] shadow-md text-[#ffffff] py-4 text-center">
      <Link className="text-2xl font-semibold">MEDISCRIBE</Link>
    </div>
  );
};

export default Header;
