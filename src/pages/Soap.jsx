import React from 'react';
import { 
  Card, CardContent, CardHeader, 
  Typography, TextField, Button, 
  Box, Container, ThemeProvider, createTheme 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import { SoapResponse } from "../lib/data";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#00897b', // teal
    },
    secondary: {
      main: '#4db6ac', // light teal
    },
    background: {
      default: '#e0f2f1', // very light teal
    },
  },
});

const Soap = () => {
  const renderField = (key, value, depth = 0) => {
    const labelText = key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    if (typeof value === "object" && value !== null) {
      return (
        <Card key={key} variant="outlined" sx={{ mt: 2, ml: depth * 2 }}>
          <CardHeader 
            title={
              <Typography variant="h6" color="primary">
                {labelText}
              </Typography>
            } 
          />
          <CardContent>
            {Object.entries(value).map(([subKey, subValue]) =>
              renderField(subKey, subValue, depth + 1)
            )}
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Box key={key} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            {labelText}:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={value}
            multiline
            rows={value.length > 100 ? 4 : 2}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Card elevation={3}>
          <CardHeader 
            title={
              <Typography variant="h4" align="center" color="#ffffff" gutterBottom>
                SOAP Notes
              </Typography>
            }
            sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
          />
          <CardContent>
            {Object.entries(SoapResponse.response).map(([key, value]) =>
              renderField(key, value)
            )}
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}
          >
            Download
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Soap;