import React, { useEffect, useContext, useState, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../../components/SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../../../components/SharedComponent/AppComponents/MainHeader/HeaderNavLink";
import {
	ContBody,
	HeaderMenuContainer,
	TabbableContainer,
} from "../../../../components/SharedComponent/AppComponents/MainFlexContainer";
import { Row, Button, Skeleton } from "antd";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import { STRINGS } from "../../../../utils/base";
import { useLocation } from "react-router-dom";
import RewardListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
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
import StatusTag from "../../../sharedComponents/Tag/StatusTag";
import TableView from "./TableView";
import BarNavLink from "../../../sharedComponents/topBar/BarNavLink";
import "./reward.css";

const Reward = props => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels, rewardsDictionary, Direction, complains } = dictionaryList[userLanguage];


	const [grid, setGrid] = useState(false);

	const isTablet = useMediaQuery({ maxWidth: 800 });

	const [visible, setVisible] = useState(false);

	const [filter, setFilter] = useState({filterType: 0, search: ""})

	const dispatch = useDispatch();

	const { rewards,loader } = useSelector(state => state.rewardSlice);

	const onClose = () => {
		setVisible(false);
	};

	const getRewardId = (id) => {
		dispatch(GetRewardById(id))
		setVisible(true);
	}

	useEffect(() => {
		dispatch(getAllRewards(filter));
	}, [filter]);
	return (
		<TabbableContainer>
			<ContainerHeader>
				<HeaderMenuContainer>
					{/* <HeaderNavLink
						activeName={"list"}
						to={`${STRINGS.ROUTES.HR.REWARDS.DEFAULT}?f=list`}
						isDefault={false}
						linkName={"My Reward"}
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
							buttonText={complains.createComplain}
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
						{isTablet ? "" : sharedLabels.filter}
						<FilterFilled className="topBarIcon" />
					</Button>,
					<BarNavLink
						extraClasses={"topBtn"}
						activeName={"list"}
						linkName="My Complain"
						onClick={() => setFilter({filterType: 1})}
					/>,
					<BarNavLink
						activeName={"aprrovals"}
						extraClasses={"topBtn"}
						isDefault={false}
						linkName={sharedLabels.ForApprovals}
						onClick={() => setFilter({filterType: 2})}
					/>,
					<BarNavLink
						activeName={"aprrovals"}
						extraClasses={"topBtn"}
						isDefault={false}
						linkName="Complain To Me"
						onClick={() => setFilter({filterType: 3})}
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
						{isTablet ? "" : sharedLabels.ListView} <UnorderedListOutlined />
					</div>,
					<div
						onClick={() => setGrid(true)}
						className={
							grid
								? "topBarIcon gridIcon isActive"
								: "topBarIcon gridIcon"
						}
					>
						{isTablet ? "" : sharedLabels.TableView} <AppstoreFilled />
					</div>,
				]}
			/>
			<ContBody className="WarningMainDiv">
				<div className="lf-col">
					{rewards && rewards.length > 0 ? (
						grid ? (
							<Row gutter={[16, 16]}>{<TableView />}</Row>
						) : (
							<>
								
								{ loader  ?  
									<>
										<Skeleton avatar paragraph={{ rows: 4 }} />
										<Skeleton avatar paragraph={{ rows: 4 }} />
										<Skeleton avatar paragraph={{ rows: 4 }} />
									</>
									:
									rewards.map((x, index) => {
									return (
										<>
												<RewardListItem
													getRewardId={getRewardId}
													id={x.id}
													key={index}
													name={x.name}
													category={x.category}
													reason={x.reason}
													creator={x.creator}
													description={x.description}
													status={
														<StatusTag
															status={x.status}
														></StatusTag>
													}
													members={x.members}
													approverName="Salman Ahmed"
													approverDesignation="React JS Developer"
												/>
										</>
									);
								}) 
								}
							</>
						)
					) : "Data not found" }
				</div>
				{/* <div
              className="rt-col"
              style={{ backgroundColor: "white", borderRadius: "4px" }}
            >
            <FilterForm />
          </div>  */}
			</ContBody>
			<DetailedView onClose={onClose} visible={visible} />
		</TabbableContainer>
	);
};

export default Reward;
