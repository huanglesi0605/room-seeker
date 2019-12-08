// chatbot page

import React from "react";
//import { Input } from 'antd';
import { Button } from "antd";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import HeaderLinks2 from "ourComponents/header/HeaderLinks2";
import Footer from "ourComponents/footer/Footer1";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import image from "ourImages/ai.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

function Chat_bot() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  
  // initial contents in the dialog box
  const [content, setContent] = React.useState(
    <div>
      <h3>Sample questions that I can answer:</h3>
      <h4>Can you recommend a room in Sydney?</h4>
      <h4>What's the average price for a house in Sydney?</h4>
      <h4>
        What's the average price for a house in Sydney with a capacity of 4
        people?
      </h4>
      <h4>How many available house in Sydney from 2019-11-1 to 2019-11-4 ?</h4>
      <h4>How can I change my password? </h4>
      <h4>How do I check the orders of my properties? </h4>
      <br />
      <h4>
        <b>Robot</b> : Hi! what can I help you ?{" "}
      </h4>
    </div>
  );

  // show user questions in the dialog 
  function handleClick() {
    if (document.getElementById("text").value.length == 0) {
      alert("输入为空！");
      document.getElementById("text").focus();
      return false;
    }

    var TalkWords = document.getElementById("text");
    var Words = document.getElementById("words");
    var str = "";
    str = "<h4><b>You</b>: " + TalkWords.value + "</h4>";
    Words.innerHTML = Words.innerHTML + str;

    getAnswer(TalkWords.value);

    document.getElementById("text").value = "";
  }

  // call chatbox api
  function getAnswer(TalkWords) {
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
      body: JSON.stringify({
        utterance: TalkWords
      })
    };

    console.log(
      JSON.stringify({
        utterance: TalkWords
      })
    );

    fetch("http://127.0.0.1:5000/v1/chatbot", init).then(res => receive(res));

    // receive chatbot answer, display in the dialog box
    function receive(res) {
      console.log(res.status);
      if (res.status === 200) {
        res.json().then(body => {
          console.log(body);
          var Words = document.getElementById("words");
          var str = "";
          str = "<h4><b>Bot</b>: " + body.answer + "</h4>";
          Words.innerHTML = Words.innerHTML + str;
        });
      }
    }
  }

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
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={24} sm={24} md={24}>
                <div className={classes.profile}>
                  <div>
                    <img src={image} alt="..." className={imageClasses} />
                  </div>

                  <div className={classes.name}>
                    <div
                      style={{
                        width: 1100,
                        height: 600,
                        backgroundColor: "white",
                        marginLeft: "0px",
                        paddingLeft: "0px",
                        paddingRight: "10px",
                        paddingTop: "10px"
                      }}
                    >
                      <div
                        style={{
                          width: 1100,
                          height: 500,
                          overflow: "auto",
                          backgroundColor: "white",
                          paddingLeft: "0px",
                          paddingRight: "0px",
                          paddingTop: "10px",
                          border: "inset",
                          textAlign: "left"
                        }}
                        id="words"
                      >
                        {content}
                      </div>
                      <br />
                      <div style={{ display: "inline" }}>
                        <input
                          id="text"
                          type="text"
                          placeholder="Enter your question"
                          style={{ width: 600 }}
                        />
                        <Button
                          type="primary"
                          style={{ marginLeft: "16px" }}
                          onClick={handleClick}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chat_bot;
