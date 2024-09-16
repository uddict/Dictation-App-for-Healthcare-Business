import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Container,
  ThemeProvider,
  createTheme,
  Grid,
  Paper,
  Fade,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/system";
import MicIcon from "@mui/icons-material/Mic";
import WavesIcon from "@mui/icons-material/Waves";
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
});

const WaveAnimation = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& svg": {
    animation: "wave 1.5s infinite ease-in-out",
  },
  "@keyframes wave": {
    "0%, 100%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.2)",
    },
  },
});

const Dictate = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "linear-gradient(45deg, #3f51b5 0%, #00bcd4 100%)",
          minHeight: "100vh",
          py: 6,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Grid container spacing={4}>
              {/* Visualizer Card */}
              <Grid item xs={12} md={4}>
                <Zoom in={true} style={{ transitionDelay: "500ms" }}>
                  <GlassCard>
                    <CardContent
                      sx={{
                        height: 400,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5" color="primary" gutterBottom>
                        Audio Visualizer
                      </Typography>
                      <Paper
                        elevation={0}
                        sx={{
                          width: "100%",
                          height: 200,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          bgcolor: "transparent",
                        }}
                      >
                        <WaveAnimation>
                          <WavesIcon
                            color="primary"
                            style={{ fontSize: 100 }}
                          />
                        </WaveAnimation>
                      </Paper>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <RecordButton />
                        <Typography
                          variant="body2"
                          sx={{ mt: 1, fontStyle: "italic" }}
                        >
                          Click to start recording
                        </Typography>
                      </Box>
                    </CardContent>
                  </GlassCard>
                </Zoom>
              </Grid>

              {/* Transcription Card */}
              <Grid item xs={12} md={8}>
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
                    <CardContent>
                      <TextField
                        fullWidth
                        multiline
                        rows={14}
                        variant="outlined"
                        placeholder="Your transcription will appear here in real-time..."
                        sx={{
                          mb: 2,
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "background.paper",
                            "&:hover fieldset": {
                              borderColor: "secondary.main",
                            },
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
