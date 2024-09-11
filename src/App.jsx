import React from "react";
import Dictate from "./pages/Dictate";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dictate />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
};

export default App;
