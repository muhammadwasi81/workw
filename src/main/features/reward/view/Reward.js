import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../../components/SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../../../components/SharedComponent/AppComponents/MainHeader/HeaderNavLink";
import {
	ContBody,
	HeaderMenuContainer,
	TabbableContainer,
} from "../../../../components/SharedComponent/AppComponents/MainFlexContainer";
import { Menu, Dropdown, Row, Col, Drawer, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { STRINGS } from "../../../../utils/base";
import { useLocation } from "react-router-dom";
import RewardListItem from "./ListItem";
import Composer from "./Composer";
// import FilterForm from "./FilterForm";
import TopBar from "../../../sharedComponents/topBar/topBar";
import {
	FilterFilled,
	UnorderedListOutlined,
	AppstoreFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllRewards, GetRewardById } from "../store/actions";
import Tag from "../../../sharedComponents/Tag/index";
import { LoadingOutlined } from "@ant-design/icons";
import TableView from "./TableView";
import BarNavLink from "../../../sharedComponents/topBar/BarNavLink";
import "./reward.css";

const Reward = props => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels, rewardsDictionary } = dictionaryList[userLanguage];

	const [grid, setGrid] = useState(false);

	const isTablet = useMediaQuery({ maxWidth: 800 });

	const [visible, setVisible] = useState(false);

	const dispatch = useDispatch();

	const { rewards } = useSelector(state => state.rewardSlice);

	const [currentTab, setCurrentTab] = useState("list");
	const { search } = useLocation();
	let pathName = search.split("=")[1];

	console.log(rewards, "FINAL CONSOLE");

	// const showDrawer = (val) => {
	// 	setVisible(true);
	// 	console.log(val.currentTarget.id), "DETAILED";
	// };
	
	const onClose = () => {
		setVisible(false);
	};

	const getRewardId = () => {
		console.log("MAIN")
	}

	useEffect(() => {
		dispatch(getAllRewards({}));
		dispatch(GetRewardById({}));
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
						to={`${STRINGS.ROUTES.HR.REWARDS.DEFAULT}?f=list`}
						isDefault={false}
						linkName={"My Reward"}
						urlParam={currentTab}
					/>
					{/* <HeaderNavLink
            activeName={"aprrovals"}
            to={`${STRINGS.ROUTES.HR.REWARDS.DEFAULT}?f=aprrovals`}
            isDefault={false}
            linkName={sharedLabels.approvers}
            urlParam={currentTab}
          /> */}
				</HeaderMenuContainer>
				<div className="right-menu" style={{ paddingRight: "10px" }}>
					<div
						className={
							isTablet ? "btn-hld CompBtnMobile" : "btn-hld"
						}
					>
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
				buttons={[
					<Button className="filterButton topBtn">
						{isTablet ? "" : "Filter"}
						<FilterFilled className="topBarIcon" />
					</Button>,
					<BarNavLink
						extraClasses={"topBtn"}
						activeName={"list"}
						to={`${STRINGS.ROUTES.HR.REWARDS.DEFAULT}?f=list`}
						// isDefault={true}
						linkName={"My Reward"}
						urlParam={currentTab}
					/>,
					<BarNavLink
						activeName={"aprrovals"}
						extraClasses={"topBtn"}
						to={`${STRINGS.ROUTES.HR.REWARDS.DEFAULT}?f=aprrovals`}
						isDefault={false}
						linkName={"For Approvals"}
						urlParam={currentTab}
					/>,
					<BarNavLink
						activeName={"aprrovals"}
						extraClasses={"topBtn"}
						// to={`${STRINGS.ROUTES.HR.REWARDS.DEFAULT}?f=aprrovals`}
						isDefault={false}
						linkName={"Reward To Me"}
						// urlParam={currentTab}
					/>,
				]}
				gridIcons={[
					<div
						onClick={() => setGrid(false)}
						className={
							grid
								? "topBarIcon gridIcon"
								: "topBarIcon gridIcon isActive"
						}
					>
						{isTablet ? "" : "List View"} <UnorderedListOutlined />
					</div>,
					<div
						onClick={() => setGrid(true)}
						className={
							grid
								? "topBarIcon gridIcon isActive"
								: "topBarIcon gridIcon"
						}
					>
						{isTablet ? "" : "Table View"} <AppstoreFilled />
					</div>,
				]}
			/>
			<ContBody className="WarningMainDiv">
				<div className="lf-col">
					{currentTab === "list" && rewards ? (
						grid ? (
							<Row gutter={[16, 16]}>{<TableView />}</Row>
						) : (
							<>
								{rewards.map((x, index) => {
									return (
										<>
										{/* <Button type="primary" onClick={showDrawer}>
											Open
										</Button> */}
											<RewardListItem
												getRewardId={getRewardId}
												key={index}
												name={x.creator.name}
												category={x.category}
												reason={x.reason}
												designation={
													x.creator.designation
												}
												description={x.description}
												// members={x.members.map((m) => m.member.name )}
												status={
													<Tag
														status={x.status}
													></Tag>
												}
												approverName="Salman Ahmed"
												approverDesignation="React JS Developer"
											/>
										</>
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
				{/* <div
              className="rt-col"
              style={{ backgroundColor: "white", borderRadius: "4px" }}
            >
            <FilterForm />
          </div>  */}
			</ContBody>
			<Drawer title="Reward" width="768" placement="right" onClose={onClose} visible={visible}>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Drawer>
		</TabbableContainer>
	);
};

export default Reward;
