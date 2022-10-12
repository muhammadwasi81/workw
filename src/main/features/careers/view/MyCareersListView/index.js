import React, { useState, useEffect } from "react";
import {
  CardWrapper,
  CardWrapperCareers,
} from "../../../../sharedComponents/Card/CardStyle";
import JobDetails from "../../view/DetailView/DetailComposer/JobDetails";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Modal } from "antd";
import "antd/dist/antd.css";
import {
  getAllCareerAction,
  getCareerByIdAction,
} from "../../../../features/careers/store/action";

const MyCareersListView = () => {
  const [openDetail, setOpenDetail] = useState(false);

  const careers = useSelector((state) => {
    return state.careerSlice.items;
  });
  const { currentTab } = useSelector((state) => {
    return state.careerSlice;
  });
  console.log(careers, "CAREERS");

  const dispatch = useDispatch();

  const openJobDetailHandler = (id) => {
    console.log(id, "******");
    setOpenDetail(true);
    dispatch(getCareerByIdAction(id));
  };

  const handleOk = () => {
    setOpenDetail(false);
  };

  const handleCancel = () => {
    setOpenDetail(false);
  };

  // useEffect(() => {
  //   dispatch(getAllCareerAction({}));
  // }, []);
  console.log(currentTab, "adasds");

  return (
    <>
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
            <JobDetails />
          </Modal>
        )}
        {careers.length > 0 ? (
          careers.map((item) => (
            // <h1>jksdjkkjsdkj</h1>
            <ListItem
              onClick={() => openJobDetailHandler(item.id)}
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
