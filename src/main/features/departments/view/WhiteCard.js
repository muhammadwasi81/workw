import React from "react";

function WhiteCard({ children, className }) {
  return (
    <div className={"bg-white rounded-xl p-3 " + className}>{children}</div>
  );
}

export default WhiteCard;
