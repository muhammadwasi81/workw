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
import { AttachmentType } from "../../../documents/constant";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Zoom, Thumbs]);

function AttachmentsCarrousel({ attachments }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	// const getFileExtention = path => {
	// 	return path.split(".").slice(-1)[0];
	// };
	const getFile = file => {
		switch (file.attachmentTypeId) {
			case AttachmentType.video:
				return (
					<video controls className="w-full h-[600px]">
						<source src={file.path} />
					</video>
				);
			case AttachmentType.image:
				return (
					<img
						id={1}
						src={fileExtentionPreview(file.path)}
						className="object-contain w-full h-[600px]"
						alt=""
					/>
				);

			default:
				return (
					<iframe
						className="!block h-[600px] w-full"
						style={{ display: "block !important" }}
						src={file.path}
						// title="description"
						// width='500px'
						// height='500px'
						frameBorder="0"
					/>
				);
		}
	};
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
								<div className="flex justify-center items-center w-full">
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
