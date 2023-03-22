import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button, Skeleton, Drawer } from "antd";
import { warningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllWarnings, GetWarningById } from "../store/actions";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";

import { NoDataFound } from "../../../sharedComponents/NoDataIcon";

import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";
import { ROUTES } from "../../../../utils/routes";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { FeaturePermissionEnum } from "../../../../utils/Shared/enums/featuresEnums";

const Warning = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { warningDictionary } = warningDictionaryList[userLanguage];
  const { tables } = warningDictionary;
  const { user } = useSelector((state) => state.userSlice);
  const userPermissions = user.permissions;
  const [detailId, setDetailId] = useState(false);
  const [tableView, setTableView] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 800 });
  const [visible, setVisible] = useState(false);
  // const [search, setSearch] = useState("");

  const [filter, setFilter] = useState({
    filterType: 0,
    search: "",
    sortBy: 1,
    pageSize: 50,
  });
  console.log(filter, "filterrrr");
  const dispatch = useDispatch();

  const { warnings, loader, warningDetail, drawerOpen } = useSelector(
    (state) => state.warningSlice
  );

  useEffect(() => {
    dispatch(getAllWarnings(filter));
  }, [filter]);

  const items = [
    {
      name: warningDictionary.warning,
      to: `${ROUTES.WARNINGS.ROOT}`,
      renderButton: [1],
    },
  ];

  const onClose = () => {
    setDetailId(null);
  };

  return (
    <TabbableContainer className="max-width-1190">
      <Header
        items={items}
        buttons={
          userPermissions.includes(FeaturePermissionEnum.CreateWarnings)
            ? [
                {
                  buttonText: "Create Warning",
                  render: (
                    <SideDrawer
                      title={warningDictionary.createWarning}
                      buttonText={warningDictionary.createWarning}
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
          console.log(value);
          setFilter({ ...filter, search: value });
        }}
        buttons={[
          {
            name: warningDictionary.warning,
            onClick: () => setFilter({ filterType: 0 }),
          },
          {
            name: warningDictionary.createdByMe,
            onClick: () => setFilter({ filterType: 1 }),
          },
          {
            name: warningDictionary.forApproval,
            onClick: () => setFilter({ filterType: 2 }),
          },
          {
            name: warningDictionary.warningToMe,
            onClick: () => setFilter({ filterType: 3, pageNo: 1 }),
          },
        ]}
        segment={{
          onSegment: (value) => {
            if (value === warningDictionary.table) {
              setTableView(true);
            } else {
              setTableView(false);
            }
          },
          label1: warningDictionary.list,
          label2: warningDictionary.table,
        }}
      />
      <ContBody>
        {loader && <Skeleton avatar paragraph={{ rows: 4 }} />}

        {tableView && (
          <Table
            columns={tableColumn(tables)}
            dragable={true}
            data={warnings}
          />
        )}

        {warnings?.length > 0 && !loader && !tableView ? (
          <CardWrapper>
            {warnings.map((item, index) => {
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

export default Warning;
