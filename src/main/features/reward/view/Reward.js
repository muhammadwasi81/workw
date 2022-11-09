import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button, Drawer } from "antd";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton, Modal } from "antd";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
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

const Reward = props => {
  const { visible } = props;
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, rewardsDictionary } = dictionaryList[userLanguage];
  const isTablet = useMediaQuery({ maxWidth: 800 });
  const [detailId, setDetailId] = useState(false);

  const [sort, setSort] = useState(1);
  const [page, setPage] = useState(20);
  const [pageNo, setPageNo] = useState(1);
  const [tableView, setTableView] = useState(false);
  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();
  const { rewards, loader, rewardDetail, drawerOpen } = useSelector(
    state => state.rewardSlice
  );

  const [searchFilterValues, setSearchFilterValues] = useState();

  const onClose = () => {
    setDetailId(null);
  };

  useEffect(() => {
    dispatch(getAllRewards(filter));
  }, [filter]);

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        setDetailId(record.id)
      },
      onDoubleClick: (event) => { }, // double click row
      onContextMenu: (event) => { }, // right button click row
      onMouseEnter: (event) => { }, // mouse enter row
      onMouseLeave: (event) => { }, // mouse leave row
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
      name: 'Rewards',
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
              buttonText: "Create Reward",
              render: (
                <Button
                  className="ThemeBtn"
                  onClick={() => dispatch(handleOpenComposer(true))}
                >
                  Create Reward
                </Button>
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
              name: "Rewards",
              onClick: () => setFilter({ filterType: 0 }),
            },
            {
              name: "Created By Me",
              onClick: () => setFilter({ filterType: 1 }),
            },
            {
              name: "For Approval",
              onClick: () => setFilter({ filterType: 2 }),
            },
            {
              name: "Reward To Me",
              onClick: () => setFilter({ filterType: 3 }),
            },
          ]}
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
               {
                  loader && <Skeleton avatar paragraph={{ rows: 4 }} />
                }

               { 
                  tableView &&
                    <Table
                      columns={tableColumn()}
                      dragable={true}
                      handleChange={handleColumnSorting}
                      data={rewards}
                      onRow={onRow}

                    />
               }

              {
                rewards?.length > 0 && !loader && !tableView ? (
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
                ):
                !loader && !tableView && <NoDataFound/>
              }

          {/* {rewards?.length > 0 ? (
            tableView ? (
              <Table
                columns={tableColumn()}
                dragable={true}
                handleChange={handleColumnSorting}
                data={rewards}
                onRow={onRow}

              />
            ) : (
              <>
                {loader ? (
                  <>
                    <Skeleton avatar paragraph={{ rows: 4 }} />
                  </>
                ) : (
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
                )}
              </>
            )
          ) : (
            <Skeleton avatar paragraph={{ rows: 4 }} />
          )} */}
        </ContBody>
        {<DetailedView onClose={onClose} id={detailId} />}

        <Drawer
          title={
            <h1
              style={{
                fontSize: "20px",
                margin: 0,
              }}
            >
              Create Reward
            </h1>
          }
          width="768"
          onClose={() => {
            dispatch(handleOpenComposer(false));
          }}
          visible={drawerOpen}
          destroyOnClose={true}
          className="detailedViewComposer drawerSecondary"
        >
          <Composer />
        </Drawer>
      </TabbableContainer>
    </>
  );
};

export default Reward;
