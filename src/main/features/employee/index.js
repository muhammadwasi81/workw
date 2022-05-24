import React, { useContext } from "react";
import { ROUTES } from "../../../utils/routes";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../utils/localization/languages";
import {
	ContBody,
	HeaderMenuContainer,
	TabbableContainer,
} from "../../../components/SharedComponent/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../../components/SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../../components/SharedComponent/AppComponents/MainHeader/HeaderNavLink";
import LinkButton from "../../sharedComponents/LinkButton/LinkButton";
import { PlusOutlined } from "@ant-design/icons";
import EmployeeRoutes from "./routes/employeeRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
const Index = () => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels } = dictionaryList[userLanguage];
	const label = dictionaryList[userLanguage];
	const navigate = useNavigate();
	const { pathname } = useLocation();
	// const urlLength = pathname.split("/").length;
	const BackButton = styled.button`
		display: flex;
		align-items: center;
		gap: 0.3rem;
	`;

	// const params = useParams();
	// console.log("params", pathname);
	return (
		<TabbableContainer>
			<ContainerHeader>
				<HeaderMenuContainer>
					{(pathname === "/konnect/employees/add" ||
						pathname === "/employees/add") && (
						<BackButton
							onClick={() =>
								navigate(ROUTES.EMPLOYEES.EMPLOYEELINK)
							}
						>
							<LeftOutlined />
							Back
						</BackButton>
					)}
					<HeaderNavLink
						activeName={"Employees"}
						to={ROUTES.EMPLOYEES.EMPLOYEELINK}
						isDefault={true}
						linkName={label.appHeader.employee.employees}
					/>
				</HeaderMenuContainer>
				<LinkButton
					to={ROUTES.EMPLOYEES.ADD}
					text={sharedLabels.AddEmployee}
					icon={<PlusOutlined />}
					style={{ margin: "0 10px" }}
				/>
			</ContainerHeader>
			<ContBody>
				<EmployeeRoutes />
			</ContBody>
		</TabbableContainer>
	);
};

export default Index;
