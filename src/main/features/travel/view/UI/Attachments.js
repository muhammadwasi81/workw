import React, { useState } from "react";
import CustomModal from "../../../workboard/Modal/CustomModal";
// import { useSelector } from "react-redux";
// import CustomModal from "../../../workboard/Modal/CustomModal";
import { fileExtentionPreview } from "../../utils/fileExtentionHelper";
import AttachmentsCarrousel from "../AttachmentsCarrousel/AttachmentsCarrousel";
// import AttachmentsCarrousel from "../AttachmentsCarrousel/AttachmentsCarrousel";

function Attachments({ data = [], toShow = 1, isCarrousel = true, size = "100px" }) {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<>
			{data.length > 0 && (
				<div
					className="rounded-xl shadow-[1px_1px_3px_0px_rgba(13,12,12,0.17)] overflow-hidden "
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
						setIsVisible(true);
						// onClick();
					}}
				>
					<div
						className={`grid ${data.length > 1 &&
							"grid-cols-2"}  gap-2`}
					>
						{data.map((item, index) => {
							if (index < toShow) {
								return (
									<img
										className={`object-cover`}
										style={{ height: size, width: size }}
										src={fileExtentionPreview(item.path)}
										alt={item.attachmentName}
										key={item.id}
									/>
								);
							}
						})}

						{data.length > toShow && (
							<div className="relative">
								<div className="absolute bottom-0 w-full h-full text-white font-extrabold bg-[#707070] flex justify-center items-center bg-opacity-60 text-[25px]">
									+ {data.length - toShow}
								</div>
								<img
									className={`object-cover`}
									style={{ height: size, width: size }}
									src={fileExtentionPreview(
										data[toShow].path
									)}
									alt={data[toShow].attachmentName}
									key={data[toShow].id}
								/>
							</div>
						)}
					</div>
				</div>
			)}
			{isCarrousel && (
				<div
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					<CustomModal
						isModalVisible={isVisible}
						footer={null}
						width={"80%"}
						className="attachmentModal"
						onCancel={() => {
							setIsVisible(false);
						}}
						children={
							<AttachmentsCarrousel
								attachments={data}
								key={data}
							/>
						}
					/>
				</div>
			)}
		</>
	);
}

export default Attachments;
