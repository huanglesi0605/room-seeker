// pop-up box book the property

import React from "react";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "./CustomizedSnackbars";
import { Col, message, Spin } from "antd";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function BookingModal(props) {
  const { roomId, capacity, openDate, closeDate, enabled } = props;
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  const [bookingInfo, setBookingInfo] = React.useState({
    numOfGuests: "",
    checkInDate: "",
    checkOutDate: ""
  });

  const [open, setOpen] = React.useState(false);
  const [mess, setMess] = React.useState("");

  const handleChange = name => event => {
    setBookingInfo({ ...bookingInfo, [name]: event.target.value });
  };

  const handleReserve = () => {
    if (!bookingInfo.numOfGuests.match(/^\d+$/)) {
      alert("Please enter a positive integer as guest number!");
      return;
    }

    if (parseInt(bookingInfo.numOfGuests) > capacity) {
      alert("Your guest number exceeds the capacity of this property!");
      return;
    }

    if (
      bookingInfo.checkInDate.localeCompare(openDate) == -1 ||
      bookingInfo.checkOutDate.localeCompare(closeDate) == 1
    ) {
      alert("This property is not available during your period of stay.");
      return;
    }
    var httpHeaders = new Headers();
    httpHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
    httpHeaders.append("Access-Control-Allow-Credentials", "true");
    httpHeaders.append("Content-Type", "application/json");
    httpHeaders.append("Accept", "application/json");
    httpHeaders.append("Authorization", sessionStorage.getItem("token"));

    var init = {
      method: "POST",
      mode: "cors",
      headers: httpHeaders,
      body: JSON.stringify({
        roomId: parseInt(roomId),
        guests: parseInt(bookingInfo.numOfGuests),
        checkIn: bookingInfo.checkInDate,
        checkOut: bookingInfo.checkOutDate
      })
    };

    console.log(
      JSON.stringify({
        roomId: parseInt(roomId),
        guests: parseInt(bookingInfo.numOfGuests),
        checkIn: bookingInfo.checkInDate,
        checkOut: bookingInfo.checkOutDate
      })
    );

    fetch("http://127.0.0.1:5000/v1/order/createOrder", init).then(res =>
      receive(res)
    );
    setDisabled(true);
  };

  function receive(res) {
    if (res.status === 200) {
      setClassicModal(false);
      message.info("Your order is successfully submitted");

      var httpHeaders = new Headers();
      httpHeaders.append(
        "Access-Control-Allow-Origin",
        "http://127.0.0.1:5000"
      );
      httpHeaders.append("Access-Control-Allow-Credentials", "true");
      httpHeaders.append("Content-Type", "application/json");
      httpHeaders.append("Accept", "application/json");
      httpHeaders.append("Authorization", sessionStorage.getItem("token"));

      var init = {
        method: "GET",
        mode: "cors",
        headers: httpHeaders
      };

      fetch("http://127.0.0.1:5000/v1/order/myOrder", init).then(res => {
        receiveMyGuestOrder(res);
      });
    } else if (res.status === 400) {
      res.json().then(body => {
        setMess(body["errorMessage"]);
        setOpen(true);
      });
    }
    setDisabled(false);
  }

  function receiveMyGuestOrder(res) {
    if (res.status === 200) {
      res.json().then(body => {
        body.sort((a, b) => (a.status > b.status ? 1 : -1));
        sessionStorage.setItem("guestOrder", JSON.stringify(body));
        window.location.href = "/order/guestOrder";
      });
    }
  }

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
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

  const handleDateChange = name => date => {
    setSelectedDate(date);
    const dateString = date._d.yyyymmdd();
    setBookingInfo({ ...bookingInfo, [name]: dateString });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [disabled, setDisabled] = React.useState(false);

  return (
    <div>
      <Button
        color="warning"
        block
        onClick={() => setClassicModal(true)}
        disabled={!enabled}
      >
        <LibraryBooks className={classes.icon} />
        Reserve
      </Button>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={classicModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setClassicModal(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
        fullWidth={true}
        maxWidth="sm"
        scroll="body"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setClassicModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>Reserve this Property</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <Spin spinning={disabled}>
            <GridContainer justify="center">
              <GridItem>
                <CustomInput
                  labelText="number of guests"
                  id="material"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <People />
                      </InputAdornment>
                    ),
                    onChange: handleChange("numOfGuests")
                  }}
                ></CustomInput>
              </GridItem>
              <GridItem>
                <InputLabel className={classes.label}>
                  Check-In Date and Time
                </InputLabel>
                <br />
                <FormControl fullWidth>
                  <Datetime
                    onChange={handleDateChange("checkInDate")}
                    inputProps={{
                      placeholder: "Select your check-in date and time"
                    }}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <InputLabel className={classes.label}>
                  Check-Out Date and Time
                </InputLabel>
                <br />
                <FormControl fullWidth>
                  <Datetime
                    onChange={handleDateChange("checkOutDate")}
                    inputProps={{
                      placeholder: "Select your check-out date and time"
                    }}
                  />
                </FormControl>
              </GridItem>
            </GridContainer>
          </Spin>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button
            type="button"
            color="warning"
            onClick={handleReserve}
            disabled={disabled}
          >
            Reserve
          </Button>
          <Button onClick={() => setClassicModal(false)} color="warning" simple>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          variant="warning"
          className={classes.margin}
          message={mess}
          onClose={handleClose}
        />
      </Snackbar>
    </div>
  );
}
