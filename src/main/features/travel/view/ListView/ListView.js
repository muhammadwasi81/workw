import React, { useState,useContext} from "react";
// import { useNavigate } from "react-router-dom";
import { Drawer, Skeleton } from "antd";
// import TravelDetailCard from "../UI/TravelDetailCard";
// import CardDetailView from "./CardDetailView";
import CardProfileTopView from "./CardProfileTopView";
import Calender from "../../../../../content/svg/Calender.svg";
import location from "../../../../../content/svg/location.svg";
// import { ROUTES } from "../../../../../utils/routes";

import moment from "moment";
import Avatar from "../../../../sharedComponents/Avatar/avatar";
import TravelDetail from "../TravelDetail/TravelDetail";
import { useDispatch } from "react-redux";
import { handleAttachmentModal, resetTravelDetail } from "../../store/slice";
import Attachments from "../UI/Attachments";
import CustomModal from "../../../workboard/Modal/CustomModal";
import AttachmentsCarrousel from "../AttachmentsCarrousel/AttachmentsCarrousel";
import { useSelector } from "react-redux";
import { ClockCircleOutlined } from "@ant-design/icons";
import { getNameForImage } from "../../../../../utils/base";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { TravelDictionary} from "../../localization/index"

function ListView(props) {
	const { userLanguage } = useContext(LanguageChangeContext);
	const { Direction,TravelDictionaryList } = TravelDictionary[userLanguage];
    const {headings}=TravelDictionaryList;
	const { labels } = props;
	const [visible, setVisible] = useState(false);
	const [travelId, setTravelId] = useState("");
	const isAttachmentModalOpen = useSelector(
		state => state.travelSlice.attachments.isAttachmentModalOpen
	);
	const data = useSelector(
		state => state.travelSlice.attachments.attachmentsData
	);

	const dispatch = useDispatch();
	const showDrawer = id => {
		setTravelId(id);
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};
	// useEffect(() => {
	// 	if (!visible) {

	// 	}
	// }, [visible]);

	// console.log("travel", props);
	return (
		<div className="gap-5 flex flex-col z-10 ">
			{props.data
				? props.data.map((data, index) => (
						<div
							className="flex bg-white flex-col gap-2 rounded-xl cursor-pointer overflow-hidden hover:shadow-lg duration-300"
							onClick={() => {
								showDrawer(data.id);
							}}
						>
							<div className="p-3 sm:p-5">
								<CardProfileTopView
									profileImgSrc={
										data.creator &&
										data.creator.image.length > 0
											? data.creator.image
											: ""
									}
									createDate={data.createDate}
									isPublic={true}
									name={data.creator && data.creator.name}
									destination={
										data.creator && data.creator.designation
											? data.creator.designation
											: "Not Designated"
									}
									refNo={data.referenceNo}
									status={data.status}
									profileImgSize={40}
									showIcon={false}
								/>
								<div className="flex justify-between flex-wrap mt-2">
									<div className="flex flex-col gap-1">
										<span className="text-black text-semi-bold">
											{data.subject}
										</span>
										<div>
											<span className="text-black text-semi-bold">
												{labels.description}:{" "}
											</span>
											{data.description}
										</div>
									</div>
									{/* attachments */}
									<div>
										<Attachments
											data={data.attachments}
											key={data}
											onClick={() => {
												dispatch(
													handleAttachmentModal(
														data.attachments
													)
												);
											}}
										/>
									</div>
								</div>
								<div className="flex-1 flex-wrap min-w-fit border-r-2 gap-3 bg-[#F6F7F9] p-4 rounded flex items-center relative overflow-auto ">
									<div className="flex gap-3 items-center min-w-[200px]">
										<img
											src={Calender}
											alt=""
											className="h-[30px]"
										/>
										<div className="flex flex-col gap font-semibold">
											<span className="">
												{headings.departureDate}
											</span>
											<span className="text-primary-color">
												{moment(
													data.cities[0].departureDate
												).format("D MMM YYYY")}
											</span>
										</div>
									</div>
									<div className="flex gap-3 items-center min-w-[200px]">
										{/* <img
											src={Calender}
											alt=""
											className="h-[30px]"
										/> */}
										<ClockCircleOutlined className="h-[30px] !text-2xl !text-[#1a5669]" />
										<div className="flex flex-col gap font-semibold">
											<span className="">
											{headings.departureTime}
											</span>
											<span className="text-primary-color">
												{moment
													.utc(
														data.cities[0]
															.departureDate
													)
													.local()
													.format("HH:mm")}
											</span>
										</div>
									</div>

									<div className="flex gap-3 items-center before:h-[40px] before:-left-[50px] before:w-[1px] before:bg-[#D9D9D9] before:absolute relative min-w-[300px]">
										<img
											src={location}
											alt=""
											className="h-[30px]"
										/>
										<div className="flex flex-col gap font-semibold">
											<span className="break-words">
											{headings.departureCity}
											</span>
											<span className="text-primary-color">
												{data.departure +
													" - " +
													data.departureCountry}
											</span>
										</div>
									</div>

									<div className="flex gap-3 items-center before:h-[40px] before:-left-[50px] before:w-[1px] before:bg-[#D9D9D9] before:absolute relative min-w-[300px]">
										<img
											src={location}
											alt=""
											className="h-[30px]"
										/>
										<div className="flex flex-col gap font-semibold">
											<span className="break-words">
											{headings.arrivalCity}	
											</span>
											<span className="text-primary-color">
												{data.arrival +
													" - " +
													data.arrivalCountry}
											</span>
										</div>
									</div>
									<div className="flex gap-3 items-center before:h-[40px] before:-left-[50px] before:w-[1px] before:bg-[#D9D9D9] before:absolute relative min-w-[150px]">
										<div className="flex flex-col gap font-semibold">
											<span className=""> {headings.approvers}  </span>
											<Avatar
												heading={"Approvers"}
												membersData={data.approvers}
												size={"small"}
											/>
										</div>
									</div>
									<div className="flex gap-3 items-center before:h-[40px] before:-left-[50px] before:w-[1px] before:bg-[#D9D9D9] before:absolute relative min-w-[150px]">
										<div className="flex flex-col gap font-semibold">
											<span className="">{headings.agents}</span>
											<Avatar
												heading={"Agents"}
												membersData={data.agents}
												size={"small"}
											/>
										</div>
									</div>
							</div>
						</div>
						</div>
				  ))
				: null}
			{/* {props.loader &&
				[0, 0, 0].map(() => (
					<Skeleton
						active
						avatar
						paragraph={{
							rows: 4,
						}}
					/>
				))} */}
			<Drawer
				title="Travel Detail"
				placement="right"
				onClose={onClose}
				open={visible}
				// visible={visible}
				width={"768px"}
				destroyOnClose={true}
			>
				<TravelDetail travelId={travelId} />
			</Drawer>
			<div
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
				}}
			>
				<CustomModal
					isModalVisible={isAttachmentModalOpen}
					footer={null}
					width={"80%"}
					className="attachmentModal"
					onCancel={() => dispatch(handleAttachmentModal([]))}
					children={
						<AttachmentsCarrousel attachments={data} key={data} />
					}
				/>
			</div>
		</div>
	);
}

export default ListView;