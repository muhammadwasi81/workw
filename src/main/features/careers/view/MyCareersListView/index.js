import React, { useState, useEffect } from "react";
import {
  CardWrapper,
  CardWrapperCareers,
} from "../../../../sharedComponents/Card/CardStyle";
import JobDetails from "../../view/DetailView/DetailComposer/JobDetails";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import ApplyComposer from "../Composers/applyComposer";
import { DatePicker, Modal, Skeleton } from "antd";
import "antd/dist/antd.css";
import {
  getAllCareerAction,
  getCareerByIdAction,
} from "../../../../features/careers/store/action";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import { tableColumn } from "../TableColumn";
import { Table } from "../../../../sharedComponents/customTable";

const MyCareersListView = (props) => {
  const navigate = useNavigate();
  const [openDetail, setOpenDetail] = useState(false);
  const [applyDrawer, setApplyDrawer] = useState(false);
  const [id, setId] = useState();
  const [table, setTable] = useState(false);
  console.log(props);
  const careers = useSelector((state) => {
    return state.careerSlice.items;
  });
  const { loader } = useSelector((state) => state.careerSlice);
  const { currentTab } = useSelector((state) => {
    return state.careerSlice;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.view === "Table") {
      setTable(true);
    } else {
      setTable(false);
    }
  }, [props.view]);

  const openJobDetailHandler = (id) => {
    setId(id);
    setOpenDetail(true);
    dispatch(getCareerByIdAction(id));
  };

  const openMyCareerDetail = (id) => {
    console.log(id, "my Career Id");
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
      <CardWrapper>
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
        {!table && (
          <>
            {loader ? (
              [...Array(15)].map((item) => (
                <Skeleton key={item} avatar paragraph={{ rows: 6 }} />
              ))
            ) : (
              <>
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
              </>
            )}
          </>
        )}

        {table && (
          <Table
            columns={tableColumn()}
            dragable={true}
            data={careers ? careers : []}
          />
        )}
      </CardWrapper>
    </>
  );
};
export default MyCareersListView;
