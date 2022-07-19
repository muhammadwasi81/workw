import { Button, Form, Input, Radio } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { addBonus } from "../store/actions";
import { bonusDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { getAllWarningCategories } from "../../warning/warningCategory/store/actions";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
import { uploadImage } from "../../../../utils/Shared/store/actions";

const initialState = {
  id: "",
  description: "",
  categoryId: "",
  imageId: "",
  members: [
    {
      memberId: "",
      memberType: 1,
    },
  ],
  approvers: [
    {
      approverId: "",
      approverType: 0,
      isDefault: true,
      status: 1,
      email: "",
    },
  ],
};

const Composer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, bonusDictionary } = bonusDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [value, setValue] = useState(1);

  const { warningCategories } = useSelector((state) => state.warningCategorySlice);

  useEffect(() => {
    dispatch(getAllWarningCategories());
  }, []);

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  const onFinish = (values) => {
    let members = values.members.map((member) => {
      return {
        memberId: member,
        memberType: 0,
        isDefault: true,
        status: 0,
        email: "",
      };
    });

    let approvers = values.approvers.map((approver) => {
      return {
        approverId: approver,
        approverType: 0,
        isDefault: true,
        status: 0,
        email: "",
      };
    });

    let payload = { ...values, approvers, members };

    dispatch(addBonus(payload));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleType = (value) => {
    setValue(value);
  };

  return (
    <>
      <Form
        form={form}
        name="addBonus"
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
        autoComplete="off">
        <Form.Item name="members" label={bonusDictionary.bonusTo} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <NewCustomSelect
            name="members"
            label={bonusDictionary.bonusTo}
            showSearch={true}
            direction={Direction}
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={bonusDictionary.selectMember}
          />
        </Form.Item>

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <Form.Item label={"Net Salary"} name="netsalary">
              <Input disabled size="large" />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              label={"Type"}
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please Select Type",
                },
              ]}>
              <Radio.Group onChange={handleType} value={value}>
                <Radio value={1}>Percent</Radio>
                <Radio value={2}>Amount</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-full">
            <Form.Item
              label={"Percent"}
              name="percent"
              rules={[
                {
                  required: true,
                  message: "Please Enter Amount Percent",
                },
              ]}>
              <Input placeholder="0" size="large" />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              label={"Amount"}
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please Enter Amount",
                },
              ]}>
              <Input placeholder="0" size="large" />
            </Form.Item>
          </div>
        </div>

        <Form.Item name="approvers" label={bonusDictionary.approvers} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <NewCustomSelect
            name="approvers"
            label={bonusDictionary.approvers}
            showSearch={true}
            direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={bonusDictionary.selectApprovers}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="large" className="ThemeBtn" block htmlType="submit" title={bonusDictionary.create}>
            {" "}
            {bonusDictionary.create}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
