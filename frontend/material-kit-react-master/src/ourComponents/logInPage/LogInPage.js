// The login page

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks1 from "ourComponents/header/HeaderLinks1";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Footer1 from "ourComponents/footer/Footer1";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "./CustomizedSnackbars";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

import { Link } from "react-router-dom";
import { Spin } from "antd";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = name => event => {
    setUserInfo({ ...userInfo, [name]: event.target.value });
  };

  const [loading, setLoading] = React.useState(false);

  // call login api
  const logIn = () => {
    setLoading(true);
    var httpHeaders = new Headers();
    httpHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
    httpHeaders.append("Access-Control-Allow-Credentials", "true");
    httpHeaders.append("Content-Type", "application/json");
    httpHeaders.append("Accept", "application/json");

    var init = {
      method: "POST",
      mode: "cors",
      headers: httpHeaders,
      body: JSON.stringify(userInfo)
    };

    console.log(JSON.stringify(userInfo));

    fetch("http://127.0.0.1:5000/v1/auth/login", init).then(res =>
      receive(res)
    );
  };

  //var open = false;

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // set tokens
  function receive(res) {
    setLoading(false);
    if (res.status === 200) {
      res.json().then(body => {
        sessionStorage.setItem("token", body["token"]);
        console.log(sessionStorage);
        window.location.href = "/landing";
      });
    } else if (res.status === 400) {
      res.json().then(body => {
        setMessage(body["errorMessage"]);
        setOpen(true);
      });
    } else {
      console.log("status code: " + res.status);
    }
  }

  const classes = useStyles();
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="RoomSeeker"
        rightLinks={<HeaderLinks1 />}
        homeLink="/"
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="warning" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <Spin spinning={loading}>
                    <CardBody>
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          onChange: handleChange("email")
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                          onChange: handleChange("password")
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="warning" size="lg" onClick={logIn}>
                        Get started
                      </Button>
                    </CardFooter>
                  </Spin>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer1 />
      </div>
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
