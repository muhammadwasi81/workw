import { Button, Form, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { userTypeList } from "../../../../utils/Shared/enums/enums";
import { addInList } from "../store/slice";
const { Option } = Select;

const initialState = {
  id: "",
  name: "",
};

const QuickForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [state, setState] = useState(initialState);
  const [userTypeValue, setUserTypeValue] = useState([]);

  const { success, items } = useSelector((state) => state.quickAddSlice);

  const onFinish = (values) => {
    // console.log(values);
    let email = values.email.toLowerCase();
    let phoneNumber = values.phoneNumber.toLowerCase();
    let error = false;

    if (items.length > 0) {
      items.map((item) => {
        if (email === item.email || phoneNumber === item.phoneNumber) {
          message.error("Email or Phone Number already exist");
          error = true;
        }
      });
    }

    if (!error) {
      dispatch(addInList(values));
      form.resetFields();
    }
  };
  useEffect(() => {
    if (success) {
      form.resetFields();
    }
  }, [success]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="quickAddForm">
      <div className="formHeader">
        <h2>Add Quick Employee</h2>
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
        initialValues={{
          remember: true,
        }}
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
            <TextInput placeholder={"Enter Email"} type="email" />
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
              title={"Quick Add"}
            >
              {" "}
              {"Quick Add"}{" "}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default QuickForm;
