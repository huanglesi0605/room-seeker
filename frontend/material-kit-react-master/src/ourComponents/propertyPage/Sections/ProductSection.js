// display property details, including title, description, price, capacity, available dates, address

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

import Icon from "@mdi/react";
import {
  mdiParking,
  mdiFridgeOutline,
  mdiAirConditioner,
  mdiWifi
} from "@mdi/js";
import { Rate } from "antd";
import { Descriptions, Tooltip } from "antd";
import { Receipt } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function ProductSection(props) {
  const classes = useStyles();

  const {
    propertyId,
    setDescription,
    setLocation,
    setPhotos,
    setC,
    setOD,
    setCD,
    setEnableReserve
  } = props;

  const [cap, setCap] = React.useState("");
  const [title, setTit] = React.useState("");
  const [city, setCity] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [add, setAdd] = React.useState("");
  const [mark, setMark] = React.useState(0);
  const [openDate, setOpenDate] = React.useState("");
  const [closeDate, setCloseDate] = React.useState("");

  const [size1, setSize1] = React.useState(0);
  const [size2, setSize2] = React.useState(0);
  const [size3, setSize3] = React.useState(0);
  const [size4, setSize4] = React.useState(0);

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

    fetch("http://127.0.0.1:5000/v1/property/info", init).then(res =>
      Receipt(res)
    );
  };

  function Receipt(res) {
    if (res.status === 200) {
      res.json().then(body => {
        console.log(body);
        setCap(body.guests);
        setC(body.guests);
        setTit(body.title);
        setCity(body.city);
        setPrice(body.price);
        setAdd(body.address);
        setMark(body.mark);
        if (body.airConditioner == true) {
          setSize3(1);
        } else {
          setSize3(0);
        }
        if (body.parking == true) {
          setSize1(1);
        } else {
          setSize1(0);
        }
        if (body.kitchen == true) {
          setSize2(1);
        } else {
          setSize2(0);
        }
        if (body.wifi == true) {
          setSize4(1);
        } else {
          setSize4(0);
        }
        setDescription(body.description);
        setLocation(body.address);
        setPhotos(body.photos);
        setOpenDate(
          body.openDate.substring(0, 4) +
            "-" +
            body.openDate.substring(5, 7) +
            "-" +
            body.openDate.substring(8, 10)
        );
        setOD(body.openDate);
        setCloseDate(
          body.closeDate.substring(0, 4) +
            "-" +
            body.closeDate.substring(5, 7) +
            "-" +
            body.closeDate.substring(8, 10)
        );
        setCD(body.closeDate);
        setEnableReserve(true);
      });
    }
  }

  React.useEffect(() => {
    popDet();
    popDet();
  }, []);

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <h2 className={classes.title}>Property Detail</h2>
          <br />
          <Descriptions title="" bordered size="small" column={3}>
            <Descriptions.Item
              span={1}
              label={
                <span style={{ fontSize: 20 }}>
                  <b>Title</b>
                </span>
              }
            >
              <p style={{ fontSize: 20 }}>{title}</p>
            </Descriptions.Item>
            <Descriptions.Item
              span={1}
              label={
                <span style={{ fontSize: 20 }}>
                  <b>City</b>
                </span>
              }
            >
              <p style={{ fontSize: 20 }}>{city}</p>
            </Descriptions.Item>
            <Descriptions.Item
              span={1}
              label={
                <span style={{ fontSize: 20 }}>
                  <b>Capacity</b>
                </span>
              }
            >
              <p style={{ fontSize: 20 }}>{cap}</p>
            </Descriptions.Item>

            <Descriptions.Item
              span={1}
              label={
                <span style={{ fontSize: 20 }}>
                  <b>Price</b>
                </span>
              }
            >
              <p style={{ fontSize: 20 }}>${price}</p>
            </Descriptions.Item>

            <Descriptions.Item
              span={1}
              label={
                <span style={{ fontSize: 20 }}>
                  <b>Available from</b>
                </span>
              }
            >
              <p style={{ fontSize: 20 }}>{openDate}</p>
            </Descriptions.Item>
            <Descriptions.Item
              span={1}
              label={
                <span style={{ fontSize: 20 }}>
                  <b>Available to</b>
                </span>
              }
            >
              <p style={{ fontSize: 20 }}>{closeDate}</p>
            </Descriptions.Item>
            <Descriptions.Item
              span={1}
              label={
                <span style={{ fontSize: 20 }}>
                  <b>Amenities</b>
                </span>
              }
            >
              <Tooltip title="parking">
                <Icon path={mdiParking} size={size1} color="red" />
              </Tooltip>
              <Tooltip title="kitchen">
                <Icon path={mdiFridgeOutline} size={size2} color="red" />
              </Tooltip>
              <Tooltip title="air conditioner">
                <Icon path={mdiAirConditioner} size={size3} color="red" />
              </Tooltip>
              <Tooltip title="Wifi">
                <Icon path={mdiWifi} size={size4} color="red" />
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item
              span={2}
              label={
                <span style={{ fontSize: 20 }}>
                  <b>Address</b>
                </span>
              }
            >
              <p style={{ fontSize: 20 }}>{add}</p>
            </Descriptions.Item>
          </Descriptions>
        </GridItem>
      </GridContainer>
      <br />
      <div>
        <Rate
          disabled
          value={mark}
          allowHalf
          tooltips={[
            "rating: " + mark,
            "rating: " + mark,
            "rating: " + mark,
            "rating: " + mark,
            "rating: " + mark
          ]}
        />
      </div>
    </div>
  );
}
