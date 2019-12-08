/*
  required infrasctructure selection  in search property page
*/

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Col, Row } from "antd";

const GreenCheckbox = withStyles({
  root: {
    color: orange[400],
    "&$checked": {
      color: orange[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

export default function Fundamental() {
  const [state, setState] = React.useState({
    parking: sessionStorage.getItem("parking") == "true",
    kitchen: sessionStorage.getItem("kitchen") == "true",
    airCondition: sessionStorage.getItem("airCondition") == "true",
    wifi: sessionStorage.getItem("wifi") == "true"
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    sessionStorage.setItem(name, event.target.checked);
    console.log(name);
    console.log(sessionStorage.getItem(name));
  };

  return (
    <Row>
      <Col span={3}>
        <h4 style={{ display: "inline", marginLeft: "40px", color: "orange" }}>
          <b>Infrastructure:</b>
        </h4>
      </Col>
      <Col span={5}>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.parking}
              onChange={handleChange("parking")}
              value="parking"
            />
          }
          // label={
          //     <div>
          //         <Icon path={mdiParking} size={1} color="red" />
          //         </div>
          // }
          label="Parking"
          style={{ display: "inline", marginLeft: "50px" }}
        />
      </Col>
      <Col span={5}>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.airCondition}
              onChange={handleChange("airCondition")}
              value="airCondition"
            />
          }
          label="Air conditioner"
          style={{ display: "inline", marginLeft: "50px" }}
        />
      </Col>
      <Col span={5}>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.wifi}
              onChange={handleChange("wifi")}
              value="wifi"
            />
          }
          label="Wi-Fi"
          style={{ display: "inline", marginLeft: "50px" }}
        />
      </Col>
      <Col span={6}>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.kitchen}
              onChange={handleChange("kitchen")}
              value="kitchen"
            />
          }
          label="Kitchen"
          style={{ display: "inline", marginLeft: "50px" }}
        />
      </Col>
    </Row>
  );
}
