import React, { useContext } from "react";
import Header from "../../../../layout/header/index";
import { ROUTES } from "../../../../../utils/routes";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../localization/index";
import { FeaturePermissionEnum } from "../../../../../utils/Shared/enums/featuresEnums";
import { useSelector } from "react-redux";

const Index = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];
  const { forms, createForms } = documentDictionary;
  const {user} = useSelector((state) => state.userSlice);
  const CreatePermission = FeaturePermissionEnum.CreateForm
  const userPermissions = user.permissions
  return (
    <Header
      items={[
        {
          name: forms,
          to: `${ROUTES.FORMS.ROOT}`,
          renderButton: [1],
        },
      ]}
      buttons={userPermissions.includes(CreatePermission) ? [
        {
          render: (
            <Link to={ROUTES.FORMS.CREATE_FORM}>
               <Button className="headerBtn">{createForms}</Button>
            </Link>
          ),
        },
      ] : []}
    />
  );
};

export default Index;
