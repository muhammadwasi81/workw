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
import { FullscreenOutlined } from "@ant-design/icons";
import { getFile } from "../../../../../travel/view/AttachmentsCarrousel/AttachmentsCarrousel";
import { fileExtentionPreview } from "../../../../../travel/utils/fileExtentionHelper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Zoom, Thumbs]);

function PostAttachment({ attachments, onOpen, isDetail }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	return (
		<div className="slider-container cursor-pointer">
			<div>
				<div
					className="attacmentFullScreenBtn"
					onClick={() => onOpen(true)}
				>
					<FullscreenOutlined />
				</div>
				<div className="slides">
					<Swiper
						style={{
							"--swiper-navigation-color": "#fff",
							"--swiper-pagination-color": "#fff",
							height: "100%",
							maxHeight: "360px",
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
								<SwiperSlide
									zoom={true}
									key={ind}
									onClick={e => e.stopPropagation()}
								>
									<div
										className="flex justify-center items-center w-full"
										onClick={() => onOpen(true)}
									>
										{getFile(slide, "", isDetail)}
									</div>
									{/* <img
									id={1}
									src={slide.path}
									style={{
										height: "100%",
										width: "min-content",
									}}
									alt=""
								/> */}
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
			{attachments.length > 1 && (
				<div className="thumbnails">
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
									className="cursor-pointer"
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
										className="cursor-pointer"
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

export default PostAttachment;
