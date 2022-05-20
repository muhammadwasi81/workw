import React, { useContext } from "react";
import { ROUTES } from "../../../utils/routes";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";
import {
  ContBody,
  HeaderMenuContainer,
  TabbableContainer,
} from "../../../components/SharedComponent/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../../components/SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../../components/SharedComponent/AppComponents/MainHeader/HeaderNavLink";
import { useMediaQuery } from "react-responsive";
import LinkButton from "../../sharedComponents/LinkButton/LinkButton";
import { PlusOutlined } from "@ant-design/icons";
import EmployeeRoutes from "./routes/employeeRoutes";

const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const label = dictionaryList[userLanguage];
  return (
    <TabbableContainer>
      <ContainerHeader>
        <HeaderMenuContainer>
          <HeaderNavLink
            activeName={"Employees"}
            to={ROUTES.EMPLOYEES.EMPLOYEELINK}
            isDefault={true}
            linkName={label.appHeader.employee.employees}
          />
        </HeaderMenuContainer>
        <LinkButton
          to={ROUTES.EMPLOYEES.ADD}
          text={sharedLabels.AddEmployee}
          icon={<PlusOutlined />}
          style={{ margin: "0 10px" }}
        />
      </ContainerHeader>
      <ContBody>
        <EmployeeRoutes />
      </ContBody>
    </TabbableContainer>
  );
};

export default Index;
