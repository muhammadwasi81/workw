import React, { useContext } from "react";
import { TeamPanelContainer } from "../../../Styles/team.style";
import { useParams } from "react-router-dom";
import {
  ContBody,
  TabbableContainer,
} from "../../../../../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "../../../../../../layout/header";
import { LanguageChangeContext } from "../../../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../../../utils/localization/languages";
import { companyDictionaryList } from "../../../localization/index";
import CompanyRoutes from "../CompanyRoutes/routes";
import CompanyActivities from "./CompanyActivities";

function CompanyUpdate() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { sharedLabels } = dictionaryList[userLanguage];
  const { companyDictionary } = companyDictionaryList[userLanguage];
  const labels = companyDictionary.companyDetail;

  const { "*": id } = useParams();
  console.log(id, "ID");
  const userId = id.split("/")[1];

  const items = [
    {
      name: "Company Detail",
    },
  ];
  return (
    <>
      <TeamPanelContainer>
        <TabbableContainer>
          <Header items={items} />
          <ContBody>
            <CompanyActivities id={id} />
            <CompanyRoutes />
          </ContBody>
        </TabbableContainer>
      </TeamPanelContainer>
    </>
  );
}
export default CompanyUpdate;
