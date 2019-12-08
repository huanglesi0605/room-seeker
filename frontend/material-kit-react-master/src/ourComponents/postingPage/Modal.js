// posting success feedback

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

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function Modal(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => (window.location.href = "/order/myProperty")}
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
            onClick={() => (window.location.href = "/order/myProperty")}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          {/* <h4 className={classes.modalTitle}>Reserve this Property</h4> */}
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <GridContainer justify="center">
            <p>Congratulations! Your property has been successfully posted! </p>
          </GridContainer>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button
            type="button"
            color="warning"
            onClick={() => (window.location.href = "/order/myProperty")}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
