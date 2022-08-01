import { List, message } from "antd";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import Avatar from "../Avatar/avatarOLD";
import "./style.css";
import { CloseCircleOutlined } from "@ant-design/icons";

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = "400";

const MemberList = (props) => {
  return (
    <List>
      <VirtualList
        className="MemberList"
        data={props.data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        // onScroll={onScroll}
      >
        {(item, index) => (
          <List.Item key={item.members[0].id}>
            <List.Item.Meta
              avatar={
                <Avatar
                  width={30}
                  height={30}
                  round
                  src={item.members[0].image}
                />
              }
              title={<a href="">{item.members[0].name}</a>}
              description={item.members[0].email}
            />
            <div
              style={{
                color: "var(--primary_theme_color_green)",
                fontWeight: 700,
              }}
            >
              {item.memberType === 1
                ? "Employee"
                : item.memberType === 2
                ? "Admin"
                : item.memberType === 3
                ? "Sub Head Of Department"
                : ""}{" "}
            </div>
            <div className="IconDiv">
              <CloseCircleOutlined
                className="text-xl"
                onClick={() => props.onRemove(item, index)}
              />
            </div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default MemberList;
