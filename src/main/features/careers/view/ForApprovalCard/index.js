import React, { useState, useEffect } from "react";
import {
  CardWrapper,
  CardWrapperCareers,
} from "../../../../sharedComponents/Card/CardStyle";
import JobDetails from "../../view/DetailView/DetailComposer/JobDetails";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Modal, Skeleton } from "antd";
import "antd/dist/antd.css";
import { getAllCareerAction, getCareerByIdAction } from "../../store/action";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import { tableColumn } from "../TableColumn";
import { Table } from "../../../../sharedComponents/customTable";
import ApprovalComposer from "./ApprovalComposer";

const MyApprovalCard = (props) => {
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

  const openMyCareerDetail = (id) => {
    console.log(id, "my Career Id");
    setId(id);
    setOpenDetail(true);
    dispatch(getCareerByIdAction(id));
  };

  const handleCancel = () => {
    setOpenDetail(false);
  };

  return (
    <>
      <ApprovalComposer visible={openDetail} onClose={handleCancel} id={id} />
      <CardWrapper
        style={{
          gridTemplateColumns: "repeat(auto-fill,minmax(35rem,1fr))",
        }}
      >
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
                      //   onClick={() => openJobDetailHandler(item.id)}
                      onClickApproval={() => openMyCareerDetail(item.id)}
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
      </CardWrapper>
      {table && (
        <Table
          columns={tableColumn()}
          dragable={true}
          data={careers ? careers : []}
        />
      )}
    </>
  );
};
export default MyApprovalCard;
