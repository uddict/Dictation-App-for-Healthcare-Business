import React from "react";
import Dictate from "./pages/Dictate";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Progress from "./pages/Progress";
import Soap from "./pages/Soap";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dictate />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/soap" element={<Soap />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  );
};

export default App;
