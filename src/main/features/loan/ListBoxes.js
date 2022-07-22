import React from "react";

const ListBoxes = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "20px 0px 10px 0px",
      }}
    >
      <div
        style={{
          padding: "30px 50px",
          background: "rgb(229, 129, 21)",
          textAlign: "center",
          margin: "0px 10px",
          borderRadius: "10px",
        }}
      >
        <div>Total Amount</div>
        <div>500</div>
      </div>
      <div
        style={{
          padding: "30px 50px",
          background: "rgb(56, 132, 120)",
          textAlign: "center",
          margin: "0px 10px",
          borderRadius: "10px",
        }}
      >
        <div>Paid Amount</div>
        <div>0</div>
      </div>
      <div
        style={{
          padding: "30px 50px",
          background: "rgb(174, 19, 66)",
          textAlign: "center",
          margin: "0px 10px",
          borderRadius: "10px",
        }}
      >
        <div>Balance Amount</div>
        <div>500</div>
      </div>
    </div>
  );
};

export default ListBoxes;
