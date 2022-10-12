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
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Zoom, Thumbs]);

function PostAttachment({ attachments, onOpen }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	return (
		<div className="slider-container">
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
								<img
									id={1}
									src={slide.path}
									style={{
										height: "100%",
										width: "min-content",
									}}
									alt=""
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
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
								>
									<img
										id={1}
										src={slide.path}
										style={{
											height: "50px",
											width: "100%",
											objectFit: "cover",
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

export default PostAttachment;
