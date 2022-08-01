import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ChatIcon from "../../../content/NewContent/Sidebar/svg/Messenger.svg";
import { sideBarOpen } from "./store/sideBarChatSlice";
import { VideoCameraOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Typography } from "antd";
import { message } from "antd";
export const SideBarHead = () => {
  const dispatch = useDispatch();
  const isOpenChatBar = useSelector(
    (state) => state.sideBarChatSlice.sideBarChatStatus
  );
  const { user } = useSelector((state) => state.userSlice);

  const handleClick = () => {
    dispatch(sideBarOpen(!isOpenChatBar));
  };
  const menu = (
    <Menu
      selectable
      items={[
        {
          key: "1",
          label: "Create Room",
        },
        {
          key: "2",
          label: "Instant Call",
          onClick: async () => {
            try {
              const response = await fetch(
                "https://192.168.18.11:3300/api/createroomlink",
                {
                  method: "POST", // *GET, POST, PUT, DELETE, etc.
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    initializerName: user.name,
                    meetingType: "public",
                    receiverIds: [],
                  }),
                }
              );
              const { data } = await response.json();
              intilizeCallwindow(data);
            } catch (e) {
              message.error(e.message);
            }
          },
        },
      ]}
    />
  );
  const intilizeCallwindow = (response) => {
    const windowURL = `https://call.workw.com/${response.roomId}`;
    window.open(windowURL, "_blank").focus();
  };

  return (
    <div className="sideBarHead">
      <div className="headIcon">
        <img src={ChatIcon} alt="" onClick={handleClick} />
        <Dropdown overlay={menu}>
          <Typography.Link>
            <Space>
              <VideoCameraOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
      </div>

      <div className="myDivider"></div>
    </div>
  );
};

export default SideBarHead;
