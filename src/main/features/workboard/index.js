import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import { defaultUiid } from "../../../utils/Shared/enums/enums";
import useDebounce from "../../../utils/Shared/helper/use-debounce";
import {
	ContBody,
	TabbableContainer,
} from "../../sharedComponents/AppComponents/MainFlexContainer";
import WorkBoardDashboard from "./Dashboard/WorkBoardDashboard";
import { WorkBoardReferenceTypeEnum } from "./enum";
import { WorkBoardDictionary } from "./localization";
import { getAllWorkBoard } from "./store/action";
import Header from "./UI/Header";
import WorkBoardTopBar from "./UI/WorkBoardTopBar";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

function WorkBoard({
	referenceType = WorkBoardReferenceTypeEnum.General,
	referenceId = defaultUiid,
	width = "",
	routeLink,
	backButton,
}) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
		userLanguage
	];
	const { topBar } = WorkBoardDictionaryList;
	const [isTableView, setIsTableView] = useState(false);
	const [search, setSearch] = useState("");
	const [api, setApi] = useState({
		pageNo: 1,
		pageSize: 20,
		sortBy: 1,
		search: "",
		referenceId,
		referenceType,
	});
	const searchVal = useDebounce(api.search, 500);
	const dispatch = useDispatch();
	const { pageNo, pageSize, sortBy } = api;
	useEffect(() => {
		dispatch(getAllWorkBoard(api));
	}, [searchVal, pageNo, pageSize, sortBy, dispatch]);

	const handleColumnSorting = (pagination, filters, sorter) => {
		const { current, pageSize } = pagination;
		setApi(prevState => ({
			...prevState,
			pageSize,
			pageNo: current,
		}));

		const { order } = sorter;
		if (order === "ascend") {
			setApi(prevState => ({
				...prevState,
				sortBy: 2,
			}));

			return;
		}
		setApi(prevState => ({
			...prevState,
			sortBy: 1,
		}));
	};

	return (
		<>
			<TabbableContainer className="">
				<Header
					width={width}
					routeLink={routeLink}
					backButton={backButton}
				/>
				<WorkBoardTopBar
					handleView={isTable => {
						setIsTableView(isTable);
					}}
					handleSearch={value => {
						setApi(prevState => ({
							...prevState,
							search: value,
						}));
					}}
					topBar={topBar}
					width={width}
				/>
				<div>
		     
						</div>
				<ContBody className={`!block ${width}`}>
					<WorkBoardDashboard
						isTableView={isTableView}
						referenceType={referenceType}
						referenceId={referenceId}
						onChange={handleColumnSorting}
					/>
				</ContBody>
			</TabbableContainer>
		</>
	);
}

export default WorkBoard;
