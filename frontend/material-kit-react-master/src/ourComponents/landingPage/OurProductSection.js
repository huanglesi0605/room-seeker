// The main body part of landing page

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Hotel from "@material-ui/icons/Hotel";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import { Link } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s get started!</h2>
          <h5 className={classes.description}>
            {/* This is the paragraph where you can write more details about your
            product. Keep you user engaged by providing meaningful information.
            Remember that by this time, the user is curious, otherwise he wouldn
            {"'"}t scroll to get here. Add a button if you want the user to see 
            more.*/}
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Link to="/posting">
              <InfoArea
                title="Become a host"
                // description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={Face}
                iconColor="info"
                vertical
              />
            </Link>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Link to="/search">
              <InfoArea
                title="Search your property"
                //description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={Hotel}
                iconColor="success"
                vertical
              />
            </Link>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Link to="/account">
              <InfoArea
                title="Manage your account"
                //description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={SupervisorAccountIcon}
                iconColor="danger"
                vertical
              />
            </Link>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
