import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { VideoCameraOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal, Space, Typography } from "antd";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import CreateRoom from "../calling/view/components/createRoom/CreateRoom";
import { sideChatBarList } from "./localization";
import { handleCreateRoomModal } from "../calling/store/slice";
import { instantCall } from "../calling/store/action";
import roomMeeting from "../../../content/NewContent/Sidebar/svg/roomMeeting.svg";
import call from "../../../content/NewContent/Sidebar/svg/call.svg";

export const CreateCall = () => {
  const dispatch = useDispatch();
  const isCreateRoomModalOpen = useSelector(
    (state) => state.callingSlice.isCreateRoomModalOpen
  );
  const { userLanguage } = useContext(LanguageChangeContext);
  const { createRoom, instantCall: icall } = sideChatBarList[userLanguage];
  // const [visible, setVisible] = useState(false);

  const menu = (
    <Menu
      selectable
      items={[
        {
          key: "1",
          label: (
            <div className="flex">
              <img src={roomMeeting} alt="" style={{ height: "1.3rem" }} />
              {createRoom}
            </div>
          ),
          onClick: () => {
            console.log("create room cliced");
            dispatch(handleCreateRoomModal(true));
          },
        },
        {
          key: "2",
          label: (
            <div className="flex">
              <img src={call} alt="" style={{ height: "1.3rem" }} />
              {icall}
            </div>
          ),
          onClick: () => {
            dispatch(instantCall({ isPrivate: false, roomPassword: "" }));
          },
        },
      ]}
    />
  );

  return (
    <>
      <div>
        <Dropdown overlay={menu}>
          <Typography.Link>
            <Space>
              <VideoCameraOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
      </div>

      <Modal
        title=""
        centered
        visible={isCreateRoomModalOpen}
        onCancel={() => {
          dispatch(handleCreateRoomModal(false));
        }}
        width={1000}
        footer={null}
        destroyOnClose={true}
      >
        <CreateRoom />
      </Modal>
    </>
  );
};

export default CreateCall;
