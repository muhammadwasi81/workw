import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
// import Button from "../../../../components/SharedComponent/button/index";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { getRewardCategory } from "../../../../utils/Shared/store/actions";
import { addReward } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { customApprovalDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { uploadImage } from "../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../../sharedComponents/CustomSelect/newCustomSelect";

const initialState = {
  id: "",
  description: "",
  categoryId: "",
  imageId: "",
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
  const { Direction, customApprovalDictionary } = customApprovalDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const { rewardCategories } = useSelector((state) => state.sharedSlice);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    dispatch(getRewardCategory());
  }, []);

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  const onFinish = (values) => {
    form.resetFields();

    dispatch(uploadImage(profileImage)).then((x) => {
      console.log(x, "FIRST ONE");
      let photoId = x.payload.data[0].id;

      let approvers = values.approvers.map((approver) => {
        return {
          approverId: approver,
          approverType: 0,
          isDefault: true,
          status: 0,
          email: "",
        };
      });

      let payload = { ...values, imageId: photoId, approvers, members };
      // dispatch(addReward(payload));
    });
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
          label={"Subject"}
          name="subject"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: "Please Enter Subject",
            },
          ]}>
          <TextInput placeholder={"Enter Subject"} />
        </Form.Item>

        <Form.Item
          label={customApprovalDictionary.category}
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
            placeholder={customApprovalDictionary.category}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={"Amount"}
          name="amount"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: "Please Enter Amount",
            },
          ]}>
          <TextInput placeholder={"Enter Amount"} />
        </Form.Item>

        <Form.Item name="approvers" label={customApprovalDictionary.approvers} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <NewCustomSelect
            name="approvers"
            label={customApprovalDictionary.approvers}
            showSearch={true}
            direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={customApprovalDictionary.approvers}
          />
        </Form.Item>

        <Form.Item
          label={customApprovalDictionary.description}
          name="description"
          rules={[
            {
              required: true,
              message: customApprovalDictionary.enterDescription,
            },
          ]}>
          <Input.TextArea placeholder={customApprovalDictionary.enterDescription} />
        </Form.Item>

        <Form.Item area="true">
          <SingleUpload handleImageUpload={handleImageUpload} img="Add Image" position="flex-start" uploadText={customApprovalDictionary.upload} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="medium" className="ThemeBtn" block htmlType="submit" title={customApprovalDictionary.createReward}>
            {" "}
            {customApprovalDictionary.createCustomApproval}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
