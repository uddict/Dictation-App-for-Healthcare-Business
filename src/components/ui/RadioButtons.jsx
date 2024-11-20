import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { FileArchive } from "lucide-react";
import axios from "axios";

export default function RadioButton({ transcription }) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const navigate = useNavigate();

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSave = async () => {
    const baseUrl = "http://10.168.131.232:31460/";
    if (selectedValue === "progress") {
      const progressResponse = await axios.post(
        `${baseUrl}/mediassist-ui/progress/`,
        transcription
      );
      if (soapResponse.status < 300) {
        navigate("/progress", { data: progressResponse.data });
      }
    } else if (selectedValue === "soap") {
      const soapResponse = await axios.post(
        `${baseUrl}/mediassist-ui/soap/`,
        transcription
      );
      if (soapResponse.status < 300) {
        navigate("/soap", { data: soapResponse.data });
      }
    }
  };

  return (
    <FormControl
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "right",
        gap: "100px",
      }}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedValue}
        onChange={handleRadioChange}
        style={{ marginTop: "15px" }}>
        <FormControlLabel
          value="progress"
          control={<Radio />}
          label="Progress"
        />
        <FormControlLabel value="soap" control={<Radio />} label="SOAP" />
      </RadioGroup>

      <button
        onClick={handleSave}
        disabled={!selectedValue}
        className="mt-4 bg-gradient-to-r from-[#79bcff] to-[#748bff] hover:shadow-md text-white font-semibold flex flex-row items-center gap-2.5 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed">
        <FileArchive size={20} />
        Extract
      </button>
    </FormControl>
  );
}
