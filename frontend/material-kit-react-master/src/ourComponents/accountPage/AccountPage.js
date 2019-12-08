// Account Page where users check account info and change account info 

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "./CustomizedSnackbars";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import TextField from "@material-ui/core/TextField";
// core components
import Header from "components/Header/Header.js";
import Footer from "ourComponents/footer/Footer1";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks2 from "ourComponents/header/HeaderLinks2";
import Parallax from "components/Parallax/Parallax.js";
import image from "ourImages/profile.jpg";
import { Spin } from "antd";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function AccountPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const handleChange = name => event => {
    setUseraccountInfo({ ...useraccountInfo, [name]: event.target.value });
    console.log(useraccountInfo);
  };
  const [open, setOpen] = React.useState(false);
  const [useraccountInfo, setUseraccountInfo] = React.useState({
    userName: "",
    firstName: "",
    lastName: "",
    previousPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Change account info
  const Usernameinfo = () => {
    console.log(sessionStorage.getItem("token"));
    setLoading(true);
    var httpHeaders = new Headers();
    httpHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
    httpHeaders.append("Access-Control-Allow-Credentials", "true");
    httpHeaders.append("Content-Type", "application/json");
    httpHeaders.append("Accept", "application/json");
    httpHeaders.append("Authorization", sessionStorage.getItem("token"));

    const useraccountname = {
      userName: useraccountInfo.userName,
      firstName: useraccountInfo.firstName,
      lastName: useraccountInfo.lastName
    };

    var init = {
      method: "POST",
      mode: "cors",
      headers: httpHeaders,
      body: JSON.stringify(useraccountname)
    };

    fetch("http://127.0.0.1:5000/v1/accountSetting/changeUserInfo", init).then(
      res => {
        console.log("aaa");
        receive(res);
      }
    );
  };

  // change password
  const Userpassinfo = () => {
    console.log(sessionStorage.getItem("token"));
    setLoading(true);
    var httpHeaders = new Headers();
    httpHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
    httpHeaders.append("Access-Control-Allow-Credentials", "true");
    httpHeaders.append("Content-Type", "application/json");
    httpHeaders.append("Accept", "application/json");
    httpHeaders.append("Authorization", sessionStorage.getItem("token"));

    const useraccountpass = {
      previousPassword: useraccountInfo.previousPassword,
      newPassword: useraccountInfo.newPassword
    };

    var init = {
      method: "POST",
      mode: "cors",
      headers: httpHeaders,
      body: JSON.stringify(useraccountpass)
    };

    fetch("http://127.0.0.1:5000/v1/accountSetting/changePassword", init).then(
      res => {
        console.log("aaa");
        receive(res);
      }
    );
  };

  // check if previous password is correct
  function checkpass() {
    if (useraccountInfo.newPassword !== useraccountInfo.confirmPassword) {
      setMessage("The two passwords must match");
      setOpen(true);
      return;
    } else {
      Userpassinfo();
      Usernameinfo();
    }
  }
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function receive(res) {
    setLoading(false);
    if (res.status === 200) {
      res.json().then(body => {
        window.location.href = "/landing";
      });
    } else if (res.status === 400) {
      res.json().then(body => {
        setMessage(body["errorMessage"]);
        setOpen(true);
      });
    } else {
    }
  }

  // get current user info
  const Get_tempname = () => {
    console.log(sessionStorage.getItem("token"));

    var httpHeaders = new Headers();
    httpHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
    httpHeaders.append("Access-Control-Allow-Credentials", "true");
    httpHeaders.append("Content-Type", "application/json");
    httpHeaders.append("Accept", "application/json");
    httpHeaders.append("Authorization", sessionStorage.getItem("token"));

    var init = {
      method: "GET",
      mode: "cors",
      headers: httpHeaders
    };
    fetch("http://127.0.0.1:5000/v1/accountSetting/accountInfo", init).then(
      resv => {
        console.log("vvv");
        receive(resv);
      }
    );
  };

  Get_tempname();

  function receive(resv) {
    if (resv.status === 200) {
      resv.json().then(body => {
        setFirstName(body["firstName"]);

        setLastName(body["lastName"]);
        setUsertName(body["username"]);
      });
    } else if (resv.status === 400) {
      resv.json().then(body => {
        setMessage(body["errorMessage"]);
        setOpen(true);
      });
    } else {
    }
  }

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsertName] = React.useState("");

  return (
    <div>
      <Header
        fix
        absolute
        color="transparent"
        brand="RoomSeeker"
        rightLinks={<HeaderLinks2 />}
        homeLink="/landing"
      />

      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Spin spinning={loading}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img src={image} alt="..." className={imageClasses} />
                    </div>
                    <div className={classes.name}>
                      <h2>Change Account Info</h2>
                      <TextField
                        id="standard-uncontrolled"
                        label="Username"
                        value={username}
                        className={classes.textField}
                        margin="normal"
                        inputProps={{
                          onChange: handleChange("userName")
                        }}
                      />
                      <div>
                        <TextField
                          id="standard-uncontrolled"
                          label="First name"
                          value={firstName}
                          className={classes.textField}
                          margin="normal"
                          inputProps={{
                            onChange: handleChange("firstName")
                          }}
                        />
                        <TextField
                          id="standard-uncontrolled"
                          label="Last name"
                          value={lastName}
                          className={classes.textField}
                          margin="normal"
                          style={{ marginLeft: "50px" }}
                          inputProps={{
                            onChange: handleChange("lastName")
                          }}
                        />
                      </div>

                      <h2>Change Password</h2>
                      <TextField
                        id="standard-uncontrolled"
                        label="Previous password"
                        className={classes.textField}
                        margin="normal"
                        type="password"
                        inputProps={{
                          onChange: handleChange("previousPassword")
                        }}
                      />

                      <div>
                        <TextField
                          id="standard-uncontrolled"
                          label="New password"
                          className={classes.textField}
                          margin="normal"
                          type="password"
                          inputProps={{
                            onChange: handleChange("newPassword")
                          }}
                        />

                        <TextField
                          id="standard-uncontrolled"
                          label="Comfirm password"
                          className={classes.textField}
                          margin="normal"
                          type="password"
                          style={{ marginLeft: "50px" }}
                          inputProps={{
                            onChange: handleChange("confirmPassword")
                          }}
                        />
                      </div>
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={checkpass}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </Spin>
      </div>
      <Footer />
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
          message={message}
          onClose={handleClose}
        />
      </Snackbar>
    </div>
  );
}
