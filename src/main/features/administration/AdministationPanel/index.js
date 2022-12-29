import AdminList from "./adminlist";
import React, { useEffect, useState, use } from "react";
import { AdminPanelContainer } from "../styles/admin.style";
import AdminRoutes from "../AdminRoutes/adminroutes";
import { AdminNotification } from "./notification";
import CustomModal from "../../workboard/Modal/CustomModal";
import AttachmentsCarrousel from "../../travel/view/AttachmentsCarrousel/AttachmentsCarrousel";

import { Modal } from "antd";
import Attachments from "../../travel/view/UI/Attachments";
import accessRole from "../../../../content/NewContent/adminstration/accessRole.jpeg";
import businessLogo from "../../../../content/NewContent/adminstration/businessLogo.jpeg";
import designation from "../../../../content/NewContent/adminstration/designation.jpeg";
import fiscalYear from "../../../../content/NewContent/adminstration/fiscalYear.jpeg";

// import { Route, Routes } from "react-router-dom";
// import { routes } from "../../../../routes/routes";
// import { Outlet } from "react-router-dom";

const Administration = () => {
  const [visible, setVisible] = useState(false);
  const images = [
    {
      attachmentName: "",
      attachmentTypeId: 1,
      path: accessRole,
    },
    {
      attachmentName: "",
      attachmentTypeId: 1,
      path: businessLogo,
    },
    {
      attachmentName: "",
      attachmentTypeId: 1,
      path: designation,
    },
    {
      attachmentName: "",
      attachmentTypeId: 1,
      path: fiscalYear,
    },
  ];
  console.log(images, "images");

  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <>
      <AdminPanelContainer>
        {/* <Modal
          title=""
          centered
          footer={null}
          open={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
        >
          <Attachments
            data={images}
            key={{ data: images }}
            toShow={1}
            onClick={() => {}}
            // size={"60px"}
          />
        </Modal> */}
        <CustomModal
          isModalVisible={visible}
          footer={null}
          width={"80%"}
          className="attachmentModal"
          onCancel={() => {
            setVisible(false);
          }}
          children={
            <AttachmentsCarrousel attachments={images} key={{ data: images }} />
          }
        />
        <AdminList />

        <AdminRoutes />
        {/* <Outlet /> */}
        <AdminNotification />
      </AdminPanelContainer>
    </>
  );
};

export default Administration;
