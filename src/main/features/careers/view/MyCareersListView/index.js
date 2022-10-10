import React, { useState, useEffect } from "react";
import { CardWrapper } from "../../../../sharedComponents/Card/CardStyle";
import JobDetails from "../../view/DetailView/DetailComposer/JobDetails";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Modal } from "antd";
import "antd/dist/antd.css";
import { getAllCareerAction } from "../DetailView/store/action";

const MyCareersListView = () => {
  const [openDetail, setOpenDetail] = useState(false);

  const careers = useSelector((state) => {
    return state.careerSlice.careerList;
  });
  console.log(careers, "CAREERS");

  const openJobDetailHandler = () => {
    setOpenDetail(true);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCareerAction({}));
  }, []);
  return (
    <>
      <CardWrapper>
        {openDetail && (
          // <Modal>
          <JobDetails />
          // </Modal>
        )}
        {[].length > 0 ? (
          [].map((item) => (
            <ListItem onClick={() => openJobDetailHandler()} item={item} />
          ))
        ) : (
          <div>
            <h2>No Careers Found!</h2>
          </div>
        )}

        {/* <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem /> */}
      </CardWrapper>
    </>
  );
};
export default MyCareersListView;
