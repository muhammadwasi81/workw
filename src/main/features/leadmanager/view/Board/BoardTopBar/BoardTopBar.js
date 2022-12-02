import React, { useState, useContext } from "react";
import TopBar from "../../../../../sharedComponents/topBar/topBar";
import { BsKanban } from "react-icons/bs";
import {
  AppstoreOutlined,
  BarsOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { LeadManagerDictionary } from "../../../localization";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { Button } from "antd";

function BoardTopBar({ handleView, handleSearch, onEmailClick = () => {} }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
    userLanguage
  ];
  const { topBar } = LeadManagerDictionaryList;

  return (
    <TopBar
      onSearch={(value) => {
        handleSearch(value);
      }}
      // component={
      // 	<div className="ml-auto">
      // 		<Button>Email</Button>
      // 	</div>
      // }
      rightButtons={[
        {
          name: topBar.email,
          icon: <MailOutlined />,
          onClick: onEmailClick,
        },
      ]}
      buttons={[]}
      // filter={{
      // 	onFilter: () => {},
      // }}
      segment={{
        onSegment: (value) => {
          handleView(value);
        },
      }}
      options={[
        {
          label: topBar.list,
          value: "List",
          icon: <BarsOutlined />,
        },
        {
          label: topBar.board,
          value: "Board",
          icon: <BsKanban />,
        },
        {
          label: topBar.table,
          value: "Table",
          icon: <AppstoreOutlined />,
        },
      ]}
    />
  );
}

export default BoardTopBar;
