import React, { useContext } from "react";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import { HeaderMenuContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import Composer from "./composer";
import { loanDictionaryList } from "../localization";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
const Header = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { loanDictionary } = loanDictionaryList[userLanguage];
  return (
    <ContainerHeader>
      <HeaderMenuContainer></HeaderMenuContainer>
      <div className="right-menu" style={{ paddingRight: "10px" }}>
        <div className={""}>
          <SideDrawer
            title={loanDictionary.createLoan}
            buttonText={loanDictionary.createLoan}
            isAccessDrawer={false}
          >
            <Composer />
          </SideDrawer>
        </div>
      </div>
    </ContainerHeader>
  );
};
export default Header;
