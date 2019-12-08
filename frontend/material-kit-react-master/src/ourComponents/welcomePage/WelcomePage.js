// the index page, the page showed before login

import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header/Header.js";
import HeaderLinks1 from "ourComponents/header/HeaderLinks1";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HotelIcon from "@material-ui/icons/Hotel";
import Footer1 from "ourComponents/footer/Footer1";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function WelcomePage(props) {
  const classes = useStyles();
  return (
    <div>
      <Header
        brand="RoomSeeker"
        rightLinks={<HeaderLinks1 />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        homeLink="/"
      />
      <Parallax image={require("ourImages/sydney.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <HotelIcon fontSize="large" />
                <h1 className={classes.title}> RoomSeeker.</h1>
                <h3 className={classes.subtitle}>
                  Find a Place to Stay in Sydney.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer1 />
    </div>
  );
}
