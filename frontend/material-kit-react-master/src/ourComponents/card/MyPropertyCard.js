// The card used to display user's properties
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
import Typography from "@material-ui/core/Typography";
import image1 from "ourImages/fj1.jpg";
import { Link } from "react-router-dom";

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
    cardContent: {
      height: 160
    },
    cardActions: {
      background: "white"
    }
  })
);

export default function NormalCard(props) {
  const { title, description, price, propertyId, oneImage } = props;
  const initial = title.substring(0, 1);
  const classes = useStyles();
  const [like, setLike] = React.useState(
    JSON.parse(sessionStorage.getItem("like"))
  );
  const [heartColor, setHeartColor] = React.useState(
    like.includes(propertyId) ? "secondary" : "default"
  );

  // handle click like button
  const handleClickLike = () => {
    
    // add to wishlist
    if (heartColor === "default") {
      setHeartColor("secondary");
      var newLike = like.concat([propertyId]);
      setLike(newLike);
      sessionStorage.setItem("like", JSON.stringify(newLike));

      var wishlist = JSON.parse(sessionStorage.getItem("wishlist"));
      wishlist.unshift({
        title: title,
        price: price,
        description: description,
        id: propertyId,
        oneImage: oneImage
      });
      sessionStorage.setItem("wishlist", wishlist);

      var httpHeaders = new Headers();
      httpHeaders.append(
        "Access-Control-Allow-Origin",
        "http://127.0.0.1:5000"
      );
      httpHeaders.append("Access-Control-Allow-Credentials", "true");
      httpHeaders.append("Content-Type", "application/json");
      httpHeaders.append("Accept", "application/json");
      httpHeaders.append("Authorization", sessionStorage.getItem("token"));

      var init = {
        method: "POST",
        mode: "cors",
        headers: httpHeaders,
        body: JSON.stringify({ roomId: propertyId })
      };

      fetch("http://127.0.0.1:5000/v1/account/putWish", init);
      
    // cancel like
    } else if (heartColor === "secondary") {
      setHeartColor("default");
      var newLike = like.filter(function(value, index, arr) {
        return value != propertyId;
      });
      setLike(newLike);
      sessionStorage.setItem("like", JSON.stringify(newLike));

      var wishlist = JSON.parse(sessionStorage.getItem("wishlist"));
      wishlist = wishlist.filter(function(value, index, arr) {
        return value.id != propertyId;
      });
      sessionStorage.setItem("wishlist", wishlist);

      var httpHeaders = new Headers();
      httpHeaders.append(
        "Access-Control-Allow-Origin",
        "http://127.0.0.1:5000"
      );
      httpHeaders.append("Access-Control-Allow-Credentials", "true");
      httpHeaders.append("Content-Type", "application/json");
      httpHeaders.append("Accept", "application/json");
      httpHeaders.append("Authorization", sessionStorage.getItem("token"));

      var init = {
        method: "POST",
        mode: "cors",
        headers: httpHeaders,
        body: JSON.stringify({ roomId: propertyId })
      };

      fetch("http://127.0.0.1:5000/v1/account/removeWish", init);
    }
  };

  return (
    <Link to={"/property/" + propertyId}>
      <Card className={classes.card} elevation={3}>
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
          image={oneImage === "" ? image1 : oneImage}
          title={title}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            align="justify"
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
