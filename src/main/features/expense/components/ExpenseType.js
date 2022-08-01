import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Form, Radio } from "antd";
import "swiper/css";
import { expenseCategory } from "../enums/expenseCategory";
function ExpenseType({ labels }) {
  return (
    <Form.Item
      label={labels.category}
      name="categoryId"
      labelPosition="top"
      rules={[{ required: true }]}
    >
      <Radio.Group defaultValue={1} className="expenseCategory">
        <Swiper spaceBetween={5} slidesPerView={8}>
          {expenseCategory.map(({ id, name, image }) => {
            return (
              <SwiperSlide key={id}>
                <Radio.Button value={id}>
                  {image}
                  {name}
                </Radio.Button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Radio.Group>
    </Form.Item>
  );
}

export default ExpenseType;
