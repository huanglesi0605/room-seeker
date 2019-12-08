/**
 * check-in and check-out date input in search property page
 */

//import 'date-fns';
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from "prop-types";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import CustomInput from "components/CustomInput/CustomInput.js";

export default function MaterialUIPickers(props) {
  const { label, name } = props;
  // The first commit of Material-UI

  const dateStringZero = sessionStorage.getItem(name);
  const dateStringDash =
    dateStringZero.substring(0, 4) +
    "-" +
    dateStringZero.substring(5, 7) +
    "-" +
    dateStringZero.substring(8, 10);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(dateStringDash)
  );

  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [
      this.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd
    ].join("0");
  };

  const handleChange = name => date => {
    setSelectedDate(date);
    const dateString = date.yyyymmdd();
    sessionStorage.setItem(name, dateString);
    console.log(sessionStorage.getItem(name));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={label}
        value={selectedDate}
        onChange={handleChange(name)}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
        style={{ colour: "white" }}
      />
    </MuiPickersUtilsProvider>
  );
}
