import { CirclePause, Mic } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export const RecordButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveSurfer, setWaveSurfer] = useState(null); // Add WaveSurfer state
  const timerRef = useRef(null);
  const waveSurferRef = useRef(null); // Ref for WaveSurfer container
  const RECORDING_MAX_DURATION = 240; // 4 minutes in seconds

  useEffect(() => {
    // Initialize WaveSurfer
    if (!waveSurferRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: "#waveform", // WaveSurfer container element
        waveColor: "#007299", // Wave color
        progressColor: "#56E0E0", // Progress color
        cursorColor: "#FF0000", // Cursor color
        backend: "MediaElement", // Use MediaElement for live recording
        mediaControls: false, // No default media controls
      });
      setWaveSurfer(waveSurferRef.current);
    }

    if (!audioStream) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setAudioStream(stream);
          const mediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(mediaRecorder);
          let audio;

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audio = [event.data];
            }
          };

          mediaRecorder.onstop = (event) => {
            const b = new Blob(audio, { type: "audio/wav" });
            setAudioBlob(b);
            console.log("audioBlob", b);

            // Load audio blob to WaveSurfer for playback
            waveSurfer.load(URL.createObjectURL(b));
          };
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy(); // Clean up WaveSurfer on component unmount
      }
    };
  }, [audioStream]);

  const handleToggleRecording = (event) => {
    event.preventDefault();
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);
    setAudioBlob(null);
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => {
        if (prevTime >= RECORDING_MAX_DURATION - 1) {
          stopRecording();
          return RECORDING_MAX_DURATION;
        }
        return prevTime + 1;
      });
    }, 1000);

    // Add audio stream to WaveSurfer for real-time visualization
    waveSurfer.microphone.start();
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Stop WaveSurfer microphone input
    waveSurfer.microphone.stop();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <button
        onClick={handleToggleRecording}
        className={`bg-gradient-to-r from-[#80bfff] to-[#738aff] hover:opacity-80 text-white font-bold p-4 rounded-full shadow-2xl shadow-purple-900`}
      >
        {isRecording ? (
          <>
            {/* Recording state: show pause icon */}
            <CirclePause size={32} className="text-red-400" />
          </>
        ) : (
          // Default state: show microphone icon
          <Mic size={32} className="text-white" />
        )}
      </button>
      <div>
        {/* Waveform container */}
        <div id="waveform" className="mt-4"></div>
      </div>
    </div>
  );
};
