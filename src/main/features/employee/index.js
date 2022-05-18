import React, { useContext } from "react";
import { ROUTES } from "../../../utils/routes";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";
import Employee from "./view";
import {
	ContBody,
	HeaderMenuContainer,
	TabbableContainer,
} from "../../../components/SharedComponent/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../../components/SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../../components/SharedComponent/AppComponents/MainHeader/HeaderNavLink";

const Index = () => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const label = dictionaryList[userLanguage];

	return (
		<TabbableContainer>
			<ContainerHeader>
				<HeaderMenuContainer>
					<HeaderNavLink
						activeName={"Employees"}
						to={ROUTES.EMPLOYEES.EMPLOYEELINK}
						isDefault={true}
						linkName={label.appHeader.employee.employees}
					/>
				</HeaderMenuContainer>
			</ContainerHeader>
			<ContBody>
				<Employee />
			</ContBody>
		</TabbableContainer>
	);
};

export default Index;
