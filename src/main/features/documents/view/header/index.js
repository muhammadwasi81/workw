import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../localization/index";
import Header from "../../../../layout/header/index";
import CreateDocDropdown from "./createDocDropdown";
import { ROUTES } from "../../../../../utils/routes";

const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];

  return (
    <Header
    items={[
      {
        name: "Docs & Archive",
        to: `${ROUTES.DOCUMENTS.DOCUMENT}`,
        renderButton: [1],
      }
    ]}
      buttons={[
        {
          render: <CreateDocDropdown />,
        }
      ]}
    />
  );
};

export default Index;
