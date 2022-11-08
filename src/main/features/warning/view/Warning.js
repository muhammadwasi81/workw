import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
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

import Nodata from "../../../../content/NewContent/eLearning/no_data.svg";

import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";
import { ROUTES } from "../../../../utils/routes";

const Warning = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { warningDictionary } = warningDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);

  const isTablet = useMediaQuery({ maxWidth: 800 });

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();

  const { warnings, loader, warningDetail, drawerOpen } = useSelector((state) => state.warningSlice);

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

  const items = [
    {
      name: 'Warning',
      to: `${ROUTES.WARNINGS.DEFAULT}`,
      renderButton: [1],
    },
  ];

  return (
    <TabbableContainer className="max-width-1190">
      <Header
        items={items}
        buttons={[
          {
            buttonText: "Create Warning",
            render: (
              <Button className="ThemeBtn" onClick={() => dispatch(handleOpenComposer(true))} >
                Create Warning
              </Button>
              // <SideDrawer title={warningDictionary.createWarning} buttonText={warningDictionary.createWarning} isAccessDrawer={false}>
              //   <Composer />
              // </SideDrawer>
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
            name: "Created By Me",
            onClick: () => setFilter({ filterType: 1 }),
          },
          {
            name: "For Approval",
            onClick: () => setFilter({ filterType: 2 }),
          },
          {
            name: "Warning To Me",
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
        {warnings && warnings.length > 0 ? (
          tableView ? (
            <div>
              <Table
                columns={tableColumn()}
                dragable={false}
                data={warnings}
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
					<div className="flex items-center justify-center h-full w-full">
					  <img src={Nodata} />
					</div>
				)}
      </ContBody>
      {warningDetail && <DetailedView onClose={onClose} visible={visible} />}
      <Drawer
        title={
          <h1
            style={{
              fontSize: "20px",
              margin: 0,
            }}
          >
            Create Warning
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
  );
};

export default Warning;
