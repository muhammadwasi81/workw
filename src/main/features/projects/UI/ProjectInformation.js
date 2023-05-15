import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Collapse,
  Divider,
  Popover,
  Form,
  Modal,
  message,
  Select,
} from "antd";
import {
  CalendarOutlined,
  InfoCircleOutlined,
  DownOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProjectSummary from "../view/ProjectSummary";
import {
  addProjectFeature,
  removeProjectFeature,
  getProjectFeature,
} from "../store/actions";
import FeatureSelect from "../../../sharedComponents/FeatureSelect/Index";
import { FeaturesEnum } from "../../../../utils/Shared/enums/enums";
import CustomModal from "../../workboard/Modal/CustomModal";
import ProjectFeatures from "../constant/projectFeatures";

const { Panel } = Collapse;
function ProjectInformation({ ghost = true }) {
  const [openFeature, setOpenFeature] = useState(false);
  const [features, setFeatures] = useState([]);
  const [externalMemberModal, setExternalMemberModal] = useState(false);
  const [value, setValue] = useState([]);

  const dispatch = useDispatch();

  const { projectId } = useParams();
  const { projectFeature } = useSelector((state) => state.projectSlice);

  const featureHandler = () => {
    setOpenFeature(true);
  };

  useEffect(() => {
    dispatch(getProjectFeature(projectId));
  }, []);
  useEffect(() => {
    let newFeatures;
    if (projectFeature.length >= 0) {
      newFeatures = projectFeature.map((item) => {
        return {
          featureId: item.featureId,
          projectId: item.projectId,
        };
      });
    }
    setFeatures(newFeatures);
  }, [projectFeature]);
  const onFeatureHandler = (featureId, checked) => {
    if (checked) {
      const payload = {
        featureId: featureId,
        projectId: projectId,
      };

      let newPayload = features ? [...features, payload] : [payload];
      const newFeature = newPayload.map((item) => {
        return {
          featureId: item.featureId,
        };
      });

      dispatch(addProjectFeature({ id: projectId, payload: newFeature }));
    } else {
      dispatch(
        removeProjectFeature({
          id: projectId,
          featureId: featureId,
        })
      );
    }
  };
  const handleExternalMember = () => {
    setExternalMemberModal(!externalMemberModal);
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
  const handleOnChange = (newValue) => {
    const validTags = newValue.filter(validateEmail);
    if (validTags.length === newValue.length) {
      if (newValue.length < value.length) {
        const removedTag = value.filter((tag) => !newValue.includes(tag));
        message.success(`Removed tag '${removedTag}' successfully.`);
      }
      if (newValue.length > value.length) {
        const addedTag = newValue.filter((tag) => !value.includes(tag));
        message.success(`Added tag '${addedTag}' successfully.`);
      }
      setValue(newValue);
    } else {
      message.error("Please enter a valid email address.");
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
          <div className="font-bold flex items-center gap-2 mb-2 cursor-pointer">
            <ProjectSummary />
            <span>{"View Summary"}</span>
          </div>
          <div
            className="text-black text-sm font-bold flex items-center gap-2 mb-2 cursor-pointer"
            onClick={featureHandler}
          >
            <EyeOutlined />
            Features
          </div>
          <div
            className="text-black text-sm font-bold flex items-center gap-2 mb-2 cursor-pointer"
            onClick={handleExternalMember}
          >
            <PlusOutlined />
            Add Externals
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
          <ProjectFeatures
            checked={projectFeature}
            onChange={onFeatureHandler}
          />
        </Modal>
      )}

      <CustomModal
        footer={null}
        isModalVisible={externalMemberModal}
        centered={true}
        onCancel={handleExternalMember}
        destroyOnClose={true}
        closable={false}
        children={
          <Form name="externalMember" layout={"vertical"}>
            <Form.Item
              name="externalMember"
              label={"Enter External Member Email Address"}
            >
              <Select
                mode="tags"
                allowClear
                style={{
                  width: "100%",
                }}
                value={value}
                placeholder="Enter your email address"
                tokenSeparators={[","]}
                onChange={handleOnChange}
              />
            </Form.Item>
          </Form>
        }
      />
    </>
  );
}
export default ProjectInformation;
