import { CirclePause, Mic } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js";
import { TranscriptionServiceClient } from "./generated/your_service_grpc_web_pb"; // Import generated client
import {
  TranscriptionRequest,
  AudioMessage,
} from "./generated/your_service_pb"; // Import generated message types

export const RecordButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);
  const waveSurferRef = useRef(null);
  const RECORDING_MAX_DURATION = 240; // 4 minutes in seconds

  // Initialize gRPC client
  const grpcClient = new TranscriptionServiceClient("http://localhost:8080"); // Adjust to your server URL

  useEffect(() => {
    if (!waveSurferRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#007299",
        progressColor: "#56E0E0",
        cursorColor: "#FF0000",
        plugins: [
          MicrophonePlugin.create({
            bufferSize: 1024,
            numberOfInputChannels: 1,
            numberOfOutputChannels: 1,
            constraints: {
              audio: true,
            },
          }),
        ],
      });

      waveSurferRef.current.microphone.on("deviceReady", (stream) => {
        console.log("Device ready!", stream);
      });

      waveSurferRef.current.microphone.on("deviceError", (code) => {
        console.warn("Device error: ", code);
      });
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
    };
  }, []);

  const handleToggleRecording = (event) => {
    event.preventDefault();
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setAudioChunks([]);

    if (waveSurferRef.current && waveSurferRef.current.microphone) {
      waveSurferRef.current.microphone.start();
    }

    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => {
        if (prevTime >= RECORDING_MAX_DURATION - 1) {
          stopRecording();
          return RECORDING_MAX_DURATION;
        }
        return prevTime + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (waveSurferRef.current && waveSurferRef.current.microphone) {
      waveSurferRef.current.microphone.stop();
    }

    // Send recorded audio to gRPC server
    if (audioChunks.length > 0) {
      sendAudioStreamToGrpcServer(audioChunks);
    }
  };

  const sendAudioStreamToGrpcServer = (chunks) => {
    const stream = grpcClient.transcribe();

    // Metadata for the transcription request
    const language = "en-IN";
    const domain = "HEALTHCARE";
    const userId = uuidv4();

    chunks.forEach((chunk) => {
      const audioMessage = new AudioMessage();
      audioMessage.setContent(chunk);

      const request = new TranscriptionRequest();
      request.setAudio(audioMessage);
      request.setContext({ lang: language, domain: domain });
      request.setUser({ id: userId });
      request.setSession({ id: userId, end: false });

      stream.write(request);
    });

    stream.end();

    stream.on("data", (response) => {
      console.log(
        "Transcription Response:",
        response.getResult().getTranscription().getText()
      );
    });

    stream.on("error", (err) => {
      console.error("gRPC Error:", err);
    });

    stream.on("end", () => {
      console.log("Transcription stream ended.");
    });
  };

  return (
    <div>
      <button
        onClick={handleToggleRecording}
        className={`bg-white hover:opacity-80 text-white font-bold p-4 rounded-full border-8 border-[#ff0000]/20 shadow-xl`}
      >
        {isRecording ? (
          <>
            {/* Recording state: show pause icon */}
            <CirclePause size={32} className="text-red-600" />
          </>
        ) : (
          // Default state: show microphone icon
          <Mic size={32} className="text-blue-600" />
        )}
      </button>
      <div>
        <div id="waveform" className="mt-4"></div>
      </div>
    </div>
  );
};
