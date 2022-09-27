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
import {
	addDocument,
	getAllDocument,
	getAllDocumentList,
} from "../store/actions";
import { resetBreadCumb } from "../store/slice";
import { DocumentReferenceTypeEnum } from "./enum";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";

const Documents = ({
	referenceType = DocumentReferenceTypeEnum.General,
	referenceId = defaultUiid,
	routeLink,
	backButton,
	width = "",
}) => {
	const dispatch = useDispatch();
	const CurrentTab = useSelector(state => state.documentSlice.currentTab);
	const ListData = useSelector(state => state.documentSlice.listData);
	const DetailListData = useSelector(
		state => state.documentSlice.detailListData
	);
	const ParentId = useSelector(state => state.documentSlice.parentId);

	useEffect(() => {
		if (CurrentTab === "allDocuments") {
			let payload = {
				parentId: ParentId,
				referenceId,
				referenceType,
			};
			dispatch(getAllDocumentList(payload));
		} else {
			let payload = {
				filterType:
					CurrentTab === "myDocuments"
						? 2
						: CurrentTab === "forApprovals"
						? 3
						: null,
				referenceId,
				referenceType,
			};
			dispatch(getAllDocument(payload));
		}
	}, [ParentId, CurrentTab]);
	useEffect(() => {
		dispatch(resetBreadCumb());
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
			<FilterBar width={width} />
			<ContBody className={width}>
				<DropableContainer>{RenderTab[CurrentTab]}</DropableContainer>
			</ContBody>
			<DocumentComposers
				referenceId={referenceId}
				referenceType={referenceType}
			/>
		</TabbableContainer>
	);
};

export default Documents;
