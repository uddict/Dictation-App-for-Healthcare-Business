import React, { useState, useEffect, useRef } from "react";
import { CirclePause, Mic } from "lucide-react";
import AudioAnalyser from "react-audio-analyser";

export const RecordButton = () => {
  const [status, setStatus] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);
  const RECORDING_MAX_DURATION = 240; // 4 minutes in seconds

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const controlAudio = (status) => {
    setStatus(status);
    if (status === "recording") {
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => {
          if (prevTime >= RECORDING_MAX_DURATION - 1) {
            setStatus("inactive");
            clearInterval(timerRef.current);
            return RECORDING_MAX_DURATION;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleToggleRecording = (event) => {
    event.preventDefault();
    if (status === "recording") {
      controlAudio("inactive");
    } else {
      controlAudio("recording");
    }
  };

  const audioProps = {
    audioType: "audio/wav",
    status: status,
    audioSrc: audioSrc,
    timeslice: 1000,
    startCallback: (e) => {
      console.log("succ start", e);
    },
    pauseCallback: (e) => {
      console.log("succ pause", e);
    },
    stopCallback: (e) => {
      setAudioSrc(window.URL.createObjectURL(e));
      console.log("succ stop", e);
    },
    onRecordCallback: (e) => {
      console.log("recording", e);
    },
    errorCallback: (err) => {
      console.log("error", err);
    },
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-[100px]">
      <div className="w-full min-h-[190px] flex items-center justify-center max-w-md bg-gradient-to-r from-[#9DCEFF]/30 to-[#92A3FD]/30 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
        <AudioAnalyser
          {...audioProps}
          backgroundColor="transparent"
          strokeColor="#6781ff"
          className="w-full h-32"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <div>
          <button
            onClick={handleToggleRecording}
            className="bg-gradient-to-r from-[#80bfff] to-[#738aff] hover:opacity-80 text-white font-bold p-4 rounded-full shadow-xl shadow-purple-200 mb-4 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {status === "recording" ? (
              <CirclePause size={32} className="text-red-600" />
            ) : (
              <Mic size={32} className="text-white" />
            )}
          </button>
          {/* <div className="text-lg font-semibold mb-2 text-center bg-gradient-to-r from-[#5badff] to-[#6781ff] bg-clip-text text-transparent">
          {formatTime(recordingTime)}
        </div> */}
        </div>
        <button className="bg-gradient-to-r from-[#80bfff] to-[#738aff] hover:opacity-80 text-white font-bold px-6 py-1.5 rounded-md mb-4 hover:scale-105">
          Stop Recording
        </button>
      </div>
    </div>
  );
};
