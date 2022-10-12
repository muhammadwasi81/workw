import React, { useContext } from "react";
import { STRINGS } from "../../../../utils/base";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import HeaderLayout from "../../../layout/header";
import CreateSchedule from "../view/createSchedule";
import { useSelector } from "react-redux";
function Header() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appHeader, sharedLabels } = dictionaryList[userLanguage];
  const success = useSelector(state => state.scheduleSlice.success);
  const items = [
    {
      name: "Calendar",
      to: `${STRINGS.ROUTES.SCHEDULES}`,
      renderButton: [1],
    },
    {
      name: "Schedule",
      to: `${STRINGS.ROUTES.SCHEDULES}s`,
      renderButton: [1],
    },
    {
      name: "Schedule Interviews",
      to: `${STRINGS.ROUTES.SCHEDULES}s`,
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
