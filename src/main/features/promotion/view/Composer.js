import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { addPromotion, addWarning } from "../store/actions";
import { promotionDictionaryList } from "../localization/index";
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
  const { Direction, promotionDictionary } = promotionDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const { warningCategories } = useSelector((state) => state.warningCategorySlice);

  useEffect(() => {
    dispatch(getAllWarningCategories());
  }, []);

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  const onFinish = (values) => {
    dispatch(uploadImage(profileImage)).then((x) => {
      console.log(x, "FIRST ONE");
      let photoId = x.payload.data[0].id;
      console.log(values.approvers, "sadasdsada");

      let approvers = values.approvers.map((approver) => {
        return {
          approverId: approver,
          approverType: 0,
          isDefault: true,
          status: 0,
          email: "",
        };
      });
      //   let members = values.members.map((member) => {
      //     return {
      //       memberId: member,
      //       memberType: 0,
      //       email: "",
      //     };
      //   });

      let payload = { ...values, approvers };

      dispatch(addPromotion(payload));
      form.resetFields();
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="addPromotion"
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
        <Form.Item name="members" label={promotionDictionary.promotionTo} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <NewCustomSelect
            name="members"
            label={"Promotion To"}
            showSearch={true}
            direction={Direction}
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={promotionDictionary.selectMember}
          />
        </Form.Item>

        <Form.Item
          label={"Grade"}
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
            data={warningCategories}
            placeholder={promotionDictionary.category}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item name="approvers" label={promotionDictionary.approvers} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <NewCustomSelect
            name="approvers"
            label={promotionDictionary.approvers}
            showSearch={true}
            direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={promotionDictionary.selectApprovers}
          />
        </Form.Item>

        {/* <Form.Item area="true">
          <SingleUpload handleImageUpload={handleImageUpload} img="Add Image" position="flex-start" uploadText={promotionDictionary.upload} />
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" size="medium" className="ThemeBtn" block htmlType="submit" title={promotionDictionary.create}>
            {" "}
            {promotionDictionary.create}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
