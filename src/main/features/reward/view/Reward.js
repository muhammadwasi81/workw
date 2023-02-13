import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button, Drawer } from "antd";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton, Modal } from "antd";
// import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { rewardDictionaryList } from "../localization/index";

import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllRewards } from "../store/actions";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";
import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";
import { emptyEmployeesData } from "../../../../utils/Shared/store/slice";
import { ROUTES } from "../../../../utils/routes";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
//import { getIconByFeaturesType } from "../../../../utils/Shared/helper/helpers";
import {getApprovalsTypeByFeaturesType} from "../../../sharedComponents/AppComponents/Approvals/helper/helpers"

const Reward = (props) => {
  const { visible } = props;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { rewardDictionary } = rewardDictionaryList[userLanguage];

  // const { sharedLabels, rewardsDictionary } = dictionaryList[userLanguage];

  const isTablet = useMediaQuery({ maxWidth: 800 });
  const [detailId, setDetailId] = useState(false);

  const [sort, setSort] = useState(1);
  const [page, setPage] = useState(20);
  const [pageNo, setPageNo] = useState(1);
  const [tableView, setTableView] = useState(false);
  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();
  const { rewards, loader, rewardDetail, drawerOpen } = useSelector(
    (state) => state.rewardSlice
  );
  const [searchFilterValues, setSearchFilterValues] = useState();

  const onClose = () => {
    setDetailId(null);
  };

  // var currentDateTime = new Date();
  // var a = 'Tue, Jan 22 2022 10:00:00 GMT+0500 (Pakistan Standard Time)'
  // var resultInSeconds = a.getTime()
  // console.log(currentDateTime, "SIMPLE");
  // console.log(resultInSeconds, "CURRENT DATE AND TIMEA")


  useEffect(() => {
    dispatch(getAllRewards(filter));
  }, [filter]);

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        setDetailId(record.id);
      },
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  };

  const handleColumnSorting = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    setPage(pageSize);
    setPageNo(current);
    const { order } = sorter;
    if (order === "ascend") {
      setSort(2);
      return;
    }
    setSort(1);
  };

  const items = [
    {
      name: rewardDictionary.reward,
      to: `${ROUTES.REWARDS.REWARD}`,
      renderButton: [1],
    },
  ];
  return (
    <>
      <TabbableContainer className=""> 

        <Header
          items={items}
          buttons={[
            {
              buttonText: rewardDictionary.createReward,

              render: (
                <SideDrawer
                  title={rewardDictionary.createReward}
                  buttonText={rewardDictionary.createReward}
                  handleClose={() => dispatch(handleOpenComposer(false))}
                  handleOpen={() => dispatch(handleOpenComposer(true))}
                  isOpen={drawerOpen}
                  children={<Composer />} 
                />
              ),
            },
          ]}
        />
        <TopBar
          onSearch={(value) => {
            setFilter({ ...filter, search: value });
          }}
          buttons={[
            {
              name: rewardDictionary.rewards,
              onClick: () => setFilter({ filterType: 0 }),
            },
            {
              name: rewardDictionary.createdByMe,
              onClick: () => setFilter({ filterType: 1 }),
            },
            {
              name: rewardDictionary.forApproval,
              onClick: () => setFilter({ filterType: 2 }),
            },
            {
              name: rewardDictionary.rewardToMe,
              onClick: () => setFilter({ filterType: 3 }),
            },
          ]}
          segment={{
            onSegment: (value) => {
              if (value === rewardDictionary.table) {
                setTableView(true);
              } else {
                setTableView(false);
              }
            },
            label1: rewardDictionary.list,
            label2: rewardDictionary.table,
          }}
        />
        <ContBody>
          {loader && <Skeleton avatar paragraph={{ rows: 4 }} />}

          {tableView && (
            <Table
              columns={tableColumn(rewardDictionary)}
              dragable={true}
              handleChange={handleColumnSorting}
              data={rewards}
              onRow={onRow}
            />
          )}

          {rewards?.length > 0 && !loader && !tableView ? (
            <CardWrapper>
              {rewards.map((item, index) => {
                return (
                  <>
                    <ListItem
                      item={item}
                      id={item.id}
                      key={index}
                      onClick={() => setDetailId(item.id)}
                    />
                  </>
                );
              })}
            </CardWrapper>
          ) : (
            !loader && !tableView && <NoDataFound />
          )}
        </ContBody>
        {<DetailedView onClose={onClose} id={detailId} />}
      </TabbableContainer>
    </>
  );
};

export default Reward;
