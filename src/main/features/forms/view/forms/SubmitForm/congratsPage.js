import React from "react";

export const MessagePage = ({ message }) => {
  return (
    <div style={{ margin: "auto", textAlign: "center", fontSize: "xx-large" }}>
      <h2 style={{ textTransform: "unset", fontWeight: "700" }}>{message}</h2>
    </div>
  );
};
