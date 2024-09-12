import DownloadButton from "../components/DownloadButton";
import SaveButton from "../components/SaveButton";
import { progressResponse } from "../lib/data";

const Progress = () => {
  return (
    <div>
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
                  className="w-full bg-[#E9F6FE]/40 border border-[#628FBC] rounded p-2 text-[#628FBC]"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-10 py-5 items-center justify-center">
          <SaveButton />
          <DownloadButton />
        </div>
      </div>
    </div>
  );
};

export default Progress;
