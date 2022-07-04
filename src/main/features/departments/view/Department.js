import React, { useEffect, useContext, useState } from "react";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton } from "antd";
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
import { Avatar, Card } from "antd";
const { Meta } = Card;

const Department = (props) => {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { departmentDictionary } = departmentDictionaryList[userLanguage];

  const [loading, setLoading] = useState(true);
  const [tableView, setTableView] = useState(false);
  const [visible, setVisible] = useState(false);

  const { departments, loader, departmentDetail } = useSelector((state) => state.departmentSlice);
  const [searchFilterValues, setSearchFilterValues] = useState();

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch(getAllDepartments());
  }, []);

  return (
    <>
      <TabbableContainer className="">
        <Header
          buttons={[
            {
              buttonText: "Create Department",
              // onClick: () => setVisible(true),
              render: (
                <SideDrawer title={departmentDictionary.createDepartment} buttonText={departmentDictionary.createDepartment} isAccessDrawer={false}>
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
          {departments?.length > 0 ? (
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
                    <CardWrapper2>
                      <Skeleton loading={loading} avatar active>
                        <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} title="Card title" description="This is the description" />
                      </Skeleton>
                      <Skeleton loading={loading} avatar active>
                        <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} title="Card title" description="This is the description" />
                      </Skeleton>
                    </CardWrapper2>
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
              </>
            )
          ) : (
            "Data not found"
          )}
        </ContBody>
        {departmentDetail && <DetailedView onClose={onClose} visible={visible} />}
      </TabbableContainer>
    </>
  );
};

export default Department;
