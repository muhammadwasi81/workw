import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button, Skeleton, Drawer } from "antd";
import { leaveDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector,useDispatch } from "react-redux";
import { getAllLeaves, GetLeaveById } from "../store/actions";
import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import { CardWrapper } from "../../../layout/GridStyle";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";
import { ROUTES } from "../../../../utils/routes";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { FeaturePermissionEnum } from "../../../../utils/Shared/enums/featuresEnums";

const Leave = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, leaveDictionary } = leaveDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 800 });
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({ filterType: 0, search: "" });
  const [detailId, setDetailId] = useState(false);
  const {user} = useSelector((state) => state.userSlice);
  const userPermissions = user.permissions

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { leaves, loader, leaveDetail, drawerOpen } = useSelector(
    (state) => state.leaveSlice
  );

  console.log(leaves,"leavesleaves");

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

  const onClose = () => {
    setDetailId(null);
  };

  const getLeaveId = (id) => {
    dispatch(GetLeaveById(id));
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getAllLeaves(filter));
  }, [filter]);

  const items = [
    {
      name: leaveDictionary.leave,
      to: `${ROUTES.LEAVES.ROOT}`,
      renderButton: [1],
    },
  ];

  return (
    <>
      <TabbableContainer className="">
        <Header
          items={items}
          backButton={false}
          buttons={userPermissions.includes(FeaturePermissionEnum.CreateLeave) ? [
            {
              buttonText: leaveDictionary.createleave,
              render: (
                <SideDrawer
                  title={leaveDictionary.createleave}
                  buttonText={leaveDictionary.createleave}
                  handleClose={() => dispatch(handleOpenComposer(false))}
                  handleOpen={() => dispatch(handleOpenComposer(true))}
                  isOpen={drawerOpen}
                  children={<Composer />}
                />
              ),
            },
          ] : []}
       
        />
        <TopBar
          onSearch={(value) => {
            setFilter({ ...filter, search: value });
          }}
          buttons={[
            {
              name: leaveDictionary.leave,
              onClick: () => setFilter({ filterType: 0 }),
            },
            {
              name: leaveDictionary.createdByMe,
              onClick: () => setFilter({ filterType: 1 }),
            },
            {
              name: leaveDictionary.forApproval,
              onClick: () => setFilter({ filterType: 2 }),
            },
            {
              name: leaveDictionary.leaveToMe,
              onClick: () => setFilter({ filterType: 3 }),
            },
          ]}
          segment={{
            onSegment: (value) => {
              if (value === leaveDictionary.table) {
                setTableView(true);
              } else {
                setTableView(false);
              }
            },
            label1: leaveDictionary.list,
            label2: leaveDictionary.table,
          }}
        />
        <ContBody>
          {loader && <Skeleton avatar paragraph={{ rows: 4 }} />}

          {tableView && (
            <Table
              columns={tableColumn(leaveDictionary)}
              dragable={true}
              data={leaves}
              onRow={onRow}
            />
          )}
          {leaves?.length > 0 && !loader && !tableView ? (
            <CardWrapper>
              {leaves.map((item, index) => {
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

          {/* {leaves?.length > 0 ? (
            tableView ? (
              <Table columns={tableColumn()} dragable={true} data={leaves} />
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
            <div className="flex items-center justify-center h-full w-full">
              <img src={Nodata} />
            </div>
          )} */}
        </ContBody>
        {leaveDetail && <DetailedView onClose={onClose} id={detailId} />}
        {/* <Drawer
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
            dispatch(handleOpenComposer(false));
          }}
          visible={drawerOpen}
          destroyOnClose={true}
          className="detailedViewComposer drawerSecondary"
        >
          <Composer />
        </Drawer> */}
      </TabbableContainer>
    </>
  );
};

export default Leave;
