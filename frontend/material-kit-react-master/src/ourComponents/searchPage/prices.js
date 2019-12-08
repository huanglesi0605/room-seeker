// price range selection in search property page

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
import { Row, Col } from "antd";
const GreenCheckbox = withStyles({
  root: {
    color: orange[400],
    "&$checked": {
      color: orange[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const nameToNum = { checkedA: 1, checkedB: 2, checkedC: 3, checkedD: 4 };
const numToName = {
  1: "checkedA",
  2: "checkedB",
  3: "checkedC",
  4: "checkedD"
};

export default function Pricerange() {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false
  });

  function setDefault() {
    var price = parseInt(sessionStorage.getItem("price"));
    if (price > 0) {
      setState({ ...state, [numToName[price]]: true });
    }
  }

  React.useEffect(setDefault, []);

  const handleChange = name => event => {
    var st = {
      checkedA: false,
      checkedB: false,
      checkedC: false,
      checkedD: false
    };
    setState({ ...st, [name]: event.target.checked });

    sessionStorage.setItem("price", nameToNum[name]);
    console.log(sessionStorage.getItem("price"));
  };

  return (
    <Row>
      <Col span={3}>
        <h4 style={{ display: "inline", marginLeft: "40px", color: "orange" }}>
          <b>Price :</b>
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
          label="$0 - $100"
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
          label="$100 - $200"
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
          label="$200 - $300"
          style={{ display: "inline", marginLeft: "50px" }}
        />
      </Col>
      <Col span={6}>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.checkedD}
              onChange={handleChange("checkedD")}
              value="checkedD"
            />
          }
          label="more than $300"
          style={{ display: "inline", marginLeft: "50px" }}
        />
      </Col>
    </Row>
  );
}
