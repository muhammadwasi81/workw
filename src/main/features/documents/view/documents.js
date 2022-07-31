import React, { useEffect } from "react";
import Header from "./header";
import { ContBody, TabbableContainer } from "../../../sharedComponents/AppComponents/MainFlexContainer";
import FilterBar from "./filterBar";
// import TypeBar from "./typeBar";
import DocumentComposers from "./composer";
import { useSelector } from "react-redux";
import DocumentDetailCards from "./documentDetailCards";
import DocumentShortCards from "./documentShortCards";
import DropableContainer from "./dropableContainer";
import { useDispatch } from "react-redux";
import { addDocument, getAllDocument } from "../store/actions";

const Documents = () => {
  const dispatch = useDispatch();
  const CurrentTab = useSelector(state => state.documentSlice.currentTab);
  useEffect(() => {
    let payload = {
      parentId: null
    }
    dispatch(getAllDocument(payload))
  }, [CurrentTab])

  let RenderTab = {
    allDocuments: <DocumentShortCards />,
    myDocuments: <DocumentDetailCards />,
    forApprovals: <DocumentDetailCards />
  }
  return (
    <TabbableContainer>
      <Header />
      <FilterBar />
      <ContBody>
        <DropableContainer>
          {RenderTab[CurrentTab]}
        </DropableContainer>
      </ContBody>
      <DocumentComposers />
    </TabbableContainer>
  );
};

export default Documents;
