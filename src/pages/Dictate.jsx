import React from "react";
import { Visualizer } from "../components/Visualizer";
import { RecordButton } from "../components/RecordButton";

const Dictate = () => {
  return (
    <div>
      <div>
        <Visualizer />
        <RecordButton />
      </div>
      <div></div>
    </div>
  );
};

export default Dictate;
