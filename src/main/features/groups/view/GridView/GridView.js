import React from "react";
import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle";
import { getGroupDetailById, handleComposer } from "../../store/slice";

import DashboardCardLayout from "../UI/DashboardCard/DashboardCardLayout";
import ChatIcon from "../../../../../content/NewContent/groups/ChatIcon.svg";

function GridView({
  data,
  loading,
  dispatch,
  handleClickNavigation,
  dictionary,
}) {
  return (
    <CardWrapper2>
      {data &&
        data.map((list) => (
          <DashboardCardLayout
            data={list}
            defaultImg={
              "https://st.depositphotos.com/1062085/4008/v/600/depositphotos_40089703-stock-illustration-businessman-in-the-office-flat.jpg"
            }
            loading={loading}
            // handleUpdate={() => {
            //   dispatch(getGroupDetailById(list.id));
            //   dispatch(handleComposer({ isOpen: true, isEdit: true }));
            // }}
            onClick={() => {
              handleClickNavigation(list.id);
            }}
            dictionary={dictionary}
            chatIcon={ChatIcon}
          />
        ))}
    </CardWrapper2>
  );
}

export default GridView;
