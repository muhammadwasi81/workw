import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import TextInput from "../../../sharedComponents/Input/TextInput";
import Select from "../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { getRewardCategory } from "../../../../utils/Shared/store/actions";
import { addLeave } from "../store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { leaveDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { uploadImage } from "../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../employee/view/newCustomSelect";
import { getAllLeaveType } from "../leaveType/store/actions";
import { DatePicker, Checkbox, Typography } from "antd";

const { RangePicker } = DatePicker;

const initialState = {
  id: "",
  description: "",
  leaveTypeId: "",
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
  const { Direction, leaveDictionary } = leaveDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const { leaveTypes } = useSelector((state) => state.leaveTypeSlice);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    dispatch(getAllLeaveType());
    // dispatch(getAllEmployee());
    // console.log(employeesList, "EMPLOYEES")
  }, []);

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  const handleEndStartDate = (value, dateString, name) => {
    setState({
      ...state,
      [name]: dateString,
    });
  };

  const onFinish = (values) => {
    form.resetFields();

    dispatch(uploadImage(profileImage)).then((x) => {
      // console.log(
      // 	x.payload.data[0].id,
      // 	"Hurry i got image if from server"
      // );
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
      let members = values.members.map((member) => {
        return {
          memberId: member,
          memberType: 1,
          isDefault: true,
          status: 0,
          email: "",
        };
      });

      let payload = { ...values, imageId: photoId, approvers, members };

      dispatch(addLeave(payload));
      console.log(payload, "FINALLLLL");
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
        name="addLeave"
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
          label={"Leave Type"}
          name="leaveTypeId"
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
            data={leaveTypes}
            placeholder={"Select Type"}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item name="members" label={"On Behalf Of"} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <NewCustomSelect
            name="members"
            label={leaveDictionary.members}
            showSearch={true}
            direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={leaveDictionary.selectMember}
          />
        </Form.Item>

        <Form.Item name="approvers" label={leaveDictionary.approvers} showSearch={true} direction={Direction} rules={[{ required: true }]}>
          <NewCustomSelect
            name="approvers"
            label={leaveDictionary.approvers}
            showSearch={true}
            direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={leaveDictionary.approvers}
          />
        </Form.Item>

        <Form.Item
          label={leaveDictionary.description}
          name="description"
          rules={[
            {
              required: true,
              message: leaveDictionary.enterDescription,
            },
          ]}>
          <Input.TextArea placeholder={leaveDictionary.enterDescription} />
        </Form.Item>

        <Form.Item label="Leaves Dates" name="startEndDate">
          <RangePicker
            format={"DD/MM/YYYY"}
            placeholder={["Start Start", "End Date"]}
            onChange={(value, dateString) => {
              handleEndStartDate(value, dateString, "start_end");
            }}
          />
        </Form.Item>

        <Form.Item area="true">
          <SingleUpload handleImageUpload={handleImageUpload} img="Add Image" position="flex-start" uploadText={leaveDictionary.upload} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="medium" className="ThemeBtn" block htmlType="submit" title={"Create Leave"}>
            {" "}
            {"Create Leave"}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
