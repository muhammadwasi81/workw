import React, { useContext } from "react";
import {
	ContBody,
	HeaderMenuContainer,
	TabbableContainer,
} from "../../SharedComponent/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../SharedComponent/AppComponents/MainHeader/HeaderNavLink";
import { ROUTES } from "../../../utils/routes";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";
import AddEmployee from "./AddEmployee/addemployee";

const Index = () => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const label = dictionaryList[userLanguage];

	return (
		<TabbableContainer>
			<ContainerHeader>
				<HeaderMenuContainer>
					<HeaderNavLink
						activeName={"Employees"}
						to={ROUTES.HR.EMPLOYEES.DEFAULT}
						isDefault={true}
						linkName={label.appHeader.employee.employees}
					/>
				</HeaderMenuContainer>
			</ContainerHeader>
			<ContBody>
				<AddEmployee />
			</ContBody>
		</TabbableContainer>
	);
};

export default Index;
