import React, { useEffect, useState, useContext } from "react";
import Header from "../../../layout/header";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import Composer from "./Composer";
import COA_List from "./listView";
import "../styles/style.css";
import { useSelector, useDispatch } from "react-redux";
import { handleEdit } from "../store/slice";
import { Button } from "antd/lib/radio";
import { ROUTES } from "../../../../utils/routes";
import { charOfAccountDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

export default function ChartOfAccounts() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { chartOfAccountDictionary } = charOfAccountDictionaryList[
    userLanguage
  ];
  const dispatch = useDispatch();
  const { success, editData } = useSelector(
    (state) => state.chartOfAccountsSlice
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (success) {
      setOpenDrawer(false);
    }
  }, [success]);
  return (
    <TabbableContainer>
      <Header
        items={[
          {
            name: chartOfAccountDictionary.chartOfAccount,
            to: ROUTES.FINANCE.CHART_OF_ACCOUNT.ROOT,
            renderButton: [1],
          },
        ]}
        buttons={[
          {
            buttonText: chartOfAccountDictionary.createAccount,
            render: (
              <Button onClick={() => setOpenDrawer(true)} className="headerBtn">
                {chartOfAccountDictionary.create}
              </Button>
            ),
          },
        ]}
      />
      <SideDrawer
        title={
          !!editData
            ? chartOfAccountDictionary.update
            : chartOfAccountDictionary.create
        }
        isDisable={true}
        // openDrawer={openDrawer || !!editData}
        isOpen={openDrawer || !!editData}
        handleClose={() => {
          dispatch(handleEdit(null));
          setOpenDrawer(false);
        }}
        // success={!openDrawer || !(!!editData)}
        setOpenDrawer={() => {}}
        setIsEdited={() => {}}
        isAccessDrawer={true}
        children={
          <Composer
            editData={editData}
            // openDrawer={openDrawer}
          />
        }
      />
      <ContBody className="chartOfAccountBody">
        <COA_List />
      </ContBody>
    </TabbableContainer>
  );
}
