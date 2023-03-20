import React, { useEffect, useContext, useState } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton } from "antd";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { complainDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllComplains } from "../store/actions";
import { Table } from "../../../sharedComponents/customTable";
import Header from "../../../layout/header/index";

// import "./complain.css";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";

import { tableColumn } from "./TableColumn";
import TopBar from "../../../sharedComponents/topBar/topBar";
import { handleOpenComposer } from "../store/slice";
import { ROUTES } from "../../../../utils/routes";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { FeaturePermissionEnum } from "../../../../utils/Shared/enums/featuresEnums";

const Complain = () => {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { complainDictionary } = complainDictionaryList[userLanguage];
  const { user } = useSelector((state) => state.userSlice);
  const userPermissions = user.permissions;
  // const {
  //   createComplain,
  //   Direction,
  //   Complains,
  //   createdByMe,
  //   forApproval,
  //   complainToMe,
  //   list,
  //   table,
  // } = complainDictionary;
  const [detailId, setDetailId] = useState(false);

  const [sort, setSort] = useState(1);
  const [page, setPage] = useState(20);
  const [pageNo, setPageNo] = useState(1);
  const [tableView, setTableView] = useState(false);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({
    filterType: 0,
    search: "",
    sortBy: 1,
    pageSize: 50,
  });
  const [complainId, setComplainId] = useState("");

  const {
    complains,
    complainDetail,
    loader,
    drawerOpen,
    loadingData,
  } = useSelector((state) => state.complainSlice);

  const onClose = () => {
    setDetailId(null);
  };

  const getComplainById = (id) => {
    setComplainId(id);
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getAllComplains(filter));
  }, [filter]);

  const items = [
    {
      name: complainDictionary.Complains,
      to: `${ROUTES.COMPLAINS.ROOT}`,
      renderButton: [1],
    },
  ];

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        setComplainId(record.id);
        setVisible(true);
      },
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
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
  // const { id } = props;
  return (
    <TabbableContainer className="max-width-1190">
      <Header
        items={items}
        buttons={
          userPermissions.includes(FeaturePermissionEnum.CreateComplains)
            ? [
                {
                  buttonText: complainDictionary.createComplain,
                  render: (
                    <SideDrawer
                      title={complainDictionary.createComplain}
                      buttonText={complainDictionary.createComplain}
                      handleClose={() => dispatch(handleOpenComposer(false))}
                      handleOpen={() => dispatch(handleOpenComposer(true))}
                      isOpen={drawerOpen}
                      children={<Composer />}
                    />
                  ),
                },
              ]
            : []
        }
      />
      <TopBar
        onSearch={(value) => {
          setFilter({ ...filter, search: value });
        }}
        buttons={[
          {
            name: complainDictionary.Complains,
            onClick: () => setFilter({ filterType: 0 }),
          },
          {
            name: complainDictionary.createdByMe,
            onClick: () => setFilter({ filterType: 1 }),
          },
          {
            name: complainDictionary.forApproval,
            onClick: () => setFilter({ filterType: 2 }),
          },
          {
            name: complainDictionary.complainToMe,
            onClick: () => setFilter({ filterType: 3 }),
          },
        ]}
        segment={{
          onSegment: (value) => {
            if (value === complainDictionary.table) {
              setTableView(true);
            } else {
              setTableView(false);
            }
          },
          label1: complainDictionary.list,
          label2: complainDictionary.table,
        }}
      />
      <ContBody>
        {loader && <Skeleton avatar paragraph={{ rows: 4 }} />}
        {tableView && (
          <Table
            columns={tableColumn(complainDictionary)}
            dragable={true}
            data={complains}
            onRow={onRow}
          />
        )}

        {complains?.length > 0 && !loader && !tableView ? (
          <CardWrapper>
            {complains.map((item, index) => {
              return (
                <ListItem
                  item={item}
                  id={item.id}
                  key={index}
                  onClick={() => setDetailId(item.id)}
                />
              );
            })}
          </CardWrapper>
        ) : (
          !loader && !tableView && <NoDataFound />
        )}
      </ContBody>
      {<DetailedView onClose={onClose} id={detailId} />}
    </TabbableContainer>
  );
};

export default Complain;
