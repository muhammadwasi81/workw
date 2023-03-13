import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ContBody,
  TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import "./styles/style.css";
import Header from "./components/header";
import Calendar from "./view/calendar";
import { LinkOutlined } from "@ant-design/icons";
import MySchedules from "./view/ScheduleDetail/SchedulesDetail";
import { Button, Modal, message } from "antd";
import { defaultUiid } from "../../../utils/Shared/enums/enums";
import CopyToClipboard from "react-copy-to-clipboard";
import { ROUTES } from "../../../utils/routes";

// import { Button, Drawer } from "antd";
// import { ScheduleTopBar } from "./view/ScheduleDetail/topbar/ScheduleTopBar";

function Schedules({ referenceId = defaultUiid }) {
  const [searchParams] = useSearchParams();
  let param = searchParams.get("f");
  const [isShareLinkModalOpen, setIsShareLinkModalOpen] = useState(false);
  // const dispatch = useDispatch();
  // const { drawerOpen } = useSelector(state => state.scheduleSlice);
  const [copy, setCopy] = useState(false);

  const render = {
    cal: <Calendar referenceId={referenceId} />,
    sc: <MySchedules />,
    // si: <MySchedules />,
  };
  const handleShareLinkModal = () => {
    setIsShareLinkModalOpen(!isShareLinkModalOpen);
  };

  const copyfunc = () => {
    setCopy(true);
  };

  return (
    <>
      {copy && message.success("Copied")}
      <TabbableContainer>
        <Header handleShareLinkModal={handleShareLinkModal} />
        {/* <ScheduleTopBar /> */}
        <ContBody style={{ display: "block" }}>{render[param]}</ContBody>
      </TabbableContainer>
      <Modal
        open={isShareLinkModalOpen}
        onCancel={handleShareLinkModal}
        centered
        footer={null}
        closable={false}
      >
        <div>
          <span className="flex items-center gap-3">
            <LinkOutlined className="p-3 !text-[18px] rounded-full bg-primary-color !text-white" />
            <strong className="text-[18px]">Get Link</strong>
          </span>
          <div className="flex gap-5 pt-2">
            <p className="!m-0 text-[18px] flex-1">
              <strong>Anyone</strong> with the link can create a schedule.
            </p>
            <CopyToClipboard
              text={`${window.location.origin}${ROUTES.SCHEDULES.DEFAULT}`}
              onCopy={copyfunc}
            >
              <Button>Calendar Link</Button>
            </CopyToClipboard>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Schedules;
