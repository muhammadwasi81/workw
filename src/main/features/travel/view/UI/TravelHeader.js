import React, { useContext, useState } from "react";
import { STRINGS } from "../../../../../utils/base";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import {
	HeaderMenuContainer,
	TabContainer,
	ContBody,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../../../sharedComponents/AppComponents/MainHeader";
import HeaderNavLink from "../../../../sharedComponents/AppComponents/MainHeader/HeaderNavLink";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import "../../styles/Travel.css";
import TravelComposer from "../TravelComposer/TravelComposer";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import BarNavLink from "./Link";
import {
	AppstoreFilled,
	FilterFilled,
	UnorderedListOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Table from "../customTable";
function TravelHeader() {
	const { userLanguage } = useContext(LanguageChangeContext);
	const label = dictionaryList[userLanguage];
	const [filter, setFilter] = useState({
		filterType: 1,
	});
	const [tableView, setTableView] = useState(false);
	return (
		<TabContainer>
			<ContainerHeader>
				<HeaderMenuContainer>
					<HeaderNavLink
						activeName={"travel"}
						to={STRINGS.ROUTES.TRAVEL.DEFAULT}
						isDefault={true}
						linkName={label.appHeader.travel.travels}
					/>
				</HeaderMenuContainer>

				<div className="right-menu">
					<div className="travel_drawer">
						<SideDrawer
							children={<TravelComposer />}
							title="Create Travel Expense"
							buttonText="Create Travel"
							isAccessDrawer={false}
						/>
					</div>
				</div>
			</ContainerHeader>
			<TopBar
				buttons={[
					<Button className="filterButton topBtn !h-full !flex !items-center">
						Filter
						<FilterFilled />
					</Button>,
					<BarNavLink
						activeName={"travles"}
						linkName={"Travels"}
						filterType={filter.filterType === 1 && true}
						onClick={() => setFilter({ filterType: 1 })}
					/>,
					<BarNavLink
						activeName={"aprrovals"}
						linkName={"For Approval"}
						filterType={filter.filterType === 2 && true}
						onClick={() => setFilter({ filterType: 2 })}
					/>,
					<BarNavLink
						activeName={"process"}
						linkName={"Agent Process"}
						filterType={filter.filterType === 3 && true}
						onClick={() => setFilter({ filterType: 3 })}
					/>,
				]}
				gridIcons={[
					<div
						onClick={() => setTableView(false)}
						className={`flex justify-center items-center gap-1 ${
							!tableView
								? "topBarIcon gridIcon isActive transition"
								: "topBarIcon gridIcon"
						}`}
					>
						ListView
						<UnorderedListOutlined />
					</div>,
					<div
						onClick={() => setTableView(true)}
						className={`flex justify-center items-center gap-1 ${
							tableView
								? "topBarIcon gridIcon isActive transition"
								: "topBarIcon gridIcon "
						}`}
					>
						TableView
						<AppstoreFilled />
					</div>,
				]}
			/>
			<ContBody className="!block">
				<Table />
			</ContBody>
		</TabContainer>
	);
}

export default TravelHeader;
