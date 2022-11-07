import React, { useEffect, useContext, useState } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button, Skeleton, Drawer } from "antd";
import { bonusDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllBonus } from "../store/actions";
import { dictionaryList } from "../../../../utils/localization/languages";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";

import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";
import { ROUTES } from "../../../../utils/routes";
import Nodata from "../../../../content/NewContent/eLearning/no_data.svg";

const Bonus = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { bonusDictionary } = bonusDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);

  const [visible, setVisible] = useState(false);

  const [detailId, setDetailId] = useState(false);

  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();

  const { bonuses, loader, bonusDetail, drawerOpen } = useSelector(
    (state) => state.bonusSlice
  );

  const onClose = () => {
    setDetailId(null);
    setVisible(false);
  };

  useEffect(() => {
    dispatch(getAllBonus(filter));
  }, [filter]);
  const items = [
    {
      name: "Bonus",
      renderButton: [1],
      to: `${ROUTES.BONUS.DEFAULT}`,
    },
  ];
  return (
    <TabbableContainer className="max-width-1190">
      <Header
        items={items}
        buttons={[
          {
            buttonText: "Create Bonus",
            render: (
              <Button
                className="ThemeBtn"
                onClick={() => dispatch(handleOpenComposer(true))}
              >
                Create Bonus
              </Button>
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
            name: "Bonus",
            onClick: () => setFilter({ filterType: 0 }),
          },
          {
            name: "Created By Me",
            onClick: () => setFilter({ filterType: 1 }),
          },
          {
            name: "For Approvals",
            onClick: () => setFilter({ filterType: 2 }),
          },
          {
            name: "Bonus To Me",
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
        {bonuses && bonuses.length > 0 ? (
          tableView ? (
            <div>
              <Table columns={tableColumn()} dragable={false} data={bonuses} />
            </div>
          ) : (
            <>
              {loader ? (
                <>
                  <Skeleton avatar paragraph={{ rows: 4 }} />
                </>
              ) : (
                <CardWrapper>
                  {bonuses.map((item, index) => {
                    return (
                      <>
                        {/*  */}
                        <ListItem
                          item={item}
                          id={item.id}
                          key={index}
                          onClick={() => setDetailId(item.id)}
                        />
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
      {<DetailedView onClose={onClose} id={detailId} />}
      <Drawer
        title={
          <h1
            style={{
              fontSize: "20px",
              margin: 0,
            }}
          >
            Create Bonus
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
      </Drawer>
    </TabbableContainer>
  );
};

export default Bonus;
