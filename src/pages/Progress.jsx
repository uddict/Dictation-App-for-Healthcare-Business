import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Box,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import { progressResponse } from "../lib/data";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // indigo
    },
    secondary: {
      main: "#7986cb", // light indigo
    },
    background: {
      default: "#e8eaf6", // very light indigo
    },
  },
});

const Progress = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [progressData, setProgressData] = useState(data);

  const handleInputChange = (key, value) => {
    setProgressData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        sx={{ py: 4, bgcolor: "background.default", minHeight: "100vh" }}>
        <Card elevation={3}>
          <CardHeader
            title={
              <Typography
                variant="h4"
                align="center"
                color="#ffffff"
                gutterBottom>
                Progress Notes
              </Typography>
            }
            sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}
          />
          <CardContent>
            {Object.entries(progressData).map(([key, value]) => (
              <Box key={key} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                  :
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </Box>
            ))}
          </CardContent>
        </Card>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 2 }}>
          <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}>
            Download
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Progress;
