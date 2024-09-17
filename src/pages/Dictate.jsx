import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Container,
  ThemeProvider,
  createTheme,
  Grid,
  Fade,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/system";
import WaveSurfer from "wavesurfer.js";
import { RecordButton } from "../components/RecordButton";
import RadioButton from "../components/ui/RadioButtons";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // indigo
    },
    secondary: {
      main: "#00bcd4", // cyan
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
          },
        },
      },
    },
  },
});

const GlassCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  height: "100%", // Ensure full height
  display: "flex",
  flexDirection: "column",
});

const Dictate = () => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#4F56DB",
      progressColor: "#383351",
      cursorColor: "#383351",
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 1,
      height: 200,
      barGap: 3,
    });

    return () => wavesurferRef.current.destroy();
  }, []);

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
        wavesurferRef.current.load(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Start real-time waveform update
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateWaveform = () => {
        if (isRecording) {
          analyser.getByteTimeDomainData(dataArray);
          wavesurferRef.current.loadDecodedBuffer(dataArray);
          requestAnimationFrame(updateWaveform);
        }
      };
      updateWaveform();
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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "#F4FEFF",
          minHeight: "90vh",
          py: 6,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Grid container spacing={4} sx={{ height: "600px" }}>
              {" "}
              {/* Set a fixed height */}
              {/* Visualizer Card */}
              <Grid item xs={12} md={4} sx={{ height: "100%" }}>
                <Zoom in={true} style={{ transitionDelay: "500ms" }}>
                  <GlassCard>
                    <CardHeader
                      title="Audio Visualizer"
                      sx={{
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        textAlign: "center",
                        py: 2,
                      }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        
                      }}
                    >
                      <Box
                        ref={waveformRef}
                        sx={{ width: "100%", height: "200px" }}
                      />
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <RecordButton
                          onClick={handleRecordToggle}
                          isRecording={isRecording}
                        />
                        <Typography
                          variant="body2"
                          sx={{ mt: 1, fontStyle: "italic" }}
                        >
                          {isRecording
                            ? "Recording..."
                            : "Click to start recording"}
                        </Typography>
                      </Box>
                    </CardContent>
                  </GlassCard>
                </Zoom>
              </Grid>
              {/* Transcription Card */}
              <Grid item xs={12} md={8} sx={{ height: "100%" }}>
                <Zoom in={true} style={{ transitionDelay: "700ms" }}>
                  <GlassCard>
                    <CardHeader
                      title="Real-Time Transcription"
                      sx={{
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        textAlign: "center",
                        py: 2,
                      }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        fullWidth
                        multiline
                        rows={14}
                        variant="outlined"
                        value={transcription}
                        onChange={(e) => setTranscription(e.target.value)}
                        placeholder="Your transcription will appear here in real-time..."
                        sx={{
                          mb: 2,
                          flexGrow: 1,
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "background.paper",
                            // "&:hover fieldset": {
                            //   borderColor: "secondary.main",
                            // },
                          },
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 2,
                        }}
                      >
                        <RadioButton />
                      </Box>
                    </CardContent>
                  </GlassCard>
                </Zoom>
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Dictate;
