import React, { useState } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import { buttonsEnum } from "../enums/enums";
import NewTravelComposer from "./TravelComposer/NewTravelComposer";
import { FeaturePermissionEnum } from "../../../../utils/Shared/enums/featuresEnums";
import { useSelector } from "react-redux";
import TravelDetail from "./TravelDetail/TravelDetail";


function Header(props) {
  const { label, backButton, route, referenceId, referenceType } = props;
  const [visible, setVisible] = useState(false);
  const { success } = props;
  const {user} = useSelector((state) => state.userSlice);
  const userPermissions = user.permissions
  const items = [
    {
      name: label.travels,
      renderButton: buttonsEnum.travel,
      to: route ? route : `${ROUTES.TRAVEL.ROOT}?f=trv`,
    },
  ];
  const buttons = [
    {
      buttonText: label.createTextBtn,
      onClick: () => setVisible(true),
      render: (
        <SideDrawer
          children={
            <NewTravelComposer
              label={label}
              referenceId={referenceId}
              referenceType={referenceType}
            />
          }
          title={label.labels.createTravel}
          buttonText={label.createTextBtn}
          isAccessDrawer={true}
          setOpenDrawer={setVisible}
          setIsEdited={() => {}}
          openDrawer={visible}
          success={success}
          
        />
      ),
    },
  ];
  console.log(success, "success");
  return (
    <LayoutHeader items={items} buttons={userPermissions.includes(FeaturePermissionEnum.CreateTravel) ? buttons : []} backButton={backButton} />
  );
}

export default Header;
