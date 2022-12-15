import React, { useContext } from "react";
import {
  ContBody,
  HeaderMenuContainer,
  TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../sharedComponents/AppComponents/MainHeader";
import HeaderNavLink from "../../sharedComponents/AppComponents/MainHeader/HeaderNavLink";
import { ROUTES } from "../../../utils/routes";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";
import Administration from "./AdministationPanel/index";
import { SearchOutlined } from "@ant-design/icons";

import SearchInput from "../../sharedComponents/searchBox/SearchInput";
import "./styles/adminstration.css";

const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const label = dictionaryList[userLanguage];

  return (
    <TabbableContainer>
      <ContainerHeader>
        <HeaderMenuContainer>
          <HeaderNavLink
            activeName={"Administration"}
            to={ROUTES.ADMINISTRATOR.DEFAULT}
            isDefault={true}
            linkName={label.appHeader.administration.administration}
          />
        </HeaderMenuContainer>
      </ContainerHeader>
      {/* <div className="searchBox mt-3">
        <SearchInput
          icon={<SearchOutlined />}
          placeholder={"Search"}
          size="larger"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div> */}
      <ContBody>
        <Administration />
      </ContBody>
    </TabbableContainer>
  );
};

export default Index;
