import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Row, Button, Skeleton } from "antd";
import { promotionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllPromotions, GetPromotionById } from "../store/actions";
import TableView from "./TableView";
// import "./warning.css";
import { dictionaryList } from "../../../../utils/localization/languages";
import { CardWrapper } from "../../../layout/GridStyle";

import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";

const Reward = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { promotionDictionary } = promotionDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();

  const { promotions, loader, promotionDetail } = useSelector((state) => state.promotionSlice);

  const onClose = () => {
    setVisible(false);
  };

  const getPromotionId = (id) => {
    dispatch(GetPromotionById(id));
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getAllPromotions(filter));
  }, [filter]);
  return (
    <TabbableContainer className="max-width-1190">
      <Header
        buttons={[
          {
            buttonText: "Create Promotion",
            // onClick: () => setVisible(true),
            render: (
              <SideDrawer title={promotionDictionary.createPromotion} buttonText={promotionDictionary.createPromotion} isAccessDrawer={false}>
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
            name: "Promotions",
            onClick: () => setFilter({ filterType: 0 }),
          },
          {
            name: "My Promotions",
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
        {promotions && promotions.length > 0 ? (
          tableView ? (
            <div>
              <Table
                columns={tableColumn()}
                dragable={false}
                // handleChange={handleChange}
                // onPageChange={onPageChange}
                // onRow={onRow}
                data={promotions}
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
                  {promotions.map((item, index) => {
                    return (
                      <>
                        <ListItem getPromotionId={getPromotionId} item={item} id={item.id} key={index} />
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
      {promotionDetail && <DetailedView onClose={onClose} visible={visible} />}
    </TabbableContainer>
  );
};

export default Reward;
