import React, { useEffect, useState, useContext } from "react";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { ROUTES } from "../../../../utils/routes";
import LayoutHeader from "../../../layout/header";
import BoardComposer from "../Composer/BoardComposer";
import { useSelector, useDispatch } from "react-redux";
import { handleBoardComposer, resetComposerDetail } from "../store/slice";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../localization";

function Header({ width, routeLink, backButton }) {
  const dispatch = useDispatch();

  const success = useSelector((state) => state.trelloSlice.success);
  const loading = useSelector((state) => state.trelloSlice.loader);
  const isComposerVisible = useSelector(
    (state) => state.trelloSlice.isComposerVisible
  );
  const isComposerEdit = useSelector(
    (state) => state.trelloSlice.isComposerEdit
  );
  const { userLanguage } = useContext(LanguageChangeContext);
  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { labels, workBoard, createTextBtn } = WorkBoardDictionaryList;

  const items = [
    {
      name: workBoard,
      to: routeLink ? routeLink : `${ROUTES.WORKBOARD.DEFAULT}`,
      renderButton: [1],
    },
  ];

  const buttons = [
    {
      render: (
        <SideDrawer
          children={<BoardComposer isEdit={isComposerEdit} loading={loading} />}
          title={(isComposerEdit ? labels.Update : labels.Create) + " Board"}
          buttonText={createTextBtn}
          isAccessDrawer={true}
          handleClose={() => {
            setTimeout(() => {
              dispatch(resetComposerDetail());
            }, 100);
          }}
          openDrawer={isComposerVisible}
          success={success}
        />
      ),
    },
  ];
  return (
    <LayoutHeader
      items={items}
      buttons={buttons}
      width={width}
      backButton={backButton}
    />
  );
}

export default Header;
