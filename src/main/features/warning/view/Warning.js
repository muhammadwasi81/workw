import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Row, Button, Skeleton } from "antd";
import { warningDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import TopBar from "../../../sharedComponents/topBar/topBar";
import { FilterFilled, UnorderedListOutlined, AppstoreFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllWarnings, GetWarningById } from "../store/actions";
import TableView from "./TableView";
import BarNavLink from "../../../sharedComponents/topBar/BarNavLink";
// import "./warning.css";
import { dictionaryList } from "../../../../utils/localization/languages";
import { CardWrapper } from "../../../layout/GridStyle";

const Reward = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { warningDictionary } = warningDictionaryList[userLanguage];

  const [grid, setGrid] = useState(false);

  const isTablet = useMediaQuery({ maxWidth: 800 });

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({ filterType: 0, search: "" });

  const dispatch = useDispatch();

  const { warnings, loader, warningDetail } = useSelector((state) => state.warningSlice);

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
            <SideDrawer title={"Warning"} buttonText={"Create Warning"} isAccessDrawer={false}>
              <Composer />
            </SideDrawer>
          </div>
        </div>
        <span className="ln" />
      </ContainerHeader>
      <TopBar
        buttons={[
          <Button className="filterButton topBtn !h-full !flex !items-center">
            {isTablet ? "" : warningDictionary.filter}
            <FilterFilled className="topBarIcon" />
          </Button>,
          <BarNavLink
            extraClasses={filter.filterType === 0 ? "topbarOn topBtn" : "topBtn"}
            activeName={"list"}
            linkName={"My Warning"}
            onClick={() => setFilter({ filterType: 0 })}
          />,
          <BarNavLink
            activeName={"aprrovals"}
            extraClasses={filter.filterType === 2 ? "topbarOn topBtn" : "topBtn"}
            isDefault={false}
            linkName={warningDictionary.forApproval}
            onClick={() => setFilter({ filterType: 2 })}
          />,
          <BarNavLink
            activeName={"aprrovals"}
            extraClasses={filter.filterType === 3 ? "topbarOn topBtn" : "topBtn"}
            isDefault={false}
            linkName={"Warning To Me"}
            onClick={() => setFilter({ filterType: 3 })}
          />,
        ]}
        gridIcons={[
          <div onClick={() => setGrid(false)} className={grid ? "topBarIcon gridIcon" : "topBarIcon gridIcon isActive"}>
            {isTablet ? "" : warningDictionary.listView} <UnorderedListOutlined style={{ marginLeft: "2px" }} />
          </div>,
          <div onClick={() => setGrid(true)} className={grid ? "topBarIcon gridIcon isActive" : "topBarIcon gridIcon"}>
            {isTablet ? "" : warningDictionary.tableView} <AppstoreFilled style={{ marginLeft: "2px" }} />
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
                <CardWrapper>
                  {warnings.map((item, index) => {
                    return (
                      <>
                        <ListItem getRewardId={getRewardId} item={item} id={item.id} key={index} />
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
      </div>
      {warningDetail && <DetailedView onClose={onClose} visible={visible} />}
    </TabbableContainer>
  );
};

export default Reward;
