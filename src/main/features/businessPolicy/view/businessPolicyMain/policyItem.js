import React from "react";

export default function PolicyItem({ item, handleClick }) {
  console.log(item.name, "nammmmmmmmme");
  return (
    <div
      className="policycard cursor-pointer !flex !flex-row"
      onClick={() => handleClick(item)}
    >
      <div className="row flex-1 !w-max !mb-0">{item.name}</div>
      <div className="w-max mr-2">
        <div className="policyTag">
          {item.typeId === 1 ? "HR" : item.typeId === 2 ? "Other" : ""}
        </div>
      </div>
    </div>
  );
}
