import React from "react";
import { Drawer } from "antd";

import { CardWrapper2 } from "../../../../sharedComponents/Card/CardStyle";
import { handleComposer } from "../../store/slice";

import DashboardCardLayout from "../UI/DashboardCard/DashboardCardLayout";
import ChatIcon from "../../../../../content/NewContent/groups/ChatIcon.svg";
import Composer from "../../view/UI/Composer";
import { useDispatch, useSelector } from "react-redux";

function GridView({
  data,
  loading,
  dispatch,
  handleClickNavigation,
  dictionary,
}) {
  const { isComposerOpen, groupDetail, isEditComposer } = useSelector(
    (state) => state.groupSlice
  );
  const handleEditComposer = () => {
    dispatch(handleComposer({ isOpen: false, isEdit: false }));
  };
  return (
    <CardWrapper2>
      {data &&
        data?.map((list) => (
          <DashboardCardLayout
            data={list}
            defaultImg={
              "https://st.depositphotos.com/1062085/4008/v/600/depositphotos_40089703-stock-illustration-businessman-in-the-office-flat.jpg"
            }
            loading={loading}
            onClick={() => {
              handleClickNavigation(list.id);
            }}
            dictionary={dictionary}
            chatIcon={ChatIcon}
          />
        ))}
      <Drawer
        open={isComposerOpen}
        width={"786px"}
        onClose={handleEditComposer}
        title={"Update group"}
        className={"shared_drawer drawerSecondary"}
        destroyOnClose={true}
      >
        <Composer
          buttonText={"updateTextBtn"}
          detail={groupDetail}
          update={isEditComposer}
          id={groupDetail?.id}
        />
      </Drawer>
    </CardWrapper2>
  );
}

export default GridView;
