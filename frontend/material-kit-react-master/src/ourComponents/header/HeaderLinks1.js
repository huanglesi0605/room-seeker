// Header displayed at the top of welcome page, login page and signup page

/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons

import Icon from "@mdi/react";
import { mdiAccountPlus, mdiLoginVariant } from "@mdi/js";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks1(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button href="/login" color="transparent" className={classes.navLink}>
          <Icon path={mdiLoginVariant} size={1} color="white" />
          Log In
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button href="/signup" color="transparent" className={classes.navLink}>
          <Icon path={mdiAccountPlus} size={1} color="white" />
          Sign Up
        </Button>
      </ListItem>
    </List>
  );
}
