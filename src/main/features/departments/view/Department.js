import React, { useEffect, useContext, useState } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { List, Skeleton } from "antd";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllDepartments, GetRewardById } from "../store/actions";
import FilterSearchButton from "../../../sharedComponents/FilterSearch";
import { CardWrapper2 } from "../../../sharedComponents/Card/CardStyle";
import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { Avatar, Card, Space, Button, Drawer } from "antd";
import { toggleCreateComposer } from "../store/slice";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";
const { Meta } = Card;

const Department = (props) => {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { departmentDictionary, Direction } = departmentDictionaryList[
    userLanguage
  ];

  const [loading, setLoading] = useState(true);
  const [tableView, setTableView] = useState(false);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const {
    departments,
    loader,
    departmentDetail,
    isCreateComposer,
  } = useSelector((state) => state.departmentSlice);
  const [searchFilterValues, setSearchFilterValues] = useState();

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch(
      getAllDepartments({
        // filter,
        pageSize: 20,
        search,
      })
    );
  }, [search]);

  // useEffect(()=>{

  // },[departments])
  // const onSearch = (value) => setSearch(value);
  return (
    <>
      <TabbableContainer className="">
        <Header
          buttons={[
            {
              buttonText: "Create Department",

              render: (
                <Button
                  className="ThemeBtn"
                  onClick={() => {
                    dispatch(toggleCreateComposer());
                  }}
                >
                  {departmentDictionary.createDepartment}
                </Button>
              ),
            },
          ]}
        />
        <TopBar
          onSearch={(val) => setSearch(val)}
          // buttons={[
          //   {
          //     name: "Departments",
          //     onClick: () => setFilter({ filterType: 0 }),
          //   },
          // ]}
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
          {loader && <Skeleton active={false} />}

          {tableView && (
            <Table
              columns={tableColumn()}
              dragable={true}
              // handleChange={handleChange}
              // onPageChange={onPageChange}
              // onRow={onRow}
              data={departments}
              // status={travelStatus}
              // loadding={loader}
              // success={success}
              // onActionClick={onActionClick}
            />
          )}

          {departments?.length > 0 && !loader && !tableView ? (
            <CardWrapper2>
              {departments.map((item, index) => {
                return (
                  <>
                    <ListItem item={item} id={item.id} key={index} />
                  </>
                );
              })}
            </CardWrapper2>
          ) : (
            !loader && !tableView && <NoDataFound />
          )}
          {/* {departments?.length > 0 ? (
            tableView ? (
              <Table
                columns={tableColumn()}
                dragable={true}
                // handleChange={handleChange}
                // onPageChange={onPageChange}
                // onRow={onRow}
                data={departments}
                // status={travelStatus}
                // loadding={loader}
                // success={success}
                // onActionClick={onActionClick}
              />
            ) : (
              <>
                {loader ? (
                  <>
                    {[...Array(20)].map((item) => {
                      return (
                        <CardWrapper2>
                          <Skeleton active={false} />
                        </CardWrapper2>
                      );
                    })}
                  </>
                ) : (
                  <CardWrapper2>
                    {departments.map((item, index) => {
                      return (
                        <>
                          <ListItem item={item} id={item.id} key={index} />
                        </>
                      );
                    })}
                  </CardWrapper2>
                )}
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Card title"
                    description="This is the description"
                  />
                </Skeleton>
                <CardWrapper2>
                  {[...Array(9)].map((item) => (
                    <Skeleton active={false} />
                  ))}
                </CardWrapper2>
              </>
            )
          ) : (
            <CardWrapper2>
              {[...Array(20)].map((item) => {
                return (
                  <CardWrapper2>
                    <Skeleton active={false} />
                  </CardWrapper2>
                );
              })}
            </CardWrapper2>
          )} 
        */}
        </ContBody>
        <Drawer
          title={
            <h1
              style={{
                fontSize: "20px",
                margin: 0,
                textAlign: Direction === "ltr" ? "" : "end",
              }}
            >
              {departmentDictionary.createDepartment}
            </h1>
          }
          placement={Direction === "rtl" ? "left" : "right"}
          width="768"
          onClose={() => {
            dispatch(toggleCreateComposer());
          }}
          visible={isCreateComposer}
          destroyOnClose={true}
          className="detailedViewComposer drawerSecondary"
        >
          <Composer />
        </Drawer>
      </TabbableContainer>
    </>
  );
};

export default Department;
