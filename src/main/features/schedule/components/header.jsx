import React, { useContext } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import HeaderLayout from "../../../layout/header";
import CreateSchedule from "../view/createSchedule";
import { useSelector } from "react-redux";
import { ROUTES } from "../../../../utils/routes";
// import { handleOpenComposer } from "../store/slice";
function Header({ handleShareLinkModal, width, routeLink, backButton }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appHeader, sharedLabels } = dictionaryList[userLanguage];
  const success = useSelector((state) => state.scheduleSlice.success);
  const items = [
    {
      name: "Calendar",
      to: routeLink ? routeLink : `?f=cal`,
      renderButton: [1, 2],
    },
    {
      name: "Schedule",
      to: routeLink ? routeLink : `?f=sc`,
      renderButton: [1, 2],
    },
    {
      name: "Interviews Schedule",
      to: `?f=si`,
      renderButton: [1],
    },
  ];
  const buttons = [
    {
      render: (
        <SideDrawer
          buttonText="Create Schedule"
          children={<CreateSchedule />}
          title={"Create Schedule"}
          success={success}
          isAccessDrawer={true}
        />
      ),
    },
    {
      buttonText: "Share Calendar Link",
      onClick: handleShareLinkModal,
    },
  ];
  return (
    <HeaderLayout
      isSchedule={true}
      items={items}
      buttons={buttons}
      width={width}
      backButton={backButton}
    />
  );
}

export default Header;
