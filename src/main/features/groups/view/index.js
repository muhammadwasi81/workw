import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllGroup } from ".././store/actions";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { groupsDictionaryList } from ".././localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { ROUTES } from "../../../../utils/routes";
import { tableColumn } from "./UI/TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import Composer from "./UI/Composer";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import GridView from "./GridView/GridView";
import Spinner from "../../../sharedComponents/spinner/spinner";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import { handleOpenComposer } from "../store/slice";
import { FeaturePermissionEnum } from "../../../../utils/Shared/enums/featuresEnums";
import { NoDataFound } from "../../../sharedComponents/NoDataIcon";

const Groups = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { groupsDictionary, Direction } = groupsDictionaryList[userLanguage];
  const { createTextBtn, topBar } = groupsDictionary;
  const [search, setSearch] = useState("");
  const value = useDebounce(search, 500);
  const { user } = useSelector((state) => state.userSlice);
  const userPermissions = user.permissions;

  const [tableView, setTableView] = useState(false);
  const { groups, success, getDataLoading, drawerOpen, loader } = useSelector(
    (state) => state.groupSlice
  );

  useEffect(() => {
    dispatch(
      getAllGroup({
        pageNo: 1,
        pageSize: 20,
        search: value,
        sortBy: 1,
      })
    );
  }, [value]);
  const handleClickNavigation = (id) => {
    navigate(`${ROUTES.GROUP.DEFAULT}/${id}`);
  };
  const items = [
    {
      name: topBar.group,
      to: "/groups",
      renderButton: [1],
    },
  ];
  return (
    <>
      <TabbableContainer className="">
        <Header
          items={items}
          buttons={
            userPermissions.includes(FeaturePermissionEnum.CreateGroup)
              ? [
                  {
                    buttonText: createTextBtn,

                    render: (
                      <SideDrawer
                        title={createTextBtn}
                        buttonText={createTextBtn}
                        handleClose={() => dispatch(handleOpenComposer(false))}
                        handleOpen={() => dispatch(handleOpenComposer(true))}
                        isOpen={drawerOpen}
                      >
                        <Composer />
                      </SideDrawer>
                    ),
                  },
                ]
              : []
          }
        />
        <TopBar
          onSearch={(value) => {
            setSearch(value);
          }}
          segment={{
            onSegment: (value) => {
              if (value === topBar.table) {
                setTableView(true);
              } else {
                setTableView(false);
              }
            },
            label1: topBar.list,
            label2: topBar.table,
          }}
        />
        <ContBody className="!block" direction={Direction}>
          {tableView && (
            <Table
              columns={tableColumn(groupsDictionary)}
              dragable={true}
              data={groups}
            />
          )}
          {groups.length > 0 && !loader && !tableView ? (
            <GridView
              data={groups ? groups : []}
              loading={getDataLoading}
              dispatch={dispatch}
              handleClickNavigation={handleClickNavigation}
              dictionary={groupsDictionary}
            />
          ) : (
            !loader && !tableView && <NoDataFound />
          )}
        </ContBody>
      </TabbableContainer>
    </>
  );
};

export default Groups;
