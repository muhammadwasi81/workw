import AdminList from "./adminlist";
import React, { useEffect, useState, use } from "react";
import { AdminPanelContainer } from "../styles/admin.style";
import AdminRoutes from "../AdminRoutes/adminroutes";
import { AdminNotification } from "./notification";

import { Button, message, Modal } from "antd";

import "../styles/adminstration.css";
import BusinessLogo from "../adminstrationCard/BusinessLogo";
import Designation from "../adminstrationCard/Designation";
import { useSelector, useDispatch } from "react-redux";
import { handleChangeTab } from "../store/slice";
import FiscalYear from "../adminstrationCard/FiscalYear";
import PayrollGroup from "../adminstrationCard/PayrollGroup";
import EmailConfigurationForm from "../adminstrationCard/EmailConfiguration";

const Administration = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fiscalName: "",
    fiscaldescription: "",
    startMonth: "",
    endMonth: "",
    startYear: "",
    endYear: "",
    payroll: "",
    emailName: "",
    incomingPort: "",
    incomingServerAddress: "",
    outgoingPort: "",
    outgoingServerAddress: "",
    provider: "",
  });
  const [page, setPage] = useState(0);

  const handleChangeTab = (e) => {
    if (page === 4) {
      setVisible(false);
    } else {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSkip = () => {
    setPage(page + 1);
  };
  const handleSubmit = () => {
    setFormData(formData);
  };
  let RenderTab = [
    <BusinessLogo formData={formData} setFormData={setFormData} />,
    <Designation formData={formData} setFormData={setFormData} />,
    <FiscalYear formData={formData} setFormData={setFormData} />,
    <PayrollGroup formData={formData} setFormData={setFormData} />,
    <EmailConfigurationForm
      formData={formData}
      setFormData={setFormData}
      onSuccess={handleSubmit}
    />,
  ];

  return (
    <>
      <AdminPanelContainer>
        <Modal
          title=""
          centered
          className="modal-body"
          footer={[
            <Button className="ThemeBtn" onClick={handleSkip}>
              Skip
            </Button>,
            <Button
              className="ThemeBtn"
              onClick={(e) => handleChangeTab(formData)}
            >
              Next
            </Button>,
          ]}
          open={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          closable={false}
          width={900}
          height={550}
        >
          {RenderTab[page]}
        </Modal>

        <AdminList />

        <AdminRoutes />
        <AdminNotification />
      </AdminPanelContainer>
    </>
  );
};

export default Administration;
