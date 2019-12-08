// The card used  to display user's bookings
import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import image1 from "ourImages/fj1.jpg";
import { Link } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import { Col, Row } from "antd";

// change status display format
const statusDisplayed = {
  "1_pending": "pending",
  "2_waitForComment": "wait for reviews",
  "3_rejected": "rejected",
  "4_confirmed": "confirmed",
  "5_finished": "finished"
};

// define styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: "#FFA500"
    },
    cardActions: {
      // height: 40
    }
  })
);

export default function RecipeReviewCard(props) {
  const {
    title,
    description,
    price,
    propertyId,
    oneImage,
    checkIn,
    checkOut,
    guests,
    status,
    rating,
    review,
    orderId,
    setWishlist
  } = props;
  const [rt, setRt] = React.useState(rating);
  const [rv, setRv] = React.useState(review);
  const [st, setSt] = React.useState(status);
  
  // define date display format
  const display_checkIn =
    checkIn.substring(0, 4) +
    "-" +
    checkIn.substring(5, 7) +
    "-" +
    checkIn.substring(8, 10);
  const display_checkOut =
    checkOut.substring(0, 4) +
    "-" +
    checkOut.substring(5, 7) +
    "-" +
    checkOut.substring(8, 10);
  const initial = title.substring(0, 1);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // After user post a review
  function setReview(review, mark) {
    setRt(mark);
    setRv(review);
    setSt("5_finished");
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
    fetch("http://127.0.0.1:5000/v1/order/myOrder", init).then(res => {
      receiveMyGuestOrder(res);
    });
  }

  function receiveMyGuestOrder(res) {
    if (res.status === 200) {
      res.json().then(body => {
        body.sort((a, b) => (a.status > b.status ? 1 : -1));
        sessionStorage.setItem("guestOrder", JSON.stringify(body));
      });
    }
  }

  return (
    <Card className={classes.card} elevation={3}>
      <Link to={"/property/" + propertyId}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {initial}
            </Avatar>
          }
          title={title}
          subheader={"💲" + price + "/per night"}
          titleTypographyProps={{ color: "textPrimary", variant: "subtitle1" }}
        />
        <CardMedia
          className={classes.media}
          image={oneImage == "" ? image1 : oneImage}
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            check-in: {display_checkIn}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            check-out: {display_checkOut}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            guest number: {guests}
          </Typography>
          {rt == -1 ? null : (
            <Typography variant="body2" color="textPrimary" component="p">
              mark: {rt}
            </Typography>
          )}
          <Typography variant="body1" color="primary" component="b">
            status: {statusDisplayed[st]}
          </Typography>
        </CardContent>
      </Link>
      <CardActions className={classes.cardActions}>
        {st === "2_waitForComment" ? (
          <ReviewModal setReview={setReview} orderId={orderId} />
        ) : null}
        {st === "5_finished" ? (
          <span>
            show review
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </span>
        ) : null}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {rv}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
