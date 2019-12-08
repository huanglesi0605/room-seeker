// property page that shows all relevant information about a property, and allow users to book this property

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import RoomMap from "./Sections/googleMap.js";
// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer1 from "ourComponents/footer/Footer1";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks2 from "ourComponents/header/HeaderLinks2";
import Parallax from "components/Parallax/Parallax.js";
import BookingModal from "./BookingModal";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";

import SectionCarousel from "./Sections/SectionCarousel.js";
import { Tabs, Rate, List } from "antd";
import { fontSize } from "@material-ui/system";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function PropertyPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const { propertyId } = props.match.params;

  const [comment, setComment] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [photos, setPhotos] = React.useState([]);
  const [capacity, setCapacity] = React.useState();
  const [openDate, setOpenDate] = React.useState();
  const [closeDate, setCloseDate] = React.useState();
  const [enableReserve, setEnableReserve] = React.useState(false);

  const popDet = () => {
    var httpHeaders = new Headers();
    httpHeaders.append("Access-Control-Allow-Origin", "http://127.0.0.1:5000");
    httpHeaders.append("Access-Control-Allow-Credentials", "true");
    httpHeaders.append("Content-Type", "application/json");
    httpHeaders.append("Accept", "application/json");

    var init = {
      method: "POST",
      mode: "cors",
      headers: httpHeaders,
      body: JSON.stringify({ propertyId: parseInt(propertyId) })
    };

    fetch("http://127.0.0.1:5000/v1/property/reviews", init).then(res =>
      Receipt(res)
    );
  };

  function Receipt(res) {
    if (res.status === 200) {
      res.json().then(body => {
        console.log(body);
        setComment(body);
      });
    }
  }

  React.useEffect(() => popDet(), []);

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="RoomSeeker"
        rightLinks={<HeaderLinks2 />}
        homeLink="/landing"
      />
      <Parallax filter image={require("ourImages/111.jpg")}>
        <div className={classes.container}>
          <SectionCarousel photos={photos} />
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection
            propertyId={propertyId}
            setDescription={setDescription}
            setLocation={setLocation}
            setPhotos={setPhotos}
            setC={setCapacity}
            setOD={setOpenDate}
            setCD={setCloseDate}
            setEnableReserve={setEnableReserve}
          />

          <Tabs defaultActiveKey="1" onChange={callback} size="large">
            <TabPane tab="Description" key="1">
              <p style={{ fontSize: 20 }}>{description}</p>
            </TabPane>
            <TabPane tab="Location" key="2">
              <div style={{ marginLeft: 200 }}>
                {/* <RoomMap roomAddress={localStorage.getItem("location")} /> */}
                <RoomMap roomAddress={location} />
              </div>
            </TabPane>
            <TabPane tab="Comment" key="3">
              <List
                bordered
                dataSource={comment}
                renderItem={item => (
                  <List.Item>
                    <Rate disabled defaultValue={item.mark} />
                    {item.review}
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>

          <br />
          <br />
          <BookingModal
            roomId={propertyId}
            capacity={capacity}
            openDate={openDate}
            closeDate={closeDate}
            enabled={enableReserve}
          />
          <br />
          <br />
          <br />
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
