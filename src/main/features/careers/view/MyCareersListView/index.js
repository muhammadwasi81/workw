import React, { useState, useEffect } from "react";
import {
  CardWrapper,
  CardWrapperCareers,
} from "../../../../sharedComponents/Card/CardStyle";
import JobDetails from "../../view/DetailView/DetailComposer/JobDetails";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import ApplyComposer from "../Composers/applyComposer";
import { DatePicker, Modal } from "antd";
import "antd/dist/antd.css";
import {
  getAllCareerAction,
  getCareerByIdAction,
} from "../../../../features/careers/store/action";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";

const MyCareersListView = () => {
  const navigate = useNavigate();
  const [openDetail, setOpenDetail] = useState(false);
  const [applyDrawer, setApplyDrawer] = useState(false);
  const [id, setId] = useState();

  const careers = useSelector((state) => {
    return state.careerSlice.items;
  });
  const { currentTab } = useSelector((state) => {
    return state.careerSlice;
  });

  const dispatch = useDispatch();

  const openJobDetailHandler = (id) => {
    console.log(id, "******");
    setId(id);
    setOpenDetail(true);
    dispatch(getCareerByIdAction(id));
  };

  const openMyCareerDetail = (id) => {
    console.log(id, "my Career Id");
    //TODO: dispatch action to get career by id and applicants
    dispatch(getCareerByIdAction(id));
    navigate(`jobdetail/${id}`);
  };

  const handleOk = () => {
    setOpenDetail(false);
  };

  const handleCancel = () => {
    setOpenDetail(false);
  };

  const applyJob = () => {
    console.log("apply works");
    setApplyDrawer(true);
    setOpenDetail(false);
  };

  const handleDrawerClose = () => {
    setApplyDrawer(false);
  };

  return (
    <>
      <ApplyComposer
        visible={applyDrawer}
        onClose={handleDrawerClose}
        id={id}
      />
      <CardWrapper
        style={{
          gridTemplateColumns:
            currentTab === "myCareers"
              ? "repeat(auto-fill,minmax(30rem,1fr))"
              : "repeat(auto-fill,minmax(27rem,1fr))",
        }}
      >
        {openDetail && (
          <Modal
            open={openDetail}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width={"50%"}
          >
            <JobDetails apply={applyJob} />
          </Modal>
        )}

        {careers.length > 0 ? (
          careers.map((item) => (
            <ListItem
              onClick={() => openJobDetailHandler(item.id)}
              onClickMyCareer={() => openMyCareerDetail(item.id)}
              item={item}
            />
          ))
        ) : (
          <div>
            <h2>No Careers Found!</h2>
          </div>
        )}
      </CardWrapper>
    </>
  );
};
export default MyCareersListView;
