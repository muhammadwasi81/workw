import React, { useRef } from "react";

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
        src="https://konnect.im/static/media/world.f69f1142.svg"
        alt="avatar"
        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
      />
    </>
  );
}
