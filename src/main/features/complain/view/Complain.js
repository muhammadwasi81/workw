import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ContainerHeader } from "../../../sharedComponents/AppComponents/MainHeader";
import {
	HeaderMenuContainer,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button, Skeleton } from "antd";
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import TopBar from "../../../sharedComponents/topBar/topBar";
import {
	FilterFilled,
	UnorderedListOutlined,
	AppstoreFilled,
} from "@ant-design/icons";
import {complainDictionaryList} from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllComplains, GetRewardById } from "../store/actions";
import TableView from "./TableView";
import BarNavLink from "../../../sharedComponents/topBar/BarNavLink";
import "./complain.css";

const Reward = props => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, complainDictionary } = complainDictionaryList[userLanguage];

	const [grid, setGrid] = useState(false);

	const isTablet = useMediaQuery({ maxWidth: 800 });

	const [visible, setVisible] = useState(false);

	const [filter, setFilter] = useState({ filterType: 1, search: "" });

	const dispatch = useDispatch();

	const { complains, loader, rewardDetail } = useSelector(
		state => state.complainSlice
	);

	console.log(complains, "HELlOOOO!!!!");

	const onClose = () => {
		setVisible(false);
	};

	const getRewardId = id => {
		dispatch(GetRewardById(id));
		setVisible(true);
	};

	useEffect(() => {
		dispatch(getAllComplains(filter));
	}, [filter]);
	return (
		<TabbableContainer className="max-width-1190">
			<ContainerHeader>
				<HeaderMenuContainer></HeaderMenuContainer>
				<div className="right-menu" style={{ paddingRight: "10px" }}>
					<div
						className={
							isTablet ? "btn-hld CompBtnMobile" : "btn-hld"
						}
					>
						<SideDrawer
							title={complainDictionary.complain}
							buttonText={complainDictionary.createComplain}
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
					<Button className="filterButton topBtn !h-full !flex !items-center">
						{isTablet ? "" : complainDictionary.filter}
						<FilterFilled className="topBarIcon" />
					</Button>,
					<BarNavLink
						extraClasses={
							filter.filterType === 1
								? "topbarOn topBtn"
								: "topBtn"
						}
						activeName={"list"}
						linkName={complainDictionary.myComplain}
						onClick={() => setFilter({ filterType: 1 })}
					/>,
					<BarNavLink
						activeName={"aprrovals"}
						extraClasses={
							filter.filterType === 2
								? "topbarOn topBtn"
								: "topBtn"
						}
						isDefault={false}
						linkName={complainDictionary.forApproval}
						onClick={() => setFilter({ filterType: 2 })}
					/>,
					<BarNavLink
						activeName={"aprrovals"}
						extraClasses={
							filter.filterType === 3
								? "topbarOn topBtn"
								: "topBtn"
						}
						isDefault={false}
						linkName={complainDictionary.complainToMe}
						onClick={() => setFilter({ filterType: 3 })}
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
						{isTablet ? "" : complainDictionary.listView}{" "}
						<UnorderedListOutlined style={{ marginLeft: "2px" }} />
					</div>,
					<div
						onClick={() => setGrid(true)}
						className={
							grid
								? "topBarIcon gridIcon isActive"
								: "topBarIcon gridIcon"
						}
					>
						{isTablet ? "" : complainDictionary.tableView}{" "}
						<AppstoreFilled style={{ marginLeft: "2px" }} />
					</div>,
				]}
			/>
			<div className="myBody">
				{complains && complains.length > 0 ? (
					grid ? (
						<TableView />
					) : (
						<>
							{loader ? (
								<>
									<Skeleton avatar paragraph={{ rows: 4 }} />
								</>
							) : (
								<div className="flex gap-2 list-none flex-wrap pt-4">
									{complains.map((item, index) => {
										return (
											<>
												<ListItem
													getRewardId={getRewardId}
													item={item}
													id={item.id}
													key={index}
												/>
											</>
										);
									})}
								</div>
							)}
						</>
					)
				) : (
					"Data not found"
				)}
			</div>
			{rewardDetail && (
				<DetailedView onClose={onClose} visible={visible} />
			)}
		</TabbableContainer>
	);
};

export default Reward;
