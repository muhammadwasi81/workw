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
import BarNavLink from "../../../layout/topBar/BarNavLink";
import {
  FilterFilled,
  UnorderedListOutlined,
  AppstoreFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllLeaves, GetRewardById } from "../store/actions";
import TableView from "./TableView";

import "./leave.css";
import FilterSearch from "../../../sharedComponents/FilterSearch";
import { CardWrapper } from "../../../layout/GridStyle";
import TopBar from "../../../layout/topBar/topBar";

const Leave = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, leaveDictionary } = leaveDictionaryList[userLanguage];

  const [grid, setGrid] = useState(false);
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
          buttons={[
            <Button
              className="filterButton topBtn !h-full !flex !items-center"
              onClick={showModal}
            >
              {isTablet ? "" : leaveDictionary.filter}
              <FilterFilled />
            </Button>,
            <BarNavLink
              extraClasses={
                filter.filterType === 0 ? "topbarOn topBtn" : "topBtn"
              }
              activeName={"list"}
              linkName={leaveDictionary.myLeaves}
              onClick={() => setFilter({ filterType: 0 })}
            />,
            <BarNavLink
              activeName={"aprrovals"}
              extraClasses={
                filter.filterType === 2 ? "topbarOn topBtn" : "topBtn"
              }
              isDefault={false}
              linkName={leaveDictionary.forApproval}
              onClick={() => setFilter({ filterType: 2 })}
            />,
            // <BarNavLink
            //   activeName={"aprrovals"}
            //   extraClasses={
            //     filter.filterType === 3 ? "topbarOn topBtn" : "topBtn"
            //   }
            //   isDefault={false}
            //   linkName={"Reward To Me"}
            //   onClick={() => setFilter({ filterType: 3 })}
            // />,
          ]}
          gridIcons={[
            <div
              onClick={() => setGrid(false)}
              className={`  flex justify-center items-center gap-1 ${
                grid ? "topBarIcon gridIcon" : "topBarIcon gridIcon isActive"
              }`}
            >
              {isTablet ? "" : leaveDictionary.listView}{" "}
              <UnorderedListOutlined style={{ marginLeft: "2px" }} />
            </div>,
            <div
              onClick={() => setGrid(true)}
              className={` flex justify-center items-center gap-1
							${grid ? "topBarIcon gridIcon isActive transition" : "topBarIcon gridIcon "}`}
            >
              {isTablet ? "" : leaveDictionary.tableView}{" "}
              <AppstoreFilled style={{ marginLeft: "2px" }} />
            </div>,
          ]}
        />
        <div className="myBody">
          <CardWrapper>
            {leaves && leaves.length > 0 ? (
              grid ? (
                <TableView />
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
