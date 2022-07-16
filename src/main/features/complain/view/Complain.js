import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button, Skeleton } from "antd";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { FilterFilled, UnorderedListOutlined, AppstoreFilled } from "@ant-design/icons";
import { complainDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllComplains, GetComplainById, GetRewardById } from "../store/actions";
import { Table } from "../../../sharedComponents/customTable";
import Header from "../../../layout/header/index";

// import "./complain.css";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";

import { tableColumn } from "./TableColumn";
import TopBar from "../../../sharedComponents/topBar/topBar";

const Reward = (props) => {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, complainDictionary } = complainDictionaryList[userLanguage];

  const [tableView, setTableView] = useState(false);

  const [visible, setVisible] = useState(false);

  const [filter, setFilter] = useState({ filterType: 1, search: "" });

  const { complains, loader, complainDetail } = useSelector((state) => state.complainSlice);

  const onClose = () => {
    setVisible(false);
  };

  const getComplainById = (id) => {
    dispatch(GetComplainById(id));
    setVisible(true);
  };

  useEffect(() => {
    dispatch(getAllComplains(filter));
  }, [filter]);
  return (
    <TabbableContainer className="max-width-1190">
      <Header
        buttons={[
          {
            buttonText: "Create Travel",
            // onClick: () => setVisible(true),
            render: (
              <SideDrawer title={complainDictionary.createComplain} buttonText={complainDictionary.createComplain} isAccessDrawer={false}>
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
            name: "Complains",
            onClick: () => setFilter({ filterType: 0 }),
          },
          {
            name: "For Approval",
            onClick: () => setFilter({ filterType: 1 }),
          },
          {
            name: "Complain To Me",
            onClick: () => setFilter({ filterType: 2 }),
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
        {complains && complains?.length > 0 ? (
          tableView ? (
            <Table columns={tableColumn()} dragable={true} data={complains} />
          ) : (
            <>
              {loader ? (
                <>
                  <Skeleton avatar paragraph={{ rows: 4 }} />
                </>
              ) : (
                <CardWrapper>
                  {complains.map((item, index) => {
                    return (
                      <>
                        <ListItem getComplainById={getComplainById} item={item} id={item.id} key={index} />
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
      {complainDetail && <DetailedView onClose={onClose} visible={visible} />}
    </TabbableContainer>
  );
};

export default Reward;
