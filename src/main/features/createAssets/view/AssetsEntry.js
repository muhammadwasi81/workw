import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer/index";
import React, { useContext } from "react";
import { ROUTES } from "../../../../utils/routes";
import CreateAssetsEntryTable from "./createAssetsEntryTable";
import Header from "../../../layout/header";
import { createAssetsDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

const AssetsEntry = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { createAssetsDictionary, Direction } = createAssetsDictionaryList[
    userLanguage
  ];

  return (
    <>
      <TabbableContainer>
        <Header
          items={[
            {
              name: createAssetsDictionary.createAssests,
              to: ROUTES.CREATE_ASSETS.DEFAULT,
            },
          ]}
        />
        <ContBody>
          <CreateAssetsEntryTable defaultRows={12} />
        </ContBody>
      </TabbableContainer>
    </>
  );
};

export default AssetsEntry;
