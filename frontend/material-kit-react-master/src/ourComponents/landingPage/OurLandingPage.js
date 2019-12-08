// the home page displayed after login, after click on title

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer1 from "ourComponents/footer/Footer1";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
import HeaderLinks2 from "ourComponents/header/HeaderLinks2";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./OurProductSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  sessionStorage.setItem("searchResults", "");
  sessionStorage.setItem("city", "");
  sessionStorage.setItem("check-in", "2019011015");
  sessionStorage.setItem("check-out", "2019011015");
  sessionStorage.setItem("keyword", "");
  sessionStorage.setItem("guest", 0);
  sessionStorage.setItem("price", 0);
  sessionStorage.setItem("parking", false);
  sessionStorage.setItem("kitchen", false);
  sessionStorage.setItem("airCondition", false);
  sessionStorage.setItem("wifi", false);
  sessionStorage.setItem("sortBy", "");
  const classes = useStyles();
  const { ...rest } = props;

  sessionStorage.setItem("myProperty", []);
  sessionStorage.setItem("hostOrder", []);
  sessionStorage.setItem("guestOrder", []);
  sessionStorage.setItem("recommendation", []);
  sessionStorage.setItem("like", []);
  sessionStorage.setItem("wishlist", []);

  // get wishlist
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

  fetch("http://127.0.0.1:5000/v1/account/myWishlist", init).then(res =>
    receive(res)
  );

  // set wishlist
  function receive(res) {
    if (res.status === 200) {
      res.json().then(body => {
        var like = body.map(x => x.id);
        sessionStorage.setItem("like", JSON.stringify(like));
        sessionStorage.setItem("wishlist", JSON.stringify(body));
      });
    }
  }

  // get my properties and orders
  const getOrders = () => {
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

    fetch("http://127.0.0.1:5000/v1/host/myPost", init).then(res => {
      receiveMyProperty(res);
    });
    fetch("http://127.0.0.1:5000/v1/order/myHostOrder", init).then(res => {
      receiveMyHostOrder(res);
    });
    fetch("http://127.0.0.1:5000/v1/order/myOrder", init).then(res => {
      receiveMyGuestOrder(res);
    });
    fetch("http://127.0.0.1:5000/v1/account/myRecommendation", init).then(
      res => {
        receiveMyRecommendation(res);
      }
    );
  };

  // receive api responses. set corresponding session storage
  function receiveMyProperty(res) {
    if (res.status === 200) {
      res.json().then(body => {
        body.reverse();
        sessionStorage.setItem("myProperty", JSON.stringify(body));
      });
    }
  }
  function receiveMyHostOrder(res) {
    if (res.status === 200) {
      res.json().then(body => {
        body.sort((a, b) => (a.status > b.status ? 1 : -1));
        sessionStorage.setItem("hostOrder", JSON.stringify(body));
      });
    }
  }
  function receiveMyGuestOrder(res) {
    if (res.status === 200) {
      res.json().then(body => {
        body.sort((a, b) => (a.status > b.status ? 1 : -1));
        sessionStorage.setItem("guestOrder", JSON.stringify(body));
      });
    }
  }
  function receiveMyRecommendation(res) {
    if (res.status === 200) {
      res.json().then(body => {
        sessionStorage.setItem("recommendation", JSON.stringify(body));
      });
    }
  }

  React.useEffect(() => getOrders(), []);

  return (
    <div>
      <Header
        fixed
        color="transparent"
        brand="RoomSeeker"
        rightLinks={<HeaderLinks2 />}
        homeLink="/landing"
        changeColorOnScroll={{
          height: 100,
          color: "white"
        }}
      />
      <Parallax filter image={require("ourImages/sydney.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                {/* Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression. */}
              </h4>
              <br />
              {/* <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              > */}
              {/* <i className="fas fa-play" />
                Watch video
              </Button> */}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          {/* <TeamSection />
          <WorkSection /> */}
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
