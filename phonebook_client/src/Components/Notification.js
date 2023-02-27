import React from "react";
import "./Notification.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }else{
    return <div className="notification">{message}</div>;
  }
};

export default Notification;
