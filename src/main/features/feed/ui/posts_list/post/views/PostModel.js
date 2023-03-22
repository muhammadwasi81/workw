import { Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import "./../stylesheet/PostModel.css";
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
import { getFeedById } from "../../../../store/actions";
import PostModalLeft from "./PostModalLeft";
import store from "../../../../../../../store/store";
import { feedSlice } from "../../../../store/slice";
import { getFile } from "../../../../../travel/view/AttachmentsCarrousel/AttachmentsCarrousel";
import { fileExtentionPreview } from "../../../../../travel/utils/fileExtentionHelper";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Zoom, Thumbs]);

function PostModel({ id, open, setModelState, leftComponent }) {
	const [visible, setVisible] = useState(false);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const dispatch = useDispatch();
	const { singlePost } = useSelector(state => state.feedSlice);

	useEffect(() => {
		setVisible(open);
	}, [open]);
	useEffect(() => {
		if (visible) {
			dispatch(getFeedById(id));
			return () => {
				store.dispatch(feedSlice.actions.clearSinglePost());
			};
		}
	}, [visible, dispatch, id]);

	const onClose = () => {
		setModelState(false);
	};

	return (
		<Modal
			title={null}
			centered
			className="post-model"
			visible={visible}
			onCancel={onClose}
			footer={null}
			style={{ backgroundColor: "#181717" }}
		>
			<Row style={{ height: "100%", backgroundColor: "#181717" }}>
				<Col
					xs={leftComponent ? 24 : 24}
					sm={leftComponent ? 12 : 24}
					md={leftComponent ? 16 : 24}
					lg={leftComponent ? 18 : 24}
					style={{ height: "100%" }}
				>
					<div className="slider-container">
						<div className="slides">
							<Swiper
								style={{
									"--swiper-navigation-color": "#fff",
									"--swiper-pagination-color": "#fff",
									height: "100%",
									width: "100%",
								}}
								// loop={true}
								spaceBetween={10}
								translate="yes"
								navigation={true}
								thumbs={{ swiper: thumbsSwiper }}
								className="mySwiper2"
								zoom={true}
							>
								{singlePost?.attachments?.map((slide, ind) => {
									return (
										<SwiperSlide
											zoom={false}
											key={ind}
											style={{
												height: "100%",
												width: "100%",
											}}
										>
											<div className="flex justify-center items-center w-full h-full">
												{getFile(
													slide,
													"!h-full",
													true
												)}
											</div>
											{/* <img
                        id={1}
                        src={path}
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
						{singlePost?.attachments?.length > 1 && (
							<div className="thumbnails">
								<Swiper
									onSwiper={setThumbsSwiper}
									//  loop={true}
									spaceBetween={5}
									slidesPerView={10}
									freeMode={true}
									watchSlidesProgress={true}
									className="mySwiper"
									touchRatio={0.2}
								>
									{singlePost?.attachments?.map(
										({ path }, ind) => {
											return (
												<SwiperSlide
													style={{ width: "100px" }}
													zoom={true}
													key={ind}
												>
													<img
														id={1}
														src={fileExtentionPreview(
															path
														)}
														style={{
															height: "100px",
															width: "100%",
															objectFit:
																"contain",
														}}
														alt=""
													/>
												</SwiperSlide>
											);
										}
									)}
								</Swiper>
							</div>
						)}
					</div>
				</Col>
				{leftComponent && (
					<Col xs={24} sm={12} md={8} lg={6}>
						<div
							style={{
								backgroundColor: "white",
								width: "100%",
								height: "100%",
							}}
						>
							{<PostModalLeft post={singlePost} />}
						</div>
					</Col>
				)}
			</Row>
		</Modal>
	);
}

export default PostModel;
