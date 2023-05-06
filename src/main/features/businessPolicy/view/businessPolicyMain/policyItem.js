import React from "react";
import { PolicyTypeEnum } from "./enum";

export default function PolicyItem({ item, handleClick }) {
  return (
    <div
      className="policycard cursor-pointer !flex !flex-row"
      onClick={() => handleClick(item)}
    >
      <div className="row flex-1 !w-max !mb-0">{item.name}</div>
      <div className="w-max mr-2">
        <div className="policyTag">
          {item.typeId === PolicyTypeEnum.HR
            ? "HR"
            : item.typeId === PolicyTypeEnum.Other
            ? "Other"
            : ""}
        </div>
      </div>
    </div>
  );
}
