// Card used to show users' host orders
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
import Button from "components/CustomButtons/Button.js";

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
    }
  })
);

const statusDisplayed = {
  "1_pending": "pending",
  "2_waitForComment": "wait for reviews",
  "3_rejected": "rejected",
  "4_confirmed": "confirmed",
  "5_finished": "finished"
};

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
    orderId
  } = props;
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
  const [status, setStatus] = React.useState(props.status);
  const initial = title.substring(0, 1);
  const classes = useStyles();

  // confirm or reject order
  function confirm(status1) {
    var httpHeaders = new Headers();
    httpHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
    httpHeaders.append("Access-Control-Allow-Credentials", "true");
    httpHeaders.append("Content-Type", "application/json");
    httpHeaders.append("Accept", "application/json");
    httpHeaders.append("Authorization", sessionStorage.getItem("token"));

    var init = {
      method: "POST",
      mode: "cors",
      headers: httpHeaders,
      body: JSON.stringify({ orderId: parseInt(orderId), confirmType: status1 })
    };

    fetch("http://127.0.0.1:5000/v1/confirmOrder", init);
    setStatus(status1);
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
          <Typography variant="body2" color="textSecondary" component="p">
            check-in: {display_checkIn}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            check-out: {display_checkOut}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            guest number: {guests}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing>
        {status === "1_pending" ? (
          <Button color="warning" onClick={() => confirm("4_confirmed")}>
            Confirm
          </Button>
        ) : (
          ""
        )}
        {status === "1_pending" ? (
          <Button color="warning" simple onClick={() => confirm("3_rejected")}>
            Reject
          </Button>
        ) : (
          ""
        )}
        status: {statusDisplayed[status]}
      </CardActions>
    </Card>
  );
}
