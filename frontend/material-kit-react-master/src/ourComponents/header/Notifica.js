// the notification button in header

import { Button, notification } from "antd";
import React from "react";
import ReactDOM from "react-dom";

import { Badge, Icon, Spin } from "antd";

function Notice() {
  const [loading, setLoading] = React.useState(false);

  const close = () => {
    console.log(
      "Notification was closed. Either the close button was clicked or duration time elapsed."
    );
  };

  // display notifications
  const openNotification = (messages, first) => {
    const key = `open${Date.now()}`;

    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        OK
      </Button>
    );

    if (!first && messages.length === 0) {
      notification.open({
        message: "New Notifications",
        description: "No new notifications.",
        key,
        onClose: close,
        duration: 0,
        top: 150
      });
      return;
    }

    if (!first && messages.length > 0) {
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
        method: "GET",
        mode: "cors",
        headers: httpHeaders
      };

      // get updated orders
      fetch("http://127.0.0.1:5000/v1/order/myHostOrder", init).then(res => {
        receiveMyHostOrder(res);
      });
      fetch("http://127.0.0.1:5000/v1/order/myOrder", init).then(res => {
        receiveMyGuestOrder(res);
      });
    }

    // display each messages
    messages.forEach(element => {
      if (element.messageType === "1_pending") {
        notification.open({
          message: "New Notifications",
          description:
            'You have a new order. Please go to "I\'m a Host" -> "My Order" to confirm.',
          btn,
          key,
          onClose: close,
          duration: 0,
          top: 24
        });
      }
      if (element.messageType === "2_waitForComment") {
        notification.open({
          message: "New Notifications",
          description:
            'You have a completed order. Please go to "I\'m a Guest" -> "My Bookings" to write reviews.',
          btn,
          key,
          onClose: close,
          duration: 0,
          top: 24
        });
      }
      if (element.messageType === "4_confirmed") {
        notification.open({
          message: "New Notifications",
          description:
            'Your ordered is confirmed by the host. Please go to "I\'m a Guest" -> "My Bookings" to check.',
          btn,
          key,
          onClose: close,
          duration: 0
        });
      }
      if (element.messageType === "3_rejected") {
        notification.open({
          message: "New Notifications",
          description:
            'Your ordered is denied by the host. Please go to "I\'m a Guest" -> "My Bookings" to check.',
          btn,
          key,
          onClose: close,
          duration: 0
        });
      }
    });
  };

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

  // get messages
  const getMessages = first => () => {
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

    setLoading(true);
    fetch("http://127.0.0.1:5000/v1/message", init).then(res =>
      receive(res, first)
    );
  };

  function receive(res, first) {
    setLoading(false);
    if (res.status === 200) {
      res.json().then(body => {
        console.log(body);
        openNotification(body, first);
        setLoading(false);
      });
    }
  }

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return (
    <Spin spinning={loading} indicator={antIcon}>
      <Badge onClick={getMessages(false)}>
        <Icon style={{ fontSize: "20px" }} type="bell" />
      </Badge>
    </Spin>
  );
}
export default Notice;
