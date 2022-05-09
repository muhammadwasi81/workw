import React from "react";
import { Input, Select, Form, Dropdown } from "antd";

const PostFields = (props) => {
  const { TextArea } = Input;
  const { Option } = Select;
  return (
    <>
      <Form.Item name={"postDetail"}>
        <TextArea
          bordered={false}
          placeholder="Whats on your mind"
          autoSize={{ minRows: 1, maxRows: 6 }}
        />
      </Form.Item>
    </>
  );
};

export default PostFields;
