import React, { useEffect, useState, useContext } from "react";
import { Button, Collapse, Divider, Popover, Form, Modal } from "antd";
import {
  CalendarOutlined,
  InfoCircleOutlined,
  DownOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProjectSummary from "../view/ProjectSummary";
import {
  addProjectFeature,
  removeProjectFeatureAction,
  getProjectFeature,
} from "../store/actions";
import FeatureSelect from "../../../sharedComponents/FeatureSelect/Index";
import { FeaturesEnum } from "../../../../utils/Shared/enums/enums";

const { Panel } = Collapse;
function ProjectInformation({ ghost = true }) {
  const [openFeature, setOpenFeature] = useState(false);
  const [features, setFeatures] = useState([]);

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

      let newPayload = [...features, payload];
      const newFeature = newPayload.map((item) => {
        return {
          featureId: item.featureId,
        };
      });
      console.log(newFeature, "new Featuree");

      dispatch(addProjectFeature({ id: projectId, payload: newFeature }));
    } else {
      dispatch(
        removeProjectFeatureAction({
          id: projectId,
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
          <div className="font-bold flex items-center gap-2 mb-2">
            <ProjectSummary />
            <span>{"View Summary"}</span>
          </div>
          <div
            className="text-black text-sm font-bold flex items-center gap-2 mb-2"
            onClick={featureHandler}
          >
            <EyeOutlined />
            Features
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
          <FeatureSelect checked={projectFeature} onChange={onFeatureHandler} />
        </Modal>
      )}
    </>
  );
}
export default ProjectInformation;
