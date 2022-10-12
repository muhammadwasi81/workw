import React, { useEffect, useContext, useState } from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button, Skeleton, Drawer } from "antd";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { complainDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
	getAllComplains,
	GetComplainById,
	GetRewardById,
} from "../store/actions";
import { Table } from "../../../sharedComponents/customTable";
import Header from "../../../layout/header/index";

// import "./complain.css";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";

import { tableColumn } from "./TableColumn";
import TopBar from "../../../sharedComponents/topBar/topBar";
import { handleOpenComposer } from "../store/slice";

const Reward = props => {
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction, complainDictionary } = complainDictionaryList[
		userLanguage
	];

	const [tableView, setTableView] = useState(false);

	const [visible, setVisible] = useState(false);

	const [filter, setFilter] = useState({ filterType: 0, search: "" });
	const [complainId, setComplainId] = useState("");

	const { complains, loader, drawerOpen } = useSelector(
		state => state.complainSlice
	);

	const onClose = () => {
		setVisible(false);
	};

	const getComplainById = id => {
		setComplainId(id);
		setVisible(true);
	};

	useEffect(() => {
		dispatch(getAllComplains(filter));
	}, [filter]);
	return (
		<TabbableContainer className="max-width-1190">
			<Header
				buttons={[
					{
						buttonText: "Create Complain",
						render: (
							<Button
								className="ThemeBtn"
								onClick={() =>
									dispatch(handleOpenComposer(true))
								}
							>
								{complainDictionary.createComplain}
							</Button>
						),
					},
				]}
			/>
			<TopBar
				onSearch={value => {
					setFilter({ ...filter, search: value });
				}}
				buttons={[
					{
						name: "Complains",
						onClick: () => setFilter({ filterType: 0 }),
					},
					{
						name: "Created By Me",
						onClick: () => setFilter({ filterType: 1 }),
					},
					{
						name: "For Approval",
						onClick: () => setFilter({ filterType: 2 }),
					},
					{
						name: "Complain To Me",
						onClick: () => setFilter({ filterType: 3 }),
					},
				]}
				segment={{
					onSegment: value => {
						if (value === "Table") {
							setTableView(true);
						} else {
							setTableView(false);
						}
					},
					label1: "List",
					label2: "Table",
				}}
			/>
			<ContBody>
				{complains && complains?.length > 0 ? (
					tableView ? (
						<Table
							columns={tableColumn()}
							dragable={true}
							data={complains}
						/>
					) : (
						<>
							{loader ? (
								<>
									<Skeleton avatar paragraph={{ rows: 4 }} />
								</>
							) : (
								<CardWrapper>
									{complains.map((item, index) => {
										return (
											<>
												<ListItem
													getComplainById={
														getComplainById
													}
													item={item}
													id={item.id}
													key={index}
												/>
											</>
										);
									})}
								</CardWrapper>
							)}
						</>
					)
				) : (
					<Skeleton avatar paragraph={{ rows: 4 }} />
				)}
			</ContBody>
			<Drawer
				title={
					<h1
						style={{
							fontSize: "20px",
							margin: 0,
						}}
					>
						Create Complain
					</h1>
				}
				width="768"
				onClose={() => {
					dispatch(handleOpenComposer(false));
				}}
				visible={drawerOpen}
				destroyOnClose={true}
				className="detailedViewComposer drawerSecondary"
			>
				<Composer />
			</Drawer>

			<DetailedView onClose={onClose} visible={visible} id={complainId} />
		</TabbableContainer>
	);
};

export default Reward;
