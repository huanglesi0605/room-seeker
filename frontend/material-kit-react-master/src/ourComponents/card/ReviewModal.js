//the button and modal used to write reviews

import React from "react";
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
import CustomInput from "components/CustomInput/CustomInput.js";
import { message } from "antd";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function BookingModal(props) {
  const { orderId, setReview } = props;
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  const [reviewInfo, setReviewInfo] = React.useState({
    review: "",
    mark: 0
  });

  // get mark and reviews from user input
  const handleChange = name => event => {
    setReviewInfo({ ...reviewInfo, [name]: event.target.value });
    console.log(reviewInfo);
  };

  // post review to the database
  const handleReserve = () => {
    if (!reviewInfo.mark.match(/^\d+$/)) {
      alert("Please enter an integer between 0 and 5 as mark!");
      return;
    }

    var httpHeaders = new Headers();
    httpHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
    httpHeaders.append("Access-Control-Allow-Credentials", "true");
    httpHeaders.append("Content-Type", "application/json");
    httpHeaders.append("Accept", "application/json");
    httpHeaders.append("Authorization", sessionStorage.getItem("token"));

    console.log(sessionStorage.getItem("token"));

    var init = {
      method: "POST",
      mode: "cors",
      headers: httpHeaders,
      body: JSON.stringify({
        review: reviewInfo.review,
        mark: parseInt(reviewInfo.mark),
        orderId: orderId.toString()
      })
    };

    console.log(
      JSON.stringify({
        review: reviewInfo.review,
        mark: parseInt(reviewInfo.mark),
        orderId: orderId.toString()
      })
    );

    fetch("http://127.0.0.1:5000/v1/Review/writeReview", init);

    setReview(reviewInfo.review, reviewInfo.mark);

    setClassicModal(false);

    message.info("Review is submitted successfully.");
  };

  return (
    <div>
      <Button color="warning" onClick={() => setClassicModal(true)}>
        <LibraryBooks className={classes.icon} />
        Review
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
          <h4 className={classes.modalTitle}>Review this Property</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <GridContainer justify="center">
            <GridItem>
              <CustomInput
                labelText="your marks(out of 5)"
                id="material"
                formControlProps={{
                  fullWidth: true,
                  onChange: handleChange("mark")
                }}

                // inputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <People />
                //     </InputAdornment>
                //   )
                // }}
              ></CustomInput>
            </GridItem>
            <GridItem>
              <CustomInput
                labelText="comments"
                id="material"
                formControlProps={{
                  fullWidth: true,
                  onChange: handleChange("review")
                }}
                // inputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <People />
                //     </InputAdornment>
                //   )
                // }}
              ></CustomInput>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button type="button" color="warning" onClick={handleReserve}>
            Submit Review
          </Button>
          <Button onClick={() => setClassicModal(false)} color="warning" simple>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
