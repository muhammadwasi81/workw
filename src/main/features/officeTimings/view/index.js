import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";
import OfficeTimingComposer from "./officeTimingComposer";
import { addOfficeTimingGroup, removeGrade, updateGrade } from "../store/actions";
import OfficeTimingTable from "./table.js";

export default function OfficeTiming() {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.officeTimingSlice);

  // const handleDelete = (e) => {
  //   dispatch(removeGrade(e));
  // };

  const onSubmit = (e) => {
    if (!e.id) {
      dispatch(addOfficeTimingGroup(e));
      return;
    }
    // dispatch(updateGrade(e));
    // setGrade(initialState);
  };
  return (
    <AdminContainer>
      <div className="headerView" style={{ display: "flex", justifyContent: "flex-end", paddingTop: "10px" }}>
        <div className="right-menu">
          <div className="btn-hld">
            <SideDrawer title="New Time Group" buttonText={"Create Group"}>
              <OfficeTimingComposer />
            </SideDrawer>
          </div>
        </div>
      </div>
      <OfficeTimingTable
        // handleEdit={setOfficeTimingGroups}
        // handleDelete={handleDelete}
        actionRights={[1, 2]}
      />
    </AdminContainer>
  );
}
