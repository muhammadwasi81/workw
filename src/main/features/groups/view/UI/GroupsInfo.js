import React, { useEffect, useState, useContext } from "react";
import { Button, Collapse, Divider, Popover, Form, Modal } from "antd";
import {
  CalendarOutlined,
  InfoCircleOutlined,
  DownOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import moment from "moment";
import FeatureSelect from "../../../../sharedComponents/FeatureSelect/Index";
import { FeaturesEnum } from "../../../../../utils/Shared/enums/enums";
import { toggleInfoModal } from "../../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { LaptopOutlined } from "@ant-design/icons";
import {
  addGroupFeaturesAction,
  removeGroupFeaturesAction,
  getGroupFeaturesAction,
} from "../../store/actions";
import { useParams } from "react-router-dom";
import { groupsDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

const { Panel } = Collapse;
function GroupsInfo({ ghost = true }) {
  const { userLanguage } = useContext(LanguageChangeContext);

  const { Direction, groupsDictionary } = groupsDictionaryList[userLanguage];
  const { labels, placeHolders, errors, features } = groupsDictionary;
  const dispatch = useDispatch();
  const [openFeature, setOpenFeature] = useState(false);
  const detail = useSelector((state) => state.groupSlice.groupDetail);
  console.log(detail?.features, "detaill");
  const [form] = Form.useForm();
  const { groupId } = useParams();

  const featureHandler = () => {
    setOpenFeature(true);
  };

  useEffect(() => {
    dispatch(getGroupFeaturesAction(groupId));
  }, []);
  const onFeatureHandler = (featureId, checked) => {
    if (checked) {
      const payload = {
        featureId: featureId,
        groupId: groupId,
      };
      dispatch(addGroupFeaturesAction([payload]));
    } else {
      dispatch(
        removeGroupFeaturesAction({
          id: groupId,
          featureId: featureId,
        })
      );
    }
  };
  return (
    <>
      <Collapse
        expandIcon={({ isActive }) => (
          <DownOutlined
            rotate={isActive ? 0 : 180}
            className="!text-lg !font-bold !text-primary-color"
          />
        )}
        ghost={ghost}
        expandIconPosition={"end"}
        defaultActiveKey={["0"]}
      >
        <Panel
          showArrow={true}
          header={
            <div>
              <span className="text-base font-bold text-primary-color">
                Information
              </span>
            </div>
          }
          className="custom_member_collapse"
        >
          <div
            className="text-black text-sm font-bold flex items-center gap-2 mb-2"
            onClick={featureHandler}
          >
            <EyeOutlined />
            Features
          </div>

          <Divider />
          <div className="text-black text-sm font-bold flex items-center gap-2 mb-2">
            <Popover content={`Created by: `}>
              <InfoCircleOutlined className="cursor-pointer" />
            </Popover>
            <span>
              {"Created By"}: {detail?.creator?.name}
            </span>
          </div>
          <div className="font-bold flex items-center gap-2 mb-2">
            <CalendarOutlined />
            <p className="!mb-0 text-sm">
              {"Created At"}:&nbsp;
              {moment(detail?.createDate).format("MMMM D, YYYY")}
            </p>
          </div>
          <Divider />
          <div className="font-bold flex items-center gap-2 mb-2">
            <LaptopOutlined />
            <span>{"Summary"}</span>
          </div>
        </Panel>
      </Collapse>
      {openFeature && (
        <Modal
          title=""
          centered
          className="modal-body"
          footer={false}
          open={openFeature}
          onOk={() => setOpenFeature(false)}
          onCancel={() => setOpenFeature(false)}
          closable={false}
          width={900}
        >
          <FeatureSelect
            features={features}
            form={form}
            notIncludeFeature={FeaturesEnum.Travel}
            onChange={onFeatureHandler}
          />
        </Modal>
      )}
    </>
  );
}
export default GroupsInfo;
