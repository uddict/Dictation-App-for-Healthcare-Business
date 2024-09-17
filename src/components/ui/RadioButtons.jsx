import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { FileArchive } from "lucide-react";

export default function RadioButton() {
  const [selectedValue, setSelectedValue] = React.useState("");
  const navigate = useNavigate();

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSave = () => {
    if (selectedValue === "progress") {
      navigate("/progress");
    } else if (selectedValue === "soap") {
      navigate("/soap");
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
      }}
    >
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedValue}
        onChange={handleRadioChange}
        style={{ marginTop: "15px" }}
      >
        <FormControlLabel
          value="progress"
          control={<Radio />}
          label="Progress"
        />
        <FormControlLabel value="soap" control={<Radio />} label="SOAP" />
      </RadioGroup>

      <Button
        variant="contained"
        // color="#11B3CF"
        onClick={handleSave}
        disabled={!selectedValue}
        style={{
          marginTop: "16px",
          background: "#03A9F4",
          fontWeight: "semibold",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FileArchive size={20} />
        Extract
      </Button>
    </FormControl>
  );
}
