// search results sorting selection

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Grid from "@material-ui/core/Grid";
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

const nameToNum = {
  checkedA: "mark",
  checkedB: "price",
  checkedC: "popularity"
};
const numToName = {
  mark: "checkedA",
  price: "checkedB",
  popularity: "checkedC"
};

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false
  });

  function setDefault() {
    var sortBy = sessionStorage.getItem("sortBy");
    setState({ ...state, [numToName[sortBy]]: true });
  }

  React.useEffect(setDefault, []);

  const handleChange = name => event => {
    var st = {
      checkedA: false,
      checkedB: false,
      checkedC: false
    };
    setState({ ...st, [name]: event.target.checked });
    sessionStorage.setItem("sortBy", nameToNum[name]);
  };

  return (
    <Row>
      <Col span={3}>
        <h4 style={{ display: "inline", marginLeft: "40px", color: "orange" }}>
          <b>Sort By :</b>
        </h4>
      </Col>
      <Col span={5}>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.checkedA}
              onChange={handleChange("checkedA")}
              value="checkedA"
            />
          }
          label="rating"
          style={{ display: "inline", marginLeft: "50px" }}
        />
      </Col>
      <Col span={5}>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.checkedB}
              onChange={handleChange("checkedB")}
              value="checkedB"
            />
          }
          label="price"
          style={{ display: "inline", marginLeft: "50px" }}
        />
      </Col>
      <Col span={5}>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.checkedC}
              onChange={handleChange("checkedC")}
              value="checkedC"
            />
          }
          label="popularity"
          style={{ display: "inline", marginLeft: "50px" }}
        />
      </Col>
    </Row>
  );
}
