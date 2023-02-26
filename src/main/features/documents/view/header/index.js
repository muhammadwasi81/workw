import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../localization/index";
import Header from "../../../../layout/header/index";
import CreateDocDropdown from "./createDocDropdown";
import { ROUTES } from "../../../../../utils/routes";
import { useSelector } from "react-redux";
import { FeaturesEnum } from "../../../../../utils/Shared/enums/enums";
import { FeaturePermissionEnum } from "../../../../../utils/Shared/enums/featuresEnums";

const Index = ({ width, routeLink, backButton }) => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { documentDictionary } = documentDictionaryList[userLanguage];
	const { user } = useSelector((state) => state.userSlice)
	const userPermissions = user.permissions

	return (
		<Header
			backButton={backButton}
			width={width}
			items={userPermissions.includes(FeaturePermissionEnum.CreateDocument) ? [
				{
					name: documentDictionary.DocsArchive,
					to: routeLink ? routeLink : `${ROUTES.DOCUMENTS.DOCUMENT}`,
					renderButton: [1],
				},
			] : []}
			buttons={[
				{
					render: <CreateDocDropdown />,
				},
			]}
		/>
	);
};

export default Index;
