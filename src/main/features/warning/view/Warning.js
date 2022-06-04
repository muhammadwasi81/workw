import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../../components/SharedComponent/AppComponents/MainHeader";
import {
  ContBody,
  HeaderMenuContainer,
  TabbableContainer,
} from "../../../../components/SharedComponent/AppComponents/MainFlexContainer";
import { Row, Button, Skeleton } from "antd";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import TopBar from "../../../sharedComponents/topBar/topBar";
import {
  FilterFilled,
  UnorderedListOutlined,
  AppstoreFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllWarnings, GetWarningById } from "../store/actions";
import TableView from "./TableView";
import BarNavLink from "../../../sharedComponents/topBar/BarNavLink";
import "./warning.css";

const Reward = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, complainDictionary } = dictionaryList[userLanguage];

  const [grid, setGrid] = useState(false);

  const isTablet = useMediaQuery({ maxWidth: 800 });

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({ filterType: 1, search: "" });

  const dispatch = useDispatch();

  const { warnings, loader, warningDetail } = useSelector(
    (state) => state.warningSlice
  );

  const onClose = () => {
    setVisible(false);
  };

  const getRewardId = (id) => {
    dispatch(GetWarningById(id));
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getAllWarnings(filter));
  }, [filter]);
  return (
    <TabbableContainer className="max-width-1190">
      <ContainerHeader>
        <HeaderMenuContainer></HeaderMenuContainer>
        <div className="right-menu" style={{ paddingRight: "10px" }}>
          <div className={isTablet ? "btn-hld CompBtnMobile" : "btn-hld"}>
            <SideDrawer
              title={"Warning"}
              buttonText={"Create Warning"}
              isAccessDrawer={false}
            >
              <Composer />
            </SideDrawer>
          </div>
        </div>
        <span className="ln" />
      </ContainerHeader>
      <TopBar
        buttons={[
          <Button className="filterButton topBtn !h-full !flex !items-center">
            {isTablet ? "" : sharedLabels.filter}
            <FilterFilled className="topBarIcon" />
          </Button>,
          <BarNavLink
            extraClasses={
              filter.filterType === 1 ? "topbarOn topBtn" : "topBtn"
            }
            activeName={"list"}
            linkName={"My Warning"}
            onClick={() => setFilter({ filterType: 1 })}
          />,
          <BarNavLink
            activeName={"aprrovals"}
            extraClasses={
              filter.filterType === 2 ? "topbarOn topBtn" : "topBtn"
            }
            isDefault={false}
            linkName={sharedLabels.ForApprovals}
            onClick={() => setFilter({ filterType: 2 })}
          />,
          <BarNavLink
            activeName={"aprrovals"}
            extraClasses={
              filter.filterType === 3 ? "topbarOn topBtn" : "topBtn"
            }
            isDefault={false}
            linkName={"Warning To Me"}
            onClick={() => setFilter({ filterType: 3 })}
          />,
        ]}
        gridIcons={[
          <div
            onClick={() => setGrid(false)}
            className={
              grid ? "topBarIcon gridIcon" : "topBarIcon gridIcon isActive"
            }
          >
            {isTablet ? "" : sharedLabels.ListView}{" "}
            <UnorderedListOutlined style={{ marginLeft: "2px" }} />
          </div>,
          <div
            onClick={() => setGrid(true)}
            className={
              grid ? "topBarIcon gridIcon isActive" : "topBarIcon gridIcon"
            }
          >
            {isTablet ? "" : sharedLabels.TableView}{" "}
            <AppstoreFilled style={{ marginLeft: "2px" }} />
          </div>,
        ]}
      />
      <div className="myBody">
        {warnings && warnings.length > 0 ? (
          grid ? (
            <TableView />
          ) : (
            <>
              {loader ? (
                <>
                  <Skeleton avatar paragraph={{ rows: 4 }} />
                </>
              ) : (
                <div className="flex gap-2 list-none flex-wrap pt-4">
                  {warnings.map((item, index) => {
                    return (
                      <>
                        <ListItem
                          getRewardId={getRewardId}
                          item={item}
                          id={item.id}
                          key={index}
                        />
                      </>
                    );
                  })}
                </div>
              )}
            </>
          )
        ) : (
          "Data not found"
        )}
      </div>
      {warningDetail && <DetailedView onClose={onClose} visible={visible} />}
    </TabbableContainer>
  );
};

export default Reward;
