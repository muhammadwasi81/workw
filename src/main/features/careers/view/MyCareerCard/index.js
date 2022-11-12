import React, { useState, useEffect, useContext } from "react";
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
import { getAllCareerAction, getCareerByIdAction } from "../../store/action";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import { tableColumn } from "../TableColumn";
import { Table } from "../../../../sharedComponents/customTable";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon";

const MyCareerCard = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList } = CareerDictionary[userLanguage];
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

  const { labels } = CareerDictionaryList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.view === labels.table) {
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
      {
         loader && (
          [...Array(15)].map((item) => (
            <Skeleton key={item} avatar paragraph={{ rows: 6 }} />
          ))
        )  
      }
       {
        table &&
        <Table
          columns={tableColumn()}
          dragable={true}
          data={careers ? careers : []}
      />
      }

{
            careers?.length > 0 && !loader && !table ? (
            <CardWrapper
              style={{
                gridTemplateColumns: "repeat(auto-fill,minmax(35rem,1fr))",
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
                {careers.map((item, index) => {
                  return (
                    <ListItem
                      onClick={() => openJobDetailHandler(item.id)}
                      onClickMyCareer={() => openMyCareerDetail(item.id)}
                      item={item}
                   />
                  );
                })}
              </CardWrapper>
            ) : !loader  && !table && <NoDataFound />
      }


      {/*
       {!table && (
        <CardWrapper
          style={{
            gridTemplateColumns: "repeat(auto-fill,minmax(35rem,1fr))",
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
                     <NoDataFound />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </CardWrapper>
      )}

      {table && (
        <Table
          columns={tableColumn()}
          dragable={true}
          data={careers ? careers : []}
        />
      )}
     */}
    </>
  );
};
export default MyCareerCard;
