import { FormLabel, Input } from "@mui/material";
import { progressResponse } from "../lib/data";

const Progress = () => {
  return (
    <div className="mx-[200px]">
      <div className="bg-[#F4FEFF] text-center text-[18px] py-4 text-[#172048] font-semibold">
        PROGRESS Notes
      </div>
      <div>
        <div className="space-y-4">
          {Object.entries(progressResponse.response).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label htmlFor={key} className="capitalize text-[#172048]">
                {key.replace(/_/g, " ")}:
              </label>
              <textarea
                type="text"
                rows={4}
                id={key}
                value={value}
                readOnly
                className="w-full border border-[#628FBC] rounded p-2 text-[#628FBC]/90"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
