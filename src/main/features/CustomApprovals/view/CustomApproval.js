import React, { useEffect, useContext, useState } from "react";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton, Modal, Button, Drawer } from "antd";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllCustomApprovals, GetCustomApprovalById } from "../store/actions";
import TableView from "./TableView";

// import "./reward.css";
import FilterSearchButton from "../../../sharedComponents/FilterSearch";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";
import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";

const CustomApproval = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { customApprovalDictionary } = customApprovalDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();
  const { customApprovals, loader, customApprovalDetail, drawerOpen } = useSelector((state) => state.customApprovalSlice);
  const [searchFilterValues, setSearchFilterValues] = useState();

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch(getAllCustomApprovals(filter));
  }, [filter]);

  const getCustomApprovalId = (id) => {
    dispatch(GetCustomApprovalById(id));
    setVisible(true);
  };

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
              render: (
                <Button className="ThemeBtn" onClick={() => dispatch(handleOpenComposer(true))} >
                  Create Custom Approval
                </Button>
              ),
            },
          ]}
        />
        <TopBar
          onSearch={(value) => {
            setFilter({ ...filter, search: value })
          }}
          buttons={[
            {
              name: "Custom Approvals",
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
              name: "Approvals For Me",
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
          {customApprovals?.length > 0 ? (
            tableView ? (
              <Table
                columns={tableColumn()}
                dragable={true}
                data={customApprovals}
              />
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
                          <ListItem getCustomApprovalId={getCustomApprovalId} item={item} id={item.id} key={index} />
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
        {customApprovalDetail && <DetailedView onClose={onClose} visible={visible} />}
        <Drawer
          title={
            <h1
              style={{
                fontSize: "20px",
                margin: 0,
              }}
            >
              Create Custom Approval
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

export default CustomApproval;
