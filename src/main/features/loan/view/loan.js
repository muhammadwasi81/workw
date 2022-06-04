import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";

import {
  ContBody,
  HeaderMenuContainer,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Row, Button, Skeleton } from "antd";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./composer";
import DetailedView from "./DetailedView";
import TopBar from "../../../sharedComponents/topBar/topBar";
import BarNavLink from "../../../sharedComponents/topBar/BarNavLink";
import {
  FilterFilled,
  UnorderedListOutlined,
  AppstoreFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllLoan, getLoanById } from "../store/actions";
import TableView from "./TableView";

import "./loan.css";
import Header from "./header";

const Loan = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels, loanDictionary } = dictionaryList[userLanguage];

  const [grid, setGrid] = useState(false);

  const isTablet = useMediaQuery({ maxWidth: 800 });

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({ filterType: 1, search: "" });

  const dispatch = useDispatch();

  const { loans, loader, loanDetail } = useSelector((state) => state.loanSlice);

  const onClose = () => {
    setVisible(false);
  };

  const getLoanId = (id) => {
    dispatch(getLoanById(id));
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getAllLoan(filter));
  }, [filter]);
  return (
    <TabbableContainer className="">
      <Header />
      {/* <ContainerHeader>
        <HeaderMenuContainer></HeaderMenuContainer>
        <div className="right-menu" style={{ paddingRight: "10px" }}>
          <div className={""}>
            <SideDrawer
              title={loanDictionary.createLoan}
              buttonText={loanDictionary.createLoan}
              isAccessDrawer={false}
            >
              <Composer />
            </SideDrawer>
          </div>
        </div>
      </ContainerHeader> */}
      {/* <TopBar
        buttons={[
          <Button className="filterButton topBtn !h-full !flex !items-center">
            {isTablet ? "" : sharedLabels.filter}
            <FilterFilled />
          </Button>,
          <BarNavLink
            extraClasses={
              filter.filterType === 1 ? "topbarOn topBtn" : "topBtn"
            }
            activeName={"list"}
            linkName={sharedLabels.MyLoan}
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
        ]}
        gridIcons={[
          <div
            onClick={() => setGrid(false)}
            className={`  flex justify-center items-center gap-1 ${
              grid ? "topBarIcon gridIcon" : "topBarIcon gridIcon isActive"
            }`}
          >
            {isTablet ? "" : sharedLabels.ListView}{" "}
            <UnorderedListOutlined style={{ marginLeft: "2px" }} />
          </div>,
          <div
            onClick={() => setGrid(true)}
            className={` flex justify-center items-center gap-1
							${grid ? "topBarIcon gridIcon isActive transition" : "topBarIcon gridIcon "}`}
          >
            {isTablet ? "" : sharedLabels.TableView}{" "}
            <AppstoreFilled style={{ marginLeft: "2px" }} />
          </div>,
        ]}
      /> */}
      {/* <div className="myBody">
        <div className="">
          {loans && loans.length > 0 ? (
            grid ? (
              <TableView />
            ) : (
              <>
                {loader ? (
                  <>
                    <Skeleton avatar paragraph={{ rows: 4 }} />
                 
                  </>
                ) : (
                  loans.map((item, index) => {
                    return (
                      <>
                        <ListItem
                          getRewardId={getLoanById()}
                          item={item}
                          id={item.id}
                          key={index}
                        />
                      </>
                    );
                  })
                )}
              </>
            )
          ) : (
            "Data not found"
          )}
        </div>
      </div> */}
      {/* {loanDetail && <DetailedView onClose={onClose} visible={visible} />} */}
    </TabbableContainer>
  );
};

export default Loan;
