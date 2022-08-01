import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ChatIcon from "../../../content/NewContent/Sidebar/svg/Messenger.svg";
import { sideBarOpen } from "./store/sideBarChatSlice";
import { VideoCameraOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal, Space, Typography } from "antd";
import { message } from "antd";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import CreateRoom from "../calling/components/createRoom/CreateRoom";
import { sideChatBarList } from "./localization";
export const SideBarHead = () => {
  const dispatch = useDispatch();
  const isOpenChatBar = useSelector(
    (state) => state.sideBarChatSlice.sideBarChatStatus
  );
  const { user } = useSelector((state) => state.userSlice);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { createRoom, instantCall } = sideChatBarList[userLanguage];
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    dispatch(sideBarOpen(!isOpenChatBar));
  };
  const menu = (
    <Menu
      selectable
      items={[
        {
          key: "1",
          label: createRoom,
          onClick: () => setVisible(true),
        },
        {
          key: "2",
          label: instantCall,
          onClick: async () => {
            try {
              const response = await fetch(
                "https://call.workw.com/api/createroomlink",
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
    window.open(
      windowURL,
      "_blank",
      "toolbar=1, scrollbars=1, resizable=1, width=" + 1015 + ", height=" + 800
    );
    // window.open(windowURL, "_blank").focus();
  };

  return (
    <>
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
      <Modal
        title=""
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={null}
      >
        <CreateRoom />
      </Modal>
    </>
  );
};

export default SideBarHead;
