import React, { useEffect, useContext, useState } from "react";
import {
	ContBody,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Button, Skeleton, Drawer } from "antd";
import { promotionDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ListItem from "./ListItem";
import Composer from "./Composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllPromotions, GetPromotionById } from "../store/actions";
import TableView from "./TableView";
import { CardWrapper } from "../../../layout/GridStyle";

import { Table } from "../../../sharedComponents/customTable";
import { tableColumn } from "./TableColumn";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";
import { ROUTES } from "../../../../utils/routes";

const Promotion = props => {
	const dispatch = useDispatch();
	const { userLanguage } = useContext(LanguageChangeContext);
	const { promotionDictionary } = promotionDictionaryList[userLanguage];
	const [promotionId, setPromotionId] = useState("");

	const [tableView, setTableView] = useState(false);

	const [visible, setVisible] = useState(false);

	const [filter, setFilter] = useState({ filterType: 0, search: "" , sortBy:1});

	const { promotions, loader, promotionDetail, drawerOpen } = useSelector(
		state => state.promotionSlice
	);

	const onClose = () => {
		setVisible(false);
	};

	const getPromotionId = id => {
		setPromotionId(id);
		setVisible(true);
	};

	useEffect(() => {
		dispatch(getAllPromotions(filter));
	}, [filter]);

<<<<<<< HEAD
	
=======
	const items = [
		{
		  name: 'Promotions',
		  to: `${ROUTES.PROMOTION}`,
		  renderButton: [1],
		},
	  ];

>>>>>>> 46e506d3842fad6d0148875206644f6f43e6426d
	return (
		<TabbableContainer className="max-width-1190">
			<Header
				items={items}
				buttons={[
					{
						buttonText: "Create Promotion",
						render: (
							<Button
								className="ThemeBtn"
								onClick={() =>
									dispatch(handleOpenComposer(true))
								}
							>
								Create Promotion
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
						name: "Promotions",
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
						name: "Promotion To Me",
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
				{promotions && promotions.length > 0 ? (
					tableView ? (
						<div>
							<Table
								columns={tableColumn()}
								dragable={false}
								data={promotions}
							/>
						</div>
					) : (
						<>
							{loader ? (
								<>
									<Skeleton avatar paragraph={{ rows: 4 }} />
								</>
							) : (
								<CardWrapper>
									{promotions.map((item, index) => {
										return (
											<>
												<ListItem
													getPromotionId={
														getPromotionId
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
					"Data not found"
				)}
			</ContBody>

			<DetailedView
				onClose={onClose}
				visible={visible}
				id={promotionId}
			/>

			<Drawer
				title={
					<h1
						style={{
							fontSize: "20px",
							margin: 0,
						}}
					>
						Create Promotion
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
		</TabbableContainer>
	);
};

export default Promotion;
