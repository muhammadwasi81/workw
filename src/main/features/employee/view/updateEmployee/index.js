import React, { useContext } from "react";
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../../../sharedComponents/AppComponents/MainHeader";
import HeaderNavLink from "../../../../sharedComponents/AppComponents/MainHeader/HeaderNavLink";
import { ROUTES } from "../../../../../utils/routes";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
import Employees from "./EmployeePanel";

const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const label = dictionaryList[userLanguage];

  return (
    <TabbableContainer>
      <ContainerHeader>
        <HeaderMenuContainer>
          <HeaderNavLink
            activeName={"Employees Update"}
            // to={ROUTES.ADMINISTRATOR.DEFAULT}
            isDefault={true}
            linkName={"Employee Update"}
          />
        </HeaderMenuContainer>
      </ContainerHeader>
      <ContBody>
        <Employees />
      </ContBody>
    </TabbableContainer>
  );
};

export default Index;
