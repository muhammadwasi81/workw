import { Button, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { userTypeList } from "../../../../utils/Shared/enums/enums";
import { addInList, handleSave } from "../store/slice";

const { Option } = Select;

const initialState = {
  id: "",
  name: "",
};

const UpdateForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [userTypeValue, setUserTypeValue] = useState([]);
  const { success, editData } = useSelector((state) => state.quickAddSlice);
  const index = editData.index;

  const onFinish = (values) => {
    dispatch(handleSave({ ...values, index }));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue(editData);
  }, [form, editData]);

  return (
    <div className="quickAddForm">
      <div className="formHeader">
        <h2>Update</h2>
      </div>
      <Form
        form={form}
        name="quickAdd"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={editData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row">
          <Form.Item
            label={"Firsr Name"}
            name="firstName"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter First Name",
              },
            ]}
          >
            <TextInput placeholder={"Enter First Name"} />
          </Form.Item>
          <Form.Item
            label={"Last Name"}
            name="lastName"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Last Name",
              },
            ]}
          >
            <TextInput placeholder={"Enter Last Name"} />
          </Form.Item>
          <Form.Item
            label={"Email"}
            name="email"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Email",
              },
            ]}
          >
            <TextInput placeholder={"Enter Email"} />
          </Form.Item>
          {/* <Form.Item
                        name="userTypeId"
                        rules={[{ required: true }]}
                        label={"Type"}
                    >
                        <Select
                            onChange={(value) => {
                                setUserTypeValue(value);
                            }}
                            size="large"
                            placeholder={"Select User Type"}
                            getPopupContainer={(trigger) => trigger.parentNode}
                        >
                            {userType.map((type) => (
                                <Option key={type.id} value={type.id}>
                                    {type.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item> */}
          <Form.Item
            name="userTypeId"
            rules={[{ required: true }]}
            label={"Type"}
          >
            <Select
              onChange={(value) => {
                setUserTypeValue(value);
              }}
              size="large"
              placeholder={"Select User Type"}
              getPopupContainer={(trigger) => trigger.parentNode}
            >
              {userTypeList.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={"Phone Number"}
            name="phoneNumber"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Please Enter Phone Number",
              },
            ]}
          >
            <TextInput placeholder={"Enter Phone Number"} />
          </Form.Item>
        </div>
        <div className="formButtons">
          <Form.Item>
            <Button
              type="primary"
              size="medium"
              className="ThemeBtn"
              block
              htmlType="submit"
              // loading={loader}
              title={"Save"}
            >
              {" "}
              {"Save"}{" "}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default UpdateForm;
