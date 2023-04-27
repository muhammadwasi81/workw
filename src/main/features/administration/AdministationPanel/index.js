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
import { addDesignation } from "../../designation/store/actions";
import { addFiscalYear } from "../../fiscalYear/store/actions";
import { addPayrollGroup } from "../../payroll/payrollGroup/store/actions";
import { GetAllWizard ,seenWizard} from "../store/action";

const Administration = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { handleModal } = useSelector((state) => state.adminstrationSlice);

  useEffect(() => {
    console.log("useEffect ran");
    dispatch(GetAllWizard());
  }, []);

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

  // const NextHandler = (e) => {
  //   if (page === 0) {
  //     handleChangeTab();
  //   } else if (page === 1) {
  //     dispatch(addDesignation(e));
  //     handleChangeTab();
  //   } else if (page === 2) {
  //     dispatch(addFiscalYear(e));
  //     handleChangeTab();
  //   } else if (page === 3) {
  //     dispatch(addPayrollGroup(e));
  //   } else {
  //     message.error("Please fill required field!");
  //   }
  // };
  const handleChangeTab = () => {
    if (page === 4) {
      setVisible(false);
    } else {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    setVisible(true);
  }, []);

  const handleshow = () => {
    dispatch(seenWizard(2));
  }

  const handleSkip = () => {
    if (page === 4) {
      setVisible(false);
    } else {
      setPage(page + 1);
    }
  };

  let RenderTab = [
    <BusinessLogo
      formData={formData}
      setFormData={setFormData}
      handleChangeTab={handleChangeTab}
    />,
    <Designation
      formData={formData}
      setFormData={setFormData}
      handleChangeTab={handleChangeTab}
    />,
    <FiscalYear
      formData={formData}
      setFormData={setFormData}
      handleChangeTab={handleChangeTab}
    />,
    <PayrollGroup
      formData={formData}
      setFormData={setFormData}
      handleChangeTab={handleChangeTab}
    />,
    <EmailConfigurationForm
      formData={formData}
      setFormData={setFormData}
      handleChangeTab={handleChangeTab}
    />,
  ];
  const checkType = handleModal?.data[0]?.type;
  return (
    <>
      <AdminPanelContainer>
        {checkType === 1 && (
          <Modal
            title=""
            centered
            className="modal-body"
            footer={[
              <Button className="ThemeBtn" onClick={handleshow}>
                 Don't Show this again
              </Button>,

              <Button className="ThemeBtn" onClick={handleSkip}>
                Skip
              </Button>,

            ]}
            
            open={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            closable={false}
            width={900}
            // height={550}
          >
            {RenderTab[page]}
          </Modal>
        )}

        <AdminList />
        <AdminRoutes />
        <AdminNotification />
      </AdminPanelContainer>
    </>
  );
};

export default Administration;
