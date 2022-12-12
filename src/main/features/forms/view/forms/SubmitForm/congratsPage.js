import React from "react";
import BusinessLogo from "../../../../../../content/systemLogo.png";



export const MessagePage = ({ message }) => {
  return (
    <div style={{ margin: "auto", textAlign: "center", fontSize: "xx-large" }}>
       <div className="formCompanyLogo">
          <img style={{width: '8em'}} src={BusinessLogo} />
        </div>
      <h2 style={{ textTransform: "unset", fontWeight: "700" }}>{message}</h2>
    </div>
  );
};
