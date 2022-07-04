import { Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
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

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Zoom, Thumbs]);

function PostModel({ open, setModelState, post, leftComponent }) {
  const [visible, setVisible] = useState(false);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  const onClose = () => {
    // setVisible(false)

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
                {post.image.map((slide, ind) => {
                  return (
                    <SwiperSlide zoom={true} key={ind}>
                      <img
                        id={1}
                        src={slide}
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
            {post.image.length > 1 && (
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
                  {post.image.map((slide, ind) => {
                    return (
                      <SwiperSlide
                        style={{ width: "100px" }}
                        zoom={true}
                        key={ind}
                      >
                        <img
                          id={1}
                          src={slide}
                          style={{
                            height: "100px",
                            width: "100%",
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
              {leftComponent}
            </div>
          </Col>
        )}
      </Row>
    </Modal>
  );
}

export default PostModel;
