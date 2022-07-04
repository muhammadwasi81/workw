import React, { useEffect, useContext, useState } from "react";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton, Modal } from "antd";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllCustomApprovals } from "../store/actions";
import TableView from "./TableView";

// import "./reward.css";
import FilterSearchButton from "../../../sharedComponents/FilterSearch";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";
import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";

const CustomApproval = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { customApprovalDictionary } = customApprovalDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();
  const { customApprovals, loader, rewardDetail } = useSelector((state) => state.customApprovalSlice);
  const [searchFilterValues, setSearchFilterValues] = useState();

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch(getAllCustomApprovals(filter));
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
              buttonText: "Create Custom Approval",
              // onClick: () => setVisible(true),
              render: (
                <SideDrawer
                  title={customApprovalDictionary.createCustomApproval}
                  buttonText={customApprovalDictionary.createCustomApproval}
                  isAccessDrawer={false}>
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
              name: "Custom Approvals",
              onClick: () => setFilter({ filterType: 0 }),
            },
            {
              name: "For Approval",
              onClick: () => setFilter({ filterType: 1 }),
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
          {customApprovals?.length > 0 ? (
            tableView ? (
              <div></div>
            ) : (
              <>
                {loader ? (
                  <>
                    <Skeleton avatar paragraph={{ rows: 4 }} />
                  </>
                ) : (
                  <CardWrapper>
                    {customApprovals.map((item, index) => {
                      return (
                        <>
                          <ListItem item={item} id={item.id} key={index} />
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
        {rewardDetail && <DetailedView onClose={onClose} visible={visible} />}
      </TabbableContainer>
    </>
  );
};

export default CustomApproval;
