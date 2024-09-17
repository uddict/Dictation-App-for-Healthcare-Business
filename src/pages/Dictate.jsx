import React, { useRef, useState } from "react";
import { RecordButton } from "../components/RecordButton";
import RadioButton from "../components/ui/RadioButtons";

const Dictate = () => {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");

  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        // Perform any necessary action with audioUrl
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="bg-[#F4FEFF] h-[90vh] w-screen flex justify-center items-center py-6">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 h-[600px]">
          {/* Visualizer Card */}
          <div className="min-w-[300px] md:min-w-[500px] bg-white bg-opacity-80 backdrop-blur-md border border-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
            <div className="bg-indigo-600 text-white text-center py-2 rounded-md">
              <h2 className="text-xl font-semibold">Audio Recorder</h2>
            </div>
            <div className="mt-2 flex flex-col items-center">
              <RecordButton
                onClick={handleRecordToggle}
                isRecording={isRecording}
              />
              <p className="mt-1 italic text-sm">
                {isRecording ? "Recording..." : "Click to start recording"}
              </p>
            </div>
          </div>

          {/* Transcription Card */}
          <div className="min-w-[400px] md:w-[600px] bg-white bg-opacity-80 backdrop-blur-md border border-white rounded-lg shadow-lg p-6 flex flex-col h-full">
            <div className="bg-indigo-600 text-white text-center py-2 rounded-md">
              <h2 className="text-xl font-semibold">Real-Time Transcription</h2>
            </div>
            <textarea
              className="w-full h-full mt-4 p-4 bg-white border border-gray-300 rounded-lg resize-none"
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              placeholder="Your transcription will appear here in real-time..."
            />
            <div className="flex justify-center mt-4">
              <RadioButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictate;
