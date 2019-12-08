// infrasctructure input in posting page

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

export default function Fundamental() {
  const [state, setState] = React.useState({
    parking: false,
    kitchen: false,
    airCondition: false,
    wifi: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    localStorage.setItem(name, event.target.checked);
    console.log(name);
    console.log(localStorage.getItem(name));
  };
  return (
    <div>
      <h4 style={{ display: "inline", colour: "black" }}>
        <b>Infrastructure :</b>
      </h4>
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={state.parking}
            onChange={handleChange("parking")}
            value="checkedA"
          />
        }
        // label={
        //     <div>
        //         <Icon path={mdiParking} size={1} color="red" />
        //         </div>
        // }
        label="Parking"
        style={{ display: "inline", marginLeft: "10px" }}
      />

      <FormControlLabel
        control={
          <GreenCheckbox
            checked={state.airCondition}
            onChange={handleChange("airCondition")}
            value="checkedB"
          />
        }
        label="Air conditioner"
        style={{ display: "inline", marginLeft: "10px" }}
      />

      <FormControlLabel
        control={
          <GreenCheckbox
            checked={state.wifi}
            onChange={handleChange("wifi")}
            value="checkedC"
          />
        }
        label="Wi-Fi"
        style={{ display: "inline", marginLeft: "10px" }}
      />

      <FormControlLabel
        control={
          <GreenCheckbox
            checked={state.kitchen}
            onChange={handleChange("kitchen")}
            value="checkedD"
          />
        }
        label="Kitchen"
        style={{ display: "inline", marginLeft: "10px" }}
      />
    </div>
  );
}
