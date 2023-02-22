import React, { useEffect, useContext, useState } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button, Skeleton, Drawer } from "antd";
import { promotionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllPromotions, GetPromotionById } from "../store/actions";
import TableView from "./TableView";
import { CardWrapper } from "../../../layout/GridStyle";

import { NoDataFound } from "../../../sharedComponents/NoDataIcon";

import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";
import { ROUTES } from "../../../../utils/routes";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { FeaturePermissionEnum } from "../../../../utils/Shared/enums/featuresEnums";

const Promotion = (props) => {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { promotionDictionary } = promotionDictionaryList[userLanguage];
  const { tables } = promotionDictionary;
  const {user} = useSelector((state) => state.userSlice);
  const CreatePermission = FeaturePermissionEnum.CreatePromotion
  const userPermissions = user.permissions

  const [promotionId, setPromotionId] = useState("");

  const [tableView, setTableView] = useState(false);

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({
    filterType: 0,
    search: "",
    sortBy: 1,
  });

  const { promotions, loader, promotionDetail, drawerOpen } = useSelector(
    (state) => state.promotionSlice
  );

  const onClose = () => {
    setVisible(false);
  };

  const getPromotionId = (id) => {
    setPromotionId(id);
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getAllPromotions(filter));
  }, [filter]);

  const items = [
    {
      name: promotionDictionary.promotion,
      renderButton: [1],
      to: `${ROUTES.PROMOTION.ROOT}`,
      
    },
  ];

  return (
    <TabbableContainer className="max-width-1190">
      <Header
        items={items}
        buttons={userPermissions.includes(CreatePermission) ?[
          {
            buttonText: "Create Promotions",
            render: (
              <SideDrawer
                title={promotionDictionary.createPromotion}
                buttonText={promotionDictionary.createPromotion}
                handleClose={() => dispatch(handleOpenComposer(false))}
                handleOpen={() => dispatch(handleOpenComposer(true))}
                isOpen={drawerOpen}
                children={<Composer />}
              />
            ),
          },
        ] : []}
      />
      <TopBar
        onSearch={(value) => {
          setFilter({ ...filter, search: value });
        }}
        buttons={[
          {
            name: promotionDictionary.promotion,
            onClick: () => setFilter({ filterType: 0 }),
          },
          {
            name: promotionDictionary.createdbyMe,
            onClick: () => setFilter({ filterType: 1 }),
          },
          {
            name: promotionDictionary.forApproval,
            onClick: () => setFilter({ filterType: 2 }),
          },
          {
            name: promotionDictionary.promotionToMe,
            onClick: () => setFilter({ filterType: 3 }),
          },
        ]}
        segment={{
          onSegment: (value) => {
            if (value === promotionDictionary.table) {
              setTableView(true);
            } else {
              setTableView(false);
            }
          },
          label1: promotionDictionary.list,
          label2: promotionDictionary.table,
        }}
      />
      <ContBody>
        {loader && <Skeleton avatar paragraph={{ rows: 4 }} />}

        {tableView && (
          <Table columns={tableColumn(tables)} dragable={true} data={promotions} />
        )}

        {promotions?.length > 0 && !loader && !tableView ? (
          <CardWrapper>
            {promotions.map((item, index) => {
              return (
                <ListItem
                  getPromotionId={getPromotionId}
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
      {promotionDetail && <DetailedView onClose={onClose} visible={visible} />}

      <DetailedView onClose={onClose} visible={visible} id={promotionId} />
    </TabbableContainer>
  );
};

export default Promotion;
