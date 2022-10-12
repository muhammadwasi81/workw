import React, { useRef } from "react";
import building from "../../../../../content/png/building.jpg";

export default function Avatar({ onChange }) {
  const imageUrl = useRef();
  return (
    <>
      <input
        type={"file"}
        onChange={(e) => {
          // imageUrl.current.src = e.target.value;
          onChange(e);
        }}
        style={{ width: "100%" }}
        className="uploadbutton"
      />
      <img
        src={building}
        alt="avatar"
        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
      />
    </>
  );
}
