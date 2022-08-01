import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Row, Button, Skeleton, Modal } from "antd";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";

import { FilterFilled, UnorderedListOutlined, AppstoreFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllRewards, GetRewardById } from "../store/actions";
import TableView from "./TableView";

// import "./reward.css";
import FilterSearchButton from "../../../sharedComponents/FilterSearch";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";
import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";

const Reward = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, rewardsDictionary } = dictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);

  const isTablet = useMediaQuery({ maxWidth: 800 });

  const [detailId, setDetailId] = useState(false);

  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();
  const { rewards, loader, rewardDetail } = useSelector((state) => state.rewardSlice);
  const [searchFilterValues, setSearchFilterValues] = useState();

  const onClose = () => {
    setDetailId(null);
  };

  useEffect(() => {
    dispatch(getAllRewards(filter));
  }, [filter]);

  const handleFilter = (values) => {
    setSearchFilterValues(values);
  };
  return (
    <>
      <TabbableContainer className="">
        <Header
          buttons={[
            {
              buttonText: "Create Travel",
              // onClick: () => setVisible(true),
              render: (
                <SideDrawer title={rewardsDictionary.createReward} buttonText={rewardsDictionary.createReward} isAccessDrawer={false}>
                  <Composer />
                </SideDrawer>
              ),
            },
          ]}
        />
        <TopBar
          onSearch={(value) => {
            console.log(value);
          }}
          buttons={[
            {
              name: "Rewards",
              onClick: () => setFilter({ filterType: 0 }),
            },
            {
              name: "For Approval",
              onClick: () => setFilter({ filterType: 1 }),
            },
            {
              name: "Reward To Me",
              onClick: () => setFilter({ filterType: 2 }),
            },
          ]}
          // filter={{
          //   onFilter: () => {},
          // }}
          segment={{
            onSegment: (value) => {
              if (value === "Table") {
                setTableView(true);
              } else {
                setTableView(false);
              }
            },
            label1: "List",
            label2: "Table",
          }}
        />
        <ContBody>
          {rewards?.length > 0 ? (
            tableView ? (
              <Table
                columns={tableColumn()}
                dragable={true}
                data={rewards}
              />
            ) : (
              <>
                {loader ? (
                  <>
                    <Skeleton avatar paragraph={{ rows: 4 }} />
                    {/* <Skeleton
											avatar
											paragraph={{ rows: 4 }}
										/>
										<Skeleton
											avatar
											paragraph={{ rows: 4 }}
										/> */}
                  </>
                ) : (
                  <CardWrapper>
                    {rewards.map((item, index) => {
                      return (
                        <>
                          <ListItem item={item} id={item.id} key={index} onClick={() => setDetailId(item.id)} />
                        </>
                      );
                    })}
                  </CardWrapper>
                )}
              </>
            )
          ) : (
            "Data not found"
          )}
        </ContBody>
        {<DetailedView onClose={onClose} id={detailId} />}
      </TabbableContainer>
    </>
  );
};

export default Reward;
