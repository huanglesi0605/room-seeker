// the header displayed at the top of every page after login

import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import Button from "components/CustomButtons/Button.js";
import Notifica from "./Notifica";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import HomeIcon from "@material-ui/icons/Home";
import AdbIcon from "@material-ui/icons/Adb";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks2(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button simple>
          <Notifica />
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="I'm a host"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={HomeIcon}
          dropdownList={[
            <Link to="/posting" className={classes.dropdownLink}>
              List a New Property
            </Link>,
            <Link to="/order/myProperty" className={classes.dropdownLink}>
              My Properties
            </Link>,
            <Link to="/order/hostOrder" className={classes.dropdownLink}>
              My Orders
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="I'm a guest"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={FlightTakeoffIcon}
          dropdownList={[
            <Link to="/search" className={classes.dropdownLink}>
              Find a property
            </Link>,
            <Link to="/order/guestOrder" className={classes.dropdownLink}>
              My Bookings
            </Link>,
            <Link to="/order/recommendation" className={classes.dropdownLink}>
              Recommendation
            </Link>,
            <Link to="/order/wishlist" className={classes.dropdownLink}>
              My Wishlist
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button href="/chatbot" color="transparent" className={classes.navLink}>
          {/* <CloudDownload className={classes.icons} />  */}
          <AdbIcon />
          Chatbot
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button href="/account" color="transparent" className={classes.navLink}>
          {/* <CloudDownload className={classes.icons} />  */}
          <AccountCircleIcon />
          My Account
        </Button>
      </ListItem>
    </List>
  );
}
