import React from "react";
import Dictate from "./pages/Dictate";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dictate />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
