import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import {
  ContBody,
  HeaderMenuContainer,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Row, Button, Skeleton, Modal } from "antd";
import { leaveDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";

import {
  FilterFilled,
  UnorderedListOutlined,
  AppstoreFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllLeaves, GetRewardById } from "../store/actions";

import "./leave.css";
import FilterSearch from "../../../sharedComponents/FilterSearch";
import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import { CardWrapper } from "../../../layout/GridStyle";
import TopBar from "../../../sharedComponents/topBar/topBar";

const Leave = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, leaveDictionary } = leaveDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 800 });
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { leaves, loader, rewardDetail } = useSelector(
    (state) => state.leaveSlice
  );
  const [searchFilterValues, setSearchFilterValues] = useState();

  const onClose = () => {
    setVisible(false);
  };

  const getRewardId = (id) => {
    dispatch(GetRewardById(id));
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getAllLeaves(filter));
  }, [filter]);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleFilter = (values) => {
    setSearchFilterValues(values);
  };
  return (
    <>
      <TabbableContainer className="">
        <ContainerHeader>
          <HeaderMenuContainer></HeaderMenuContainer>
          <div className="right-menu" style={{ paddingRight: "10px" }}>
            <div className={""}>
              <SideDrawer
                title={leaveDictionary.leave}
                buttonText={leaveDictionary.createleave}
                isAccessDrawer={false}
              >
                <Composer />
              </SideDrawer>
            </div>
          </div>
        </ContainerHeader>
        <TopBar
          onSearch={(value) => {
            console.log(value);
          }}
          buttons={[
            {
              name: "leaves",
              onClick: () => setFilter({ filterType: 0 }),
            },
            {
              name: "For Approval",
              onClick: () => setFilter({ filterType: 1 }),
            },
            {
              name: "Leave To Me",
              onClick: () => setFilter({ filterType: 2 }),
            },
          ]}
          filter={{
            onFilter: () => {},
          }}
          segment={{
            onSegment: (value) => {
              if (value === "Table") {
                setTableView(true);
              } else {
                setTableView(false);
              }
            },
            lable1: "List",
            lable2: "Table",
          }}
        />
        <div className="myBody">
          <CardWrapper>
            {leaves && leaves.length > 0 ? (
              tableView ? (
                <Table
                  columns={tableColumn()}
                  dragable={true}
                  // handleChange={handleChange}
                  // onPageChange={onPageChange}
                  // onRow={onRow}
                  data={leaves}
                  // status={travelStatus}
                  // loadding={loader}
                  // success={success}
                  // onActionClick={onActionClick}
                />
              ) : (
                <>
                  {loader ? (
                    <>
                      <Skeleton avatar paragraph={{ rows: 4 }} />
                      <Skeleton avatar paragraph={{ rows: 4 }} />
                      <Skeleton avatar paragraph={{ rows: 4 }} />
                    </>
                  ) : (
                    leaves.map((item, index) => {
                      return (
                        <>
                          <ListItem
                            getRewardId={getRewardId}
                            item={item}
                            id={item.id}
                            key={index}
                          />
                        </>
                      );
                    })
                  )}
                </>
              )
            ) : (
              "Data not found"
            )}
          </CardWrapper>
        </div>
        {rewardDetail && <DetailedView onClose={onClose} visible={visible} />}
      </TabbableContainer>
    </>
  );
};

export default Leave;
