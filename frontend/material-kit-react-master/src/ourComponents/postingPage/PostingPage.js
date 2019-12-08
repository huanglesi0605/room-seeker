// the page to post properties

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import TextField from "@material-ui/core/TextField";
// core components
import CustomizedSelects from "./guestnum.js";
import Header from "components/Header/Header.js";
import HeaderLinks2 from "ourComponents/header/HeaderLinks2";
import Footer from "ourComponents/footer/Footer1";
import Fundamental from "./infras.js";

import Avatar from "./uploadimg.js";

import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import cartoonHouse from "ourImages/cartoon_house.jpg";
import Grid from "@material-ui/core/Grid";
import Modal from "./Modal";
import MaterialUIPickers from "./date.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Row, Col, Spin } from "antd";
const useStyles = makeStyles(styles);

export default function PostingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const [loading, setLoading] = React.useState(false);

  localStorage.setItem("parking", false);
  localStorage.setItem("airCondition", false);
  localStorage.setItem("wifi", false);
  localStorage.setItem("kitchen", false);
  localStorage.setItem("availableFrom", "2019011001");
  localStorage.setItem("availableTo", "2022008018");

  const [modalOpen, setModalOpen] = React.useState(false);

  // handle click apply button
  function apply() {
    var key;
    
    // check whether all user inputs are legal or not
    for (key in roomInfo) {
     
      if (roomInfo[key] === "") {
        if (key == "number") {
          key = "guest number";
        }
        alert("Please enter " + key + "!");
        return;
      }
    }

    if (!roomInfo.price.match(/^\d+$/)) {
      alert("Please enter a positive integer as price!");
      return;
    }

    if (!roomInfo.number.match(/^\d+$/)) {
      alert("Please enter a positive integer as guest number!");
      return;
    }

    setLoading(true);

    // post to database
    var httpHeaders = new Headers();
    httpHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
    httpHeaders.append("Access-Control-Allow-Credentials", "true");
    httpHeaders.append("Content-Type", "application/json");
    httpHeaders.append("Accept", "application/json");
    httpHeaders.append("Authorization", sessionStorage.getItem("token"));

    var photos = [];
    var i;
    for (i = 0; i < 5; i++) {
      if (localStorage.getItem("image" + i)) {
        photos.push(localStorage.getItem("image" + i));
      }
    }

    var init = {
      method: "POST",
      mode: "cors",
      headers: httpHeaders,
      body: JSON.stringify({
        title: roomInfo.title,
        description: roomInfo.description,
        address: roomInfo.address,
        city: roomInfo.city,
        openDate: localStorage.getItem("availableFrom"),
        closeDate: localStorage.getItem("availableTo"),
        price: parseInt(roomInfo.price),
        guests: parseInt(roomInfo.number),
        parking: localStorage.getItem("parking") == "true",
        airConditioner: localStorage.getItem("airCondition") == "true",
        wifi: localStorage.getItem("wifi") == "true",
        kitchen: localStorage.getItem("kitchen") == "true",
        photos: photos
      })
    };

    console.log(
      JSON.stringify({
        title: roomInfo.title,
        description: roomInfo.description,
        address: roomInfo.address,
        city: roomInfo.city,
        openDate: localStorage.getItem("availableFrom"),
        closeDate: localStorage.getItem("availableTo"),
        price: parseInt(roomInfo.price),
        guests: parseInt(roomInfo.number),
        parking: localStorage.getItem("parking") == "true",
        airConditioner: localStorage.getItem("airCondition") == "true",
        wifi: localStorage.getItem("wifi") == "true",
        kitchen: localStorage.getItem("kitchen") == "true",
        photos: photos
      })
    );

    fetch("http://127.0.0.1:5000/v1/property/information", init).then(res =>
      receive(res)
    );
  }

  // receive response, show post success message. Add to my property list
  function receive(res) {
    console.log(res.status);
    setLoading(false);
    if (res.status === 200) {
      res.json().then(body => {
        var myProperty = JSON.parse(sessionStorage.getItem("myProperty"));

        myProperty.unshift({
          title: roomInfo.title,
          description: roomInfo.description,
          price: parseInt(roomInfo.price),
          oneImage: localStorage.getItem("image0"),
          id: body.roomId
        });

        sessionStorage.setItem("myProperty", JSON.stringify(myProperty));
      });

      setModalOpen(true);
    }
  }

  const [roomInfo, setRoomInfo] = React.useState({
    city: "",
    title: "",
    address: "",
    description: "",
    price: "",
    number: ""
  });

  const handleChange = name => event => {
    setRoomInfo({ ...roomInfo, [name]: event.target.value });
    console.log(roomInfo);
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="RoomSeeker"
        rightLinks={<HeaderLinks2 />}
        homeLink="/landing"
      />

      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={cartoonHouse}
                      alt="..."
                      className={imageClasses}
                    />
                  </div>

                  <Spin spinning={loading}>
                    <div
                      className={classes.name}
                      style={{ width: 650, marginLeft: 230 }}
                    >
                      <h3 style={{ textAlign: "center" }}>
                        Where is your house :
                      </h3>
                      <TextField
                        id="standard-uncontrolled"
                        label="City"
                        className={classes.textField}
                        margin="normal"
                        inputProps={{
                          onChange: handleChange("city")
                        }}
                      />
                      <h3 style={{ textAlign: "center" }}>Address :</h3>

                      <TextField
                        id="standard-full-width"
                        label="Address"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          onChange: handleChange("address")
                        }}
                      />

                      <h3 style={{ textAlign: "center" }}>House Title :</h3>
                      <TextField
                        id="standard-uncontrolled"
                        label="Title"
                        className={classes.textField}
                        margin="normal"
                        inputProps={{
                          onChange: handleChange("title")
                        }}
                      />
                      <h3 style={{ textAlign: "center" }}>
                        House Description :
                      </h3>
                      <TextField
                        id="standard-full-width"
                        label="Description"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          onChange: handleChange("description")
                        }}
                      />

                      <br />

                      <br />

                      <center>
                        <h3>period of validity :</h3>
                      </center>
                      <Grid container justify="space-around">
                        <MaterialUIPickers />
                      </Grid>

                      <h3 style={{ textAlign: "center" }}>
                        Set your house price :
                      </h3>
                      <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="standard-adornment-amount">
                          Amount
                        </InputLabel>
                        <Input
                          id="standard-adornment-amount"
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          inputProps={{
                            onChange: handleChange("price")
                          }}
                        />
                      </FormControl>
                      <br />

                      {/* <h3 style={{ textAlign: "center" }}>
                      How many people can fit in your house :
                    </h3>
                    <CustomizedSelects /> */}
                      <h3 style={{ textAlign: "center" }}>
                        How many people can fit in your house :
                      </h3>
                      <TextField
                        id="standard-uncontrolled"
                        label="Guest Number"
                        className={classes.textField}
                        margin="normal"
                        inputProps={{
                          onChange: handleChange("number")
                        }}
                      />
                      <Fundamental />
                      <br />
                      <h4 style={{ textAlign: "center" }}>
                        You can upload up to 5 photos :
                      </h4>
                      <Row gutter={24}>
                        <Col span={4}>
                          <Avatar index={0} />
                        </Col>
                        <Col span={4}>
                          <Avatar index={1} />
                        </Col>
                        <Col span={4}>
                          <Avatar index={2} />
                        </Col>
                        <Col span={4}>
                          <Avatar index={3} />
                        </Col>
                        <Col span={4}>
                          <Avatar index={4} />
                        </Col>
                      </Row>

                      <br />
                      <Button
                        variant="contained"
                        color="warning"
                        className={classes.button}
                        onClick={apply}
                      >
                        Apply
                      </Button>
                    </div>
                  </Spin>
                </div>
              </GridItem>
            </GridContainer>
            <Modal open={modalOpen} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
