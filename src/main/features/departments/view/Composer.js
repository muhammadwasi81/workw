import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
// import Button from "../../../../components/SharedComponent/button/index";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { getRewardCategory } from "../../../../utils/Shared/store/actions";
import { addDepartment } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { departmentDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { uploadImage } from "../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../employee/view/newCustomSelect";

const initialState = {
  id: "",
  name: "",
  description: "",
  imageId: "",
  members: [
    {
      memberId: "",
      memberType: 1,
    },
  ],
  hodId: "",
};

const Composer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, departmentDictionary } = departmentDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);

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
    form.resetFields();

    dispatch(uploadImage(profileImage)).then((x) => {
      // console.log(
      // 	x.payload.data[0].id,
      // 	"Hurry i got image if from server"
      // );

      //   console.log(x, "FIRST ONE");
      let photoId = x.payload.data[0].id;

      //   let approvers = values.approvers.map((approver) => {
      //     return {
      //       approverId: approver,
      //       approverType: 0,
      //       isDefault: true,
      //       status: 0,
      //       email: "",
      //     };
      //   });
      let members = values.members.map((approver) => {
        return {
          approverId: approver,
          approverType: 0,
          isDefault: true,
          status: 0,
          email: "",
        };
      });

      let payload = { ...values, imageId: photoId, approvers, members };
      console.log(payload, "FINALLLL!!!!");

      //   dispatch(addDepartment(payload));
      // console.log(payload, "Final Data");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="addDepartment"
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
          label={departmentDictionary.name}
          name="name"
          labelPosition="top"
          rules={[
            {
              required: true,
              message: departmentDictionary.pleaseEnterRewardName,
            },
          ]}>
          <TextInput placeholder={departmentDictionary.enterRewardName} />
        </Form.Item>

        <Form.Item
          label={departmentDictionary.description}
          name="description"
          rules={[
            {
              required: true,
              message: departmentDictionary.enterDescription,
            },
          ]}>
          <Input.TextArea placeholder={departmentDictionary.enterDescription} />
        </Form.Item>

        <Form.Item name="hodId" label={"HOD"} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <NewCustomSelect
            name="hodId"
            label={"HOD"}
            showSearch={true}
            direction={Direction}
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={"Select HOD"}
          />
        </Form.Item>

        <Form.Item name="members" label={"Members"} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <NewCustomSelect
            name="members"
            label={"Select Members"}
            showSearch={true}
            direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={departmentDictionary.selectMember}
          />
        </Form.Item>

        <Form.Item area="true">
          <SingleUpload handleImageUpload={handleImageUpload} img="Add Image" position="flex-start" uploadText={departmentDictionary.upload} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="medium" className="ThemeBtn" block htmlType="submit" title={departmentDictionary.createReward}>
            {" "}
            {"Create Department"}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
