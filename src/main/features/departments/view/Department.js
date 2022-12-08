import React, { useEffect, useContext, useState } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { List, Skeleton } from "antd";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector, useDispatch } from "react-redux";
import { STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import { getAllDepartments, GetRewardById } from "../store/actions";
import FilterSearchButton from "../../../sharedComponents/FilterSearch";
import { CardWrapper2 } from "../../../sharedComponents/Card/CardStyle";
import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header";
import { Avatar, Card, Space, Button, Drawer } from "antd";
import { handleParentId, toggleCreateComposer } from "../store/slice";
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
    dispatch(handleParentId(STRINGS.DEFAULTS.guid));
  }, []);

  useEffect(() => {
    dispatch(
      getAllDepartments({
        // filter,
        pageSize: 20,
        search,
        sortBy: 1,
        parentId: STRINGS.DEFAULTS.guid,
      })
    );
  }, [search]);

  // useEffect(()=>{

  // },[departments])
  // const onSearch = (value) => setSearch(value);

  const items = [
    {
      name: departmentDictionary.departments,
      to: `${ROUTES.DEPARTMENTS.DEPARTMENT}`,
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
              buttonText: departmentDictionary.createDepartment,

              render: (
                <SideDrawer
                  title={departmentDictionary.createDepartment}
                  buttonText={departmentDictionary.createDepartment}
                  handleClose={() => dispatch(toggleCreateComposer(false))}
                  handleOpen={() => dispatch(toggleCreateComposer(true))}
                  isOpen={isCreateComposer}
                  children={<Composer />}
                />
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
              if (value === departmentDictionary.table) {
                setTableView(true);
              } else {
                setTableView(false);
              }
            },
            label1: departmentDictionary.list,
            label2: departmentDictionary.table,
          }}
        />
        <ContBody>
          {loader && <Skeleton active={false} />}

          {tableView && (
            <Table
              columns={tableColumn(departmentDictionary)}
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
      </TabbableContainer>
    </>
  );
};

export default Department;
