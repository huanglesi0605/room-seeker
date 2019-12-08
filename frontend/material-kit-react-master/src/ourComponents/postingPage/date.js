// date inputs in posting page
import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState({
    availableFrom: new Date("2019-11-01T21:11:54"),
    availableTo: new Date("2022-08-18T21:11:54")
  });

  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [
      this.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd
    ].join(",");
  };

  const handleDateChange = name => date => {
    setSelectedDate({ ...selectedDate, [name]: date });
    const dateString = date.yyyymmdd();
    localStorage.setItem(name, dateString);
    console.log(localStorage.getItem(name));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="available from"
        value={selectedDate.availableFrom}
        onChange={handleDateChange("availableFrom")}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
        style={{ colour: "white" }}
      />

      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="To "
        value={selectedDate.availableTo}
        onChange={handleDateChange("availableTo")}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
        style={{ colour: "white" }}
      />
    </MuiPickersUtilsProvider>
  );
}
