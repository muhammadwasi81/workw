import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../../components/SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../../../components/SharedComponent/AppComponents/MainHeader/HeaderNavLink";
import {
	ContBody,
	HeaderMenuContainer,
	TabbableContainer,
} from "../../../../components/SharedComponent/AppComponents/MainFlexContainer";
import { Menu, Dropdown, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { STRINGS } from "../../../../utils/base";
import { ROUTES } from "../../../../utils/routes";
import { useLocation } from "react-router-dom";
import RewardListItem from "./ListItem";
import Composer from "./Composer";
import FilterForm from "./FilterForm";
import TopBar from "../../../sharedComponents/topBar/topBar";
import {
	FilterFilled,
	UnorderedListOutlined,
	AppstoreFilled,
} from "@ant-design/icons";
import GridItem from "./GridItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllRewards } from "../store/actions";
import Tag from "../../../sharedComponents/Tag/index";

import "./reward.css";

const Reward = props => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels, rewardsDictionary } = dictionaryList[userLanguage];

	const [grid, setGrid] = useState(false);

	const isTablet = useMediaQuery({ maxWidth: 650 });

	const dispatch = useDispatch();

	const { rewards } = useSelector(state => state.rewardSlice);

	const [currentTab, setCurrentTab] = useState("list");
	const { search } = useLocation();
	let pathName = search.split("=")[1];

	console.log(rewards, "FINAL CONSOLE");

	useEffect(() => {
		dispatch(getAllRewards({}));
		console.log(rewards, "FINAL CONSOLE");
	}, []);

	useEffect(() => {
		if (!pathName) {
			setCurrentTab("list");
		} else {
			setCurrentTab(pathName);
		}
	}, [search]);

	const label = dictionaryList[userLanguage];
	return (
		<TabbableContainer>
			<ContainerHeader>
				<HeaderMenuContainer>
					<HeaderNavLink
						activeName={"list"}
						to={`${ROUTES.HR.REWARDS.DEFAULT}?f=list`}
						isDefault={false}
						linkName={sharedLabels.rewards}
						urlParam={currentTab}
					/>
					<HeaderNavLink
						activeName={"aprrovals"}
						to={`${ROUTES.HR.REWARDS.DEFAULT}?f=aprrovals`}
						isDefault={false}
						linkName={sharedLabels.approvers}
						urlParam={currentTab}
					/>
				</HeaderMenuContainer>
				<div className="right-menu" style={{ paddingRight: "10px" }}>
					<div className="btn-hld">
						<SideDrawer
							title="Create Reward"
							buttonText={rewardsDictionary.createReward}
							isAccessDrawer={false}
						>
							<Composer />
						</SideDrawer>
					</div>
				</div>
				<span className="ln" />
			</ContainerHeader>
			<TopBar
				icons={<FilterFilled className="topBarIcon" />}
				gridIcons={[
					<AppstoreFilled
						className={
							grid
								? "topBarIcon gridIcon isActive"
								: "topBarIcon gridIcon"
						}
						onClick={() => setGrid(true)}
					/>,
					<UnorderedListOutlined
						className={
							grid
								? "topBarIcon gridIcon"
								: "topBarIcon gridIcon isActive"
						}
						onClick={() => setGrid(false)}
					/>,
				]}
			/>
			<ContBody className="WarningMainDiv">
				<div className="lf-col">
					{currentTab === "list" ? (
						grid ? (
							<Row gutter={[16, 16]}>
								{[1, 2, 3, 4].map(x => (
									<Col
										md={24}
										lg={24}
										xl={12}
										xxl={12}
										xs={24}
										sm={24}
									>
										<GridItem />
									</Col>
								))}
							</Row>
						) : (
							<>
								{rewards.map((x, index) => {
									return (
										<RewardListItem
											name={x.name}
											description={x.description}
											members={x.members.map(m => m.id)}
											status={
												<Tag status={x.status}></Tag>
											}
										/>
									);
								})}
							</>
						)
					) : currentTab === "aprrovals" ? (
						<h3>Rewards Approvals will come here</h3>
					) : (
						""
					)}
				</div>
				<div
					className="rt-col"
					style={{ backgroundColor: "white", borderRadius: "4px" }}
				>
					<FilterForm />
				</div>
			</ContBody>
			{isTablet && (
				<div className="sideDrawerBtnMobileView">
					<SideDrawer
						children={<Composer />}
						title="Create Reward"
						buttonText=""
						isAccessDrawer={false}
					/>
				</div>
			)}
		</TabbableContainer>
	);
};

export default Reward;
