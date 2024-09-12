import React from "react";
// import { Visualizer } from "../components/Visualizer";
import { RecordButton } from "../components/RecordButton";
import RadioButton from "../components/ui/RadioButtons";

const Dictate = () => {
  return (
    <div>
      <div className="flex flex-row justify-between mx-[50px] h-[600px] p-10 mt-[60px] border rounded">
        <div className="border-2 w-[350px]  rounded-md p-10 flex flex-col justify-between items-center ">
          {/* <Visualizer /> */}
          <div>WaveSurfer UI</div>
          <div className="flex flex-col items-center gap-4">
            <RecordButton />
            <div>Click on mic to start..</div>
          </div>
        </div>
        <div className="border-2 w-[750px] flex flex-col items-center gap-[40px] bg-[#E9F6FE] rounded-md">
          <div className="bg-[#BCEFFF] text-center p-3 w-full text-[24px] font-semibold text-[#172048]">
            Transcription
          </div>
          <textarea
            className="border-2 border-slate-300 w-[650px] rounded-md p-2"
            placeholder="Transciption will appear here.."
            name=""
            id=""
            rows={16}
          ></textarea>
          <div className="flex flex-row gap-10 mb-5">
            <button className="bg-[#11B3CF] px-5 rounded text-white font-semibold">
              Save
            </button>
            <RadioButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictate;
