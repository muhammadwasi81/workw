import React, { useContext } from "react";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import HeaderLayout from "../../../layout/header";
import CreateSchedule from "../view/createSchedule";
import { useSelector } from "react-redux";
import { ROUTES } from "../../../../utils/routes";
// import { handleOpenComposer } from "../store/slice";
function Header() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appHeader, sharedLabels } = dictionaryList[userLanguage];
  const success = useSelector((state) => state.scheduleSlice.success);
  const items = [
    {
      name: "Calendar",
      to: `?f=cal`,
      renderButton: [1],
    },
    {
      name: "Schedule",
      to: `?f=sc`,
      renderButton: [1],
    },
    {
      name: "Schedule Interviews",
      to: `?f=si`,
      renderButton: [1],
    },
  ];
  const buttons = [
    {
      buttonText: "Create Schedule",
      render: (
        <SideDrawer
          buttonText="Create Schedule"
          children={<CreateSchedule />}
          title={"Create Schedule"}
          success={success}
          //   buttonText={ExpenseDictionaryList.createTextBtn}
          //   success={isCreateComposer}
          //   setOpenDrawer={() => dispatch(toggleCreateComposer())}
          isAccessDrawer={true}
          //   openDrawer={isCreateComposer}
          //   setIsEdited={() => {}}
        />
      ),
    },
  ];
  return <HeaderLayout items={items} buttons={buttons} />;
}

export default Header;
