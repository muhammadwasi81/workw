import React, { useEffect } from "react";
import Header from "./header";
import {
  ContBody,
  TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import FilterBar from "./filterBar";
// import TypeBar from "./typeBar";
import DocumentComposers from "./composer";
import { useSelector } from "react-redux";
import DocumentDetailCards from "./documentDetailCards";
import DocumentShortCards from "./documentShortCards";
import DropableContainer from "./dropableContainer";
import { useDispatch } from "react-redux";
import { getAllDocument, getAllDocumentList } from "../store/actions";
import {
  handleChangeTab,
  handleChangeView,
  resetBreadCumb,
} from "../store/slice";
import { DocumentReferenceTypeEnum } from "./enum";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import DocumentTableView from "./tableView";
import FolderMemberUpdate from "./composer/updateMembers/folderMembers";

const Documents = ({
  referenceType = DocumentReferenceTypeEnum.General,
  referenceId = defaultUiid,
  routeLink,
  backButton,
  width = "",
}) => {
  const dispatch = useDispatch();
  const CurrentTab = useSelector((state) => state.documentSlice.currentTab);
  const ListData = useSelector((state) => state.documentSlice.listData);
  const isTableView = useSelector((state) => state.documentSlice.isTableView);
  const DetailListData = useSelector(
    (state) => state.documentSlice.detailListData
  );
  const ParentId = useSelector((state) => state.documentSlice.parentId);

  useEffect(() => {
    dispatch(resetBreadCumb());
    dispatch(handleChangeTab("allDocuments"));
  }, []);

  let RenderTab = {
    allDocuments: <DocumentShortCards data={ListData} />,
    myDocuments: <DocumentDetailCards data={DetailListData} />,
    forApprovals: <DocumentDetailCards data={DetailListData} />,
  };
  return (
    <TabbableContainer>
      <Header 
	  width={width} 
	  backButton={backButton} 
	  routeLink={routeLink} 
	  />
      <FilterBar
        width={width}
        CurrentTab={CurrentTab}
        ParentId={ParentId}
        referenceId={referenceId}
        referenceType={referenceType}
      />
      <ContBody className={width}>
        <DocumentTableView list={ListData} isTable={isTableView} />
        {!isTableView && (
          <DropableContainer>{RenderTab[CurrentTab]}</DropableContainer>
        )}
      </ContBody>
      <DocumentComposers
        referenceId={referenceId}
        referenceType={referenceType}
      />
      <FolderMemberUpdate isOpen={false} />
    </TabbableContainer>
  );
};

export default Documents;
