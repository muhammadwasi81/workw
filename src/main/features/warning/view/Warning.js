import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Row, Button, Skeleton } from "antd";
import { warningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";

import { FilterFilled, UnorderedListOutlined, AppstoreFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllWarnings, GetWarningById } from "../store/actions";
import TableView from "./TableView";
// import "./warning.css";
import { dictionaryList } from "../../../../utils/localization/languages";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";

import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";

const Warning = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { warningDictionary } = warningDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);

  const isTablet = useMediaQuery({ maxWidth: 800 });

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();

  const { warnings, loader, warningDetail } = useSelector((state) => state.warningSlice);

  const onClose = () => {
    setVisible(false);
  };

  const getWarningId = (id) => {
    dispatch(GetWarningById(id));
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getAllWarnings(filter));
  }, [filter]);
  return (
    <TabbableContainer className="max-width-1190">
      <Header
        buttons={[
          {
            buttonText: "Create Travel",
            // onClick: () => setVisible(true),
            render: (
              <SideDrawer title={warningDictionary.createWarning} buttonText={warningDictionary.createWarning} isAccessDrawer={false}>
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
            name: "Warnings",
            onClick: () => setFilter({ filterType: 0 }),
          },
          {
            name: "For Approval",
            onClick: () => setFilter({ filterType: 1 }),
          },
          {
            name: "Warning To Me",
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
        {warnings && warnings.length > 0 ? (
          tableView ? (
            <div>
              <Table
                columns={tableColumn()}
                dragable={false}
                // handleChange={handleChange}
                // onPageChange={onPageChange}
                // onRow={onRow}
                data={warnings}
                // status={travelStatus}
                // loadding={loader}
                // success={success}
                // onActionClick={onActionClick}
              />
            </div>
          ) : (
            <>
              {loader ? (
                <>
                  <Skeleton avatar paragraph={{ rows: 4 }} />
                </>
              ) : (
                <CardWrapper>
                  {warnings.map((item, index) => {
                    return (
                      <>
                        <ListItem getWarningId={getWarningId} item={item} id={item.id} key={index} />
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
      {warningDetail && <DetailedView onClose={onClose} visible={visible} />}
    </TabbableContainer>
  );
};

export default Warning;
