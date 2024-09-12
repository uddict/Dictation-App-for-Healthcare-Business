import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedValue}
        onChange={handleRadioChange}
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
          background: "#11B3CF",
          fontWeight: "semibold",
        }}
      >
        Extract
      </Button>
    </FormControl>
  );
}
