import React, { useEffect, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button, Drawer } from "antd";
import {
	ContBody,
	TabbableContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import { Skeleton, Modal } from "antd";
import { dictionaryList } from "../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import ListItem from "./ListItem";
import Composer from "./composer";
import DetailedView from "./DetailedView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllRequisition } from "../store/actions";
import { CardWrapper } from "../../../sharedComponents/Card/CardStyle";
import { tableColumn } from "./TableColumn";
import { Table } from "../../../sharedComponents/customTable";
import TopBar from "../../../sharedComponents/topBar/topBar";
import Header from "../../../layout/header/index";
import { handleOpenComposer } from "../store/slice";
import { emptyEmployeesData } from "../../../../utils/Shared/store/slice";

const Requisition = props => {
	const { visible } = props;
	const { userLanguage } = useContext(LanguageChangeContext);
	const { sharedLabels, rewardsDictionary } = dictionaryList[userLanguage];

	const [tableView, setTableView] = useState(false);
	const isTablet = useMediaQuery({ maxWidth: 800 });
	const [detailId, setDetailId] = useState(false);

	const [filter, setFilter] = useState({ filterType: 0, search: "" });

	const dispatch = useDispatch();
	const { items, loader, rewardDetail, drawerOpen } = useSelector(
		state => state.requisitionSlice
	);

	const [searchFilterValues, setSearchFilterValues] = useState();

	const onClose = () => {
		setDetailId(null);
	};

	useEffect(() => {
		dispatch(getAllRequisition(filter));
	}, [filter]);

	return (
		<>
			<TabbableContainer className="">
				<Header
					buttons={[
						{
							buttonText: "Create Travel",
							render: (
								<Button
									className="ThemeBtn"
									onClick={() =>
										dispatch(handleOpenComposer(true))
									}
								>
									Create Requisition
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
							name: "Requisitions",
							onClick: () => setFilter({ filterType: 0 }),
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
					{items?.length > 0 ? (
						tableView ? (
							<Table
								columns={tableColumn()}
								dragable={true}
								data={items}
							/>
						) : (
							<>
								{loader ? (
									<>
										<Skeleton
											avatar
											paragraph={{ rows: 4 }}
										/>
									</>
								) : (
									<CardWrapper>
										{items.map((item, index) => {
											return (
												<>
													<ListItem
														item={item}
														id={item.id}
														key={index}
														onClick={() =>
															setDetailId(item.id)
														}
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
				{<DetailedView onClose={onClose} id={detailId} />}

				<Drawer
					title={
						<h1
							style={{
								fontSize: "20px",
								margin: 0,
							}}
						>
							Create Requisition
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
		</>
	);
};

export default Requisition;
