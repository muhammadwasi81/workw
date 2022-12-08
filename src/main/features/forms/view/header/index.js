import React, { useContext } from "react";
import Header from "../../../../layout/header/index";
import { ROUTES } from "../../../../../utils/routes";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../localization/index";

const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];

  const { forms, createForms } = documentDictionary;
  return (
    <Header
      items={[
        {
          name: forms,
          to: `${ROUTES.FORMS.ROOT}`,
          renderButton: [1],
        },
      ]}
      buttons={[
        {
          render: (
            <Link to={ROUTES.FORMS.CREATE_FORM}>
              <Button className="headerBtn">{createForms}</Button>
            </Link>
          ),
        },
      ]}
    />
  );
};

export default Index;
