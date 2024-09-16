import React from "react";
// import { Visualizer } from "../components/Visualizer";
import { RecordButton } from "../components/RecordButton";
import RadioButton from "../components/ui/RadioButtons";

const Dictate = () => {
  return (
    <div>
      <div className="flex flex-row justify-between px-10 py-6 border rounded bg-[url('./assets/Transcriptionbg.jpeg')] bg-no-repeat bg-cover h-full">
        <div className="w-[350px] max-h-[600px] rounded-md p-10 flex flex-col justify-between items-center bg-[#E9F6FE]">
          {/* <Visualizer /> */}
          <div>WaveSurfer UI</div>
          <div className="flex flex-col items-center gap-4">
            <RecordButton />
            <div>Click on mic to start..</div>
          </div>
        </div>
        <div className="w-[850px] max-h-[600px] flex flex-col items-center gap-[40px] bg-[#E9F6FE] rounded-md">
          <div className="bg-[#BCEFFF] text-center p-3 w-full text-[24px] font-semibold text-[#172048] rounded-t-md">
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
            <RadioButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictate;
