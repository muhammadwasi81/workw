import React, { useState } from "react";
import SwiperCore, {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Zoom,
	Thumbs,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./attachmentsCarrousel.css";
import { fileExtentionPreview } from "../../utils/fileExtentionHelper";

import noPreview from "../../../../../content/NewContent/File/nopreview.png";
import { AttachmentType } from "../../../documents/constant";
import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Zoom, Thumbs]);

export const getFile = (file, className = "", showOptions) => {
	switch (file.attachmentTypeId) {
		case AttachmentType.video:
			return (
				<div className="relative">
					{!showOptions ? (
						<div className="!absolute !flex !justify-center !items-center h-[360px] w-full z-40  transition-all group">
							<PlayCircleOutlined className="!text-white !text-[60px] group-hover:!text-primary-color transition-all bg-[#2b333fb3] group-hover:!bg-white rounded-full overflow-hidden" />
						</div>
					) : null}
					<video
						controls={showOptions ? true : false}
						className="w-full "
						autoPlay={showOptions ? true : false}
					>
						<source src={file.path} />
					</video>
				</div>
			);
		case AttachmentType.image:
			return (
				<img
					id={1}
					src={fileExtentionPreview(file.path)}
					className="object-contain w-full h-auto"
					alt=""
				/>
			);
		case AttachmentType.document:
			if (file.extensionTypeId === 8) {
				return (
					<iframe
						className={
							"!block h-full w-full min-h-[600px]" + className
						}
						style={{ display: "block !important" }}
						src={file.path}
						frameBorder="0"
					/>
				);
			} else {
				return (
					<img
						id={1}
						src={noPreview}
						className="object-contain w-full h-full"
						alt="no preview available"
					/>
				);
			}
		default:
			return (
				<iframe
					className="!block h-auto w-full"
					style={{ display: "block !important" }}
					src={file.path}
					frameBorder="0"
				/>
			);
	}
};

function AttachmentsCarrousel({ attachments }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	// const getFileExtention = path => {
	// 	return path.split(".").slice(-1)[0];
	// };

	return (
		<div className="slider-container">
			<div className="slides">
				<Swiper
					style={{
						"--swiper-navigation-color": "gray",
						"--swiper-pagination-color": "gray",
						height: "100%",
					}}
					// loop={true}
					spaceBetween={10}
					translate="yes"
					navigation={true}
					thumbs={{ swiper: thumbsSwiper }}
					className="mySwiper2"
					// style={{height:"100%"}}

					zoom={true}
				>
					{attachments.map((slide, ind) => {
						return (
							<SwiperSlide zoom={true} key={ind}>
								<div className="flex justify-center items-center w-full" 
								style={{
									maxHeight: '70vh'
								}}>
									{getFile(slide)}
									{/* {getFileExtention(slide.path) === "mov" ? (
										<video
											controls
											className="w-full h-[600px]"
										>
											<source
												src={slide.path}
												// type=""
											/>
										</video>
									) : (
										<img
											id={1}
											src={fileExtentionPreview(
												slide.path
											)}
											className="object-contain w-full h-[600px]"
											alt=""
										/>
									)} */}
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
			{attachments.length > 1 && (
				<div className="attachment">
					<Swiper
						onSwiper={setThumbsSwiper}
						//  loop={true}
						spaceBetween={2}
						slidesPerView={15}
						freeMode={true}
						watchSlidesProgress={true}
						className="mySwiper"
						touchRatio={0.2}
					>
						{attachments.map((slide, ind) => {
							return (
								<SwiperSlide
									style={{ width: "100px" }}
									zoom={true}
									key={ind}
								>
									<img
										id={1}
										src={fileExtentionPreview(slide.path)}
										style={{
											height: "50px",
											width: "100%",
											objectFit: "contain",
										}}
										alt=""
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			)}
		</div>
	);
}

export default AttachmentsCarrousel;
