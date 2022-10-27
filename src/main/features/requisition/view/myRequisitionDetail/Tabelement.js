import { Button, Modal } from "antd";
import React, { useContext, useState } from "react";
import { Table } from "../../../../sharedComponents/customTable";

import { useSelector } from "react-redux";
import { tableColumn } from "./tableColumn";
import OfferDetail from "./offerDetail";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

const TabElement = () => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { offers } = useSelector(state => state.requisitionSlice);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [offerDetail, setOfferDetail] = useState({});
	const [openDetail, setOpenDetail] = useState(false);

	const showModal = item => {
		setOfferDetail(item);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setOpenDetail(false);
	};

	const handleCancel = () => {
		setOpenDetail(false);
	};

	const getOfferDetail = data => {
		setOpenDetail(true);
		setOfferDetail(data);
	};

	const onRow = (record, rowIndex) => {
		return {
			onClick: event => {
				getOfferDetail(record);
			}, // click row
			onDoubleClick: event => {}, // double click row
			onContextMenu: event => {}, // right button click row
			onMouseEnter: event => {}, // mouse enter row
			onMouseLeave: event => {}, // mouse leave row
		};
	};

	return (
		<>
			{openDetail && (
				<Modal
					visible={openDetail}
					onOk={handleOk}
					onCancel={handleCancel}
					footer={null}
					width={"50%"}
				>
					<OfferDetail data={offerDetail} />
				</Modal>
			)}
			<Table
				columns={tableColumn(userLanguage)}
				dragable={true}
				data={offers ? offers : []}
				onRow={onRow}
			/>
		</>
	);
};

export default TabElement;
