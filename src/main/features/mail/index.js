import React, { useState } from "react";
import "./style/index.css";
import MainLeftBody from "./MainLeftBody";
import MainRightBody from "./MainRightBody";
import { MailContainer, MailMainContainer } from "./style/mail.style";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import MailComposer from "./Composer/";
import {
  getAllBusinessEmailConfiguration,
  addEmailConfiguration,
} from "../../features/emailConfiguration/store/actions";
import {
  getAllUserEmailConfigurations,
  addUserEmailConfiguration,
} from "../emailUserConfiguration/store/actions";
import { Button, Skeleton, Modal, Form, Input } from "antd";
import { configureEmailAccount } from "./configureEmailAccount";

import NoMilFound from "../../../content/emptyMailBoxImage/empty mailbox-ic.svg";
import { FormButton } from "../../sharedComponents/Administration/StyledComponents/adminForm";
import userSlice from "../../../store/appReducer/userSlice";
import { getAllMail, getMailFolders } from "./Store/Api";

const Index = () => {
  const { isMobileScreen } = useSelector((state) => state.responsiveSlice);
  const { user } = useSelector((state) => state.userSlice);
  const { responsiveSlice, mailSlice } = useSelector((state) => state);
  const {
    mailFolderItem,
    responseCode,
    errorMessage,
    emailConfigurations,
  } = mailSlice;
  const { userEmailConfigurations, loadingData } = useSelector(
    (state) => state.emailUserConfigurationSlice
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserEmailConfigurations(user.id));
    dispatch(getAllBusinessEmailConfiguration());
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {}, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    const payloadData = {
      configurationId: emailConfigurations[0].id,
      userId: user.id,
      // incomingPort: emailConfigurations[0].incomingPort,
      // incomingServerAddress: emailConfigurations[0].incomingServerAddress,
      // isDefault: emailConfigurations[0].isDefault,
      // outgoingPort: emailConfigurations[0].outgoingPort,
      // outgoingServerAddress: emailConfigurations[0].outgoingServerAddress,
      // provider: emailConfigurations[0].provider,
      ...values,
    };

    const data = { pageNo: 0, pageSize: 20, search: "", folderPath: "INBOX" };
    dispatch(addUserEmailConfiguration(payloadData));
    setIsModalVisible(false);
    dispatch(getAllMail(data));
    dispatch(getAllBusinessEmailConfiguration());
    dispatch(getMailFolders());
    dispatch(getAllUserEmailConfigurations(user.id));
  };
  return loadingData ? (
    <Skeleton />
  ) : userEmailConfigurations?.length > 0 ? (
    <MailContainer isMobileScreen={isMobileScreen}>
      {responseCode === null || responseCode === 1001 ? (
        <MailMainContainer isMobileScreen={isMobileScreen}>
          <MainLeftBody />
          <MainRightBody />
        </MailMainContainer>
      ) : (
        ""
      )}

      <MailComposer />
    </MailContainer>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        className="max-w-full max-h-full w-64 h-64"
        src={NoMilFound}
        alt="No Data Found"
      />
      <div className="mt-3">
        <button
          onClick={showModal}
          class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Configure Your Account
        </button>
        <Modal
          title="Configure Your Email Account"
          visible={isModalVisible}
          id={user.id}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            initialValues={{ username: user.email }}
          >
            <Form.Item
              name="username"
              label="Email"
              onClick={(e) => {}}
              rules={[{ required: true, message: "Please enter an email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter a password" }]}
            >
              <Input.Password />
            </Form.Item>
            <div className="flex flex-col items-center justify-center">
              <button
                htmlType="submit"
                class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Configure
              </button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Index;
