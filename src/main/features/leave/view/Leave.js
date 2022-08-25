import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button, Skeleton, Drawer } from "antd";
import { leaveDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllLeaves, GetLeaveById, } from "../store/actions";
import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import { CardWrapper } from "../../../layout/GridStyle";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";

const Leave = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, leaveDictionary } = leaveDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 800 });
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { leaves, loader, leaveDetail, drawerOpen } = useSelector((state) => state.leaveSlice);

  const onClose = () => {
    setVisible(false);
  };

  const getLeaveId = (id) => {
    dispatch(GetLeaveById(id));
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getAllLeaves(filter));
  }, [filter]);
  return (
    <>
      <TabbableContainer className="">
        <Header
          buttons={[
            {
              buttonText: "Create Leave",
              render: (
                <Button className="ThemeBtn" onClick={() => dispatch(handleOpenComposer(true))} >
                  Create Leave
                </Button>
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
              name: "leaves",
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
              name: "Leave To Me",
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
          {leaves?.length > 0 ? (
            tableView ? (
              <Table
                columns={tableColumn()}
                dragable={true}
                data={leaves}
              />
            ) : (
              <>
                {loader ? (
                  <>
                    <Skeleton avatar paragraph={{ rows: 4 }} />
                  </>
                ) : (
                  <CardWrapper>
                    {leaves.map((item, index) => {
                      return (
                        <>
                           <ListItem getLeaveById={getLeaveId} item={item} id={item.id} key={index} />
                        </>
                      );
                    })}
                  </CardWrapper>
                )}
              </>
            )
          ) : (
            <Skeleton avatar paragraph={{ rows: 4 }} />
          )}
        </ContBody>
        {/* <ContBody>
          <CardWrapper>
            {leaves && leaves.length > 0 ? (
              tableView ? (
                <Table
                  columns={tableColumn()}
                  dragable={true}
                  data={leaves}
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
                          <ListItem getRewardId={getRewardId} item={item} id={item.id} key={index} />
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
          </ContBody> */}
        {leaveDetail && <DetailedView onClose={onClose} visible={visible} />}
        <Drawer
          title={
            <h1
              style={{
                fontSize: "20px",
                margin: 0,
              }}
            >
              Create Leave
            </h1>
          }
          width="768"
          onClose={() => {
            dispatch(handleOpenComposer(false))
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

export default Leave;
