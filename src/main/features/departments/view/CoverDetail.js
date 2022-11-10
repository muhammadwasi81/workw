import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { BiWorld } from "react-icons/bi";
import WhiteCard from "./WhiteCard";
import moment from "moment";

function CoverDetail(props) {
  // console.log("cover details props", props);
  const { name, members, description, creator, createDate } = props.data;
  //TODO: add dynamic data when api respond proper data
  return (
    <WhiteCard className={"z-10 sticky top-0 w-full mt-[-87px] shadow-md"}>
      <div className="flex w-full justify-between text-base items-center">
        <div className="flex flex-col text-base">
          <span className="text-black text-base font-bold">{name && name}</span>
          <span className="text-gray-500 text-sm font-bold flex items-center gap-1">
            <BiWorld /> Create Date:{" "}
            {createDate && moment(createDate).format("DD/MM/YYYY")}
          </span>
        </div>
        <div></div>
        <div className="text-black text-base font-bold flex items-center gap-2">
          {/* <Popover content={`Created by: ${creator?.name}`}>
            <InfoCircleOutlined className="cursor-pointer" />

          </Popover> */}
          <span>
            {/* Created Date:{" "}
            {createDate && moment(createDate).format("DD/MM/YYYY")} */}
            Head Of Department :{" "}
            {creator?.designation.length > 1
              ? creator?.designation
              : "Not Assigned"}
          </span>

          {/* </Popover> */}
          <span>Created by: {creator?.name}</span>
        </div>
      </div>
    </WhiteCard>
  );
}

export default CoverDetail;
