// search property page

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// @material-ui/icons
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Grid from "@material-ui/core/Grid";
// core components
import Header from "components/Header/Header.js";
import Footer1 from "ourComponents/footer/Footer1";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import SearchIcon from "@material-ui/icons/Search";
import HeaderLinks2 from "ourComponents/header/HeaderLinks2";
import Parallax from "components/Parallax/Parallax.js";
import MaterialUIPickers from "./date.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";

import CheckboxLabels from "./guests.js";
import Pricerange from "./prices.js";
import Fundamental from "./infras.js";
import SortBy from "./sortBy";

import { Spin } from "antd";

import queryString from "query-string";

// Sections for this page
import TeamSection from "./TeamSection.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);
export default function SearchPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [searched, setSearched] = React.useState(
    sessionStorage.getItem("searchResults") === "" ? false : true
  );
  const [searchResults, setSearchResults] = React.useState(
    sessionStorage.getItem("searchResults") === ""
      ? null
      : JSON.parse(sessionStorage.getItem("searchResults"))
  );

  const [loading, setLoading] = React.useState(false);

  const handleChange = name => event => {
    sessionStorage.setItem(name, event.target.value);
    console.log(sessionStorage.getItem(name));
  };

  function search() {
    var httpHeaders = new Headers();
    httpHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
    httpHeaders.append("Access-Control-Allow-Credentials", "true");
    httpHeaders.append("Content-Type", "application/json");
    httpHeaders.append("Accept", "application/json");

    var httpBody = {
      searchbar: sessionStorage.getItem("keyword"),
      "check-in-date": sessionStorage.getItem("check-in"),
      "check-out-date": sessionStorage.getItem("check-out"),
      "guests-number": parseInt(sessionStorage.getItem("guest")),
      city: sessionStorage.getItem("city"),
      price: parseInt(sessionStorage.getItem("price")),
      parking: sessionStorage.getItem("parking") == "true",
      "air-conditioner":
        parseInt(sessionStorage.getItem("airCondition")) == "true",
      "wi-fi": parseInt(sessionStorage.getItem("wifi")) == "true",
      kitchen: parseInt(sessionStorage.getItem("kitchen")) == "true",
      sortBy: sessionStorage.getItem("sortBy")
    };

    var init = {
      method: "POST",
      mode: "cors",
      headers: httpHeaders,
      body: JSON.stringify(httpBody)
    };

    console.log(JSON.stringify(httpBody));

    fetch("http://127.0.0.1:5000/v1/search", init).then(res => receive(res));
    setLoading(true);
  }

  function receive(res) {
    //setLoading(false);
    if (res.status === 200) {
      res.json().then(body => {
        console.log(JSON.stringify(body));
        sessionStorage.setItem("searchResults", JSON.stringify(body));
        setSearchResults(body);
        setSearched(true);
        setLoading(false);
      });
    } else if (res.status === 400) {
      res.json().then(body => {
        console.log(body["errorMessage"]);
        //setMessage(body["errorMessage"]);
        //setOpen(true);
      });
    } else {
      console.log("status code: " + res.status);
    }
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="RoomSeeker"
        rightLinks={<HeaderLinks2 />}
        homeLink="/landing"
      />
      <Parallax filter image={require("ourImages/111.png")}>
        <div className={classes.container} style={{ backgroundColor: "white" }}>
          <GridContainer>
            <GridItem style={{ width: 1200, height: 400 }}>
              <center>
                <h2 className={classes.title} style={{ color: "black" }}>
                  Search a Property
                </h2>
              </center>
              <br />

              <Spin spinning={loading}>
                <Grid container justify="space-around">
                  <TextField
                    id="standard-uncontrolled"
                    label="City"
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange("city")}
                    defaultValue={sessionStorage.getItem("city")}
                  />
                  <MaterialUIPickers label="check-in date" name="check-in" />
                  <MaterialUIPickers label="check-out date" name="check-out" />
                  <TextField
                    id="standard-uncontrolled"
                    label="Key word"
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange("keyword")}
                    defaultValue={sessionStorage.getItem("keyword")}
                  />
                </Grid>

                <CheckboxLabels />

                <Pricerange />

                <Fundamental />

                <SortBy />
              </Spin>
              <center>
                <Button color="warning" round onClick={search}>
                  <SearchIcon /> Search
                </Button>
              </center>

              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <TeamSection searched={searched} searchResults={searchResults} />
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
