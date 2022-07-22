import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Row, Button, Skeleton } from "antd";
import { bonusDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllBonus, GetBonusById, GetPromotionById } from "../store/actions";
import TableView from "./TableView";
// import "./warning.css";
import { dictionaryList } from "../../../../utils/localization/languages";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";

import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";

const Bonus = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { bonusDictionary } = bonusDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();

  const { bonuses, loader, bonusDetail } = useSelector((state) => state.bonusSlice);

  const onClose = () => {
    setVisible(false);
  };

  const getBonusId = (id) => {
    dispatch(GetBonusById(id));
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getAllBonus(filter));
  }, [filter]);
  return (
    <TabbableContainer className="max-width-1190">
      <Header
        buttons={[
          {
            buttonText: "Create Bonus",
            // onClick: () => setVisible(true),
            render: (
              <SideDrawer title={bonusDictionary.createBonus} buttonText={bonusDictionary.createBonus} isAccessDrawer={false}>
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
            name: "Bonus",
            onClick: () => setFilter({ filterType: 0 }),
          },
          {
            name: "My Bonus",
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
                        <ListItem getBonusId={getBonusId} item={item} id={item.id} key={index} />
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
      {bonusDetail && <DetailedView onClose={onClose} visible={visible} />}
    </TabbableContainer>
  );
};

export default Bonus;
