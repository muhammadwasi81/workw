import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
// import Button from "../../../../components/SharedComponent/button/index";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { getRewardCategory } from "../../../../utils/Shared/store/actions";
import { addReward } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { rewardDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { uploadImage } from "../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";
import { STRINGS } from "../../../../utils/base";

const initialState = {
  id: "",
  name: "",
  reason: "",
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
  const { Direction, rewardDictionary } = rewardDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const { rewardCategories } = useSelector((state) => state.sharedSlice);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    dispatch(getRewardCategory());
    // dispatch(getAllEmployee());
    // console.log(employeesList, "EMPLOYEES")
  }, []);

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  const onFinish = (values) => {
    console.log(profileImage)
    let approvers = values.approvers.map((approver) => {
      return {
        approverId: approver
      };
    });
    let members = values.members.map((memeber) => {
      return {
        memberId: memeber
      };
    });
    let image = { id: STRINGS.DEFAULTS.guid, file:profileImage[0].originFileObj }
    let payload = { ...values, approvers, members, image };
    console.log("payload")
    dispatch(addReward(payload));
    form.resetFields();

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="addReward"
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
      // className={Direction === "ltr" ? "align-right" : ""}
      >
        <Form.Item
          label={rewardDictionary.name}
          name="name"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: rewardDictionary.pleaseEnterRewardName,
            },
          ]}>
          <TextInput placeholder={rewardDictionary.enterRewardName} />
        </Form.Item>

        <Form.Item
          label={rewardDictionary.category}
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Please Enter Category",
            },
          ]}>
          <Select
            // value={
            //   "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            // }
            data={rewardCategories}
            placeholder={rewardDictionary.category}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={rewardDictionary.reason}
          name="reason"
          rules={[
            {
              required: true,
              message: rewardDictionary.enterRewardReason,
            },
          ]}>
          <TextInput placeholder={rewardDictionary.enterRewardReason} />
        </Form.Item>

        <Form.Item name="members" label={rewardDictionary.rewardTo} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <NewCustomSelect
            name="members"
            label={rewardDictionary.members}
            showSearch={true}
            direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={rewardDictionary.selectMember}
          />
        </Form.Item>

        <Form.Item name="approvers" label={rewardDictionary.approvers} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <NewCustomSelect
            name="approvers"
            label={rewardDictionary.approvers}
            showSearch={true}
            direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={rewardDictionary.approvers}
          />
        </Form.Item>

        <Form.Item
          label={rewardDictionary.description}
          name="description"
          rules={[
            {
              required: true,
              message: rewardDictionary.enterDescription,
            },
          ]}>
          <Input.TextArea placeholder={rewardDictionary.enterDescription} />
        </Form.Item>

        <Form.Item area="true">
          <SingleUpload handleImageUpload={handleImageUpload} img="Add Image" position="flex-start" uploadText={rewardDictionary.upload} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="medium" className="ThemeBtn" block htmlType="submit" title={rewardDictionary.createReward}>
            {" "}
            {rewardDictionary.createReward}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
