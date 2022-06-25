import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Radio } from "antd";
import "swiper/css";
import { expenseCategory } from "../enums/expenseCategory";
function ExpenseType() {
  return (
    <Radio.Group defaultValue="a" className="expenseCategory">
      <Swiper spaceBetween={5} slidesPerView={7}>
        {expenseCategory.map(({ id, name, image }, index) => {
          return (
            <SwiperSlide key={id}>
              <Radio.Button value={index}>
                {image}
                {name}
              </Radio.Button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Radio.Group>
  );
}

export default ExpenseType;
