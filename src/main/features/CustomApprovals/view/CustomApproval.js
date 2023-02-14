import React, { useEffect, useContext, useState } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton, Modal, Button, Drawer } from "antd";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllCustomApprovals, GetCustomApprovalById } from "../store/actions";
import FilterSearchButton from "../../../sharedComponents/FilterSearch";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";
import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";
import { ROUTES } from "../../../../utils/routes";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";

const CustomApproval = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { customApprovalDictionary } = customApprovalDictionaryList[
    userLanguage
  ];

  const [tableView, setTableView] = useState(false);

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({
    filterType: 0,
    search: "",
    sortBy: 1,
  });

  const dispatch = useDispatch();
  const {
    customApprovals,
    loader,
    customApprovalDetail,
    drawerOpen,
  } = useSelector((state) => state.customApprovalSlice);
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
  const items = [
    {
      name: customApprovalDictionary.customApproval,
      renderButton: [1],
      to: `${ROUTES.CUSTOM_APPROVALS.ROOT}`,
    },
  ];
  return (
    <>
      <TabbableContainer className="">
        <Header
          items={items}
          buttons={[
            {
              buttonText: customApprovalDictionary.create,
              render: (
                <SideDrawer
                  title={customApprovalDictionary.customApproval}
                  buttonText={customApprovalDictionary.createCustomApproval}
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
              name: customApprovalDictionary.customApprovals,
              onClick: () => setFilter({ filterType: 0 }),
            },
            {
              name: customApprovalDictionary.createdByMe,
              onClick: () => setFilter({ filterType: 1 }),
            },
            {
              name: customApprovalDictionary.forApproval,
              onClick: () => setFilter({ filterType: 2 }),
            },
            {
              name: customApprovalDictionary.approvalForMe,
              onClick: () => setFilter({ filterType: 3 }),
            },
          ]}
          filter={{
            onFilter: () => {},
          }}
          segment={{
            onSegment: (value) => {
              if (value === customApprovalDictionary.table) {
                setTableView(true);
              } else {
                setTableView(false);
              }
            },
            label1: customApprovalDictionary.list,
            label2: customApprovalDictionary.table,
          }}
        />
        <ContBody>
          {loader && <Skeleton avatar paragraph={{ rows: 4 }} />}

          {tableView && (
            <Table
              columns={tableColumn()}
              dragable={true}
              data={customApprovals}
            />
          )}

          {customApprovals?.length > 0 && !loader && !tableView ? (
            <CardWrapper>
              {customApprovals.map((item, index) => {
                return (
                  <ListItem
                    getCustomApprovalId={getCustomApprovalId}
                    item={item}
                    id={item.id}
                    key={index}
                  />
                );
              })}
            </CardWrapper>
          ) : (
            !loader && !tableView && <NoDataFound />
          )}
        </ContBody>
        {customApprovalDetail && (
          <DetailedView onClose={onClose} visible={visible} />
        )}
        {/* <Drawer
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

export default CustomApproval;
