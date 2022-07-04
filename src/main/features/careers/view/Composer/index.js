import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import Select from "../../../../sharedComponents/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { uploadImage } from "../../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../../../sharedComponents/CustomSelect/newCustomSelect";

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

const Composer = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const { rewardCategories } = useSelector((state) => state.sharedSlice);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    // dispatch(getRewardCategory());
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
      console.log(x, "FIRST ONE");
      let photoId = x.payload.data[0].id;

      let approvers = values.approvers.map((approver) => {
        return {
          approverId: approver,
          approverType: 0,
          // isDefault: true,
          // status: 0,
          email: "",
        };
      });
      let members = values.members.map((member) => {
        return {
          memberId: member,
          memberType: 0,
          // isDefault: true,
          // status: 0,
          // email: "",
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
        name="addJob"
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
        <Form.Item
          label={"Designation"}
          name=""
          rules={[
            {
              required: true,
              message: "Please Enter Designation",
            },
          ]}>
          <Select
            placeholder={"Select Designtion"}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={"Job Description"}
          name="jobDescription"
          rules={[
            {
              required: true,
              message: "Enter Job Description",
            },
          ]}>
          <Input.TextArea placeholder={"Job Description"} />
        </Form.Item>

        <div className="salaryRangeInputs">
          <Form.Item
            label="Range Of Salary"
            style={{
              marginBottom: 0,
            }}>
            <Form.Item
              name="minimumSalary"
              rules={[
                {
                  required: true,
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}>
              <Input size="large" placeholder="Enter Minimum Salary" />
            </Form.Item>
            <Form.Item
              name="maximumSalary"
              rules={[
                {
                  required: true,
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}>
              <Input size="large" placeholder="Enter Maximum Salary" />
            </Form.Item>
          </Form.Item>
        </div>

        <Form.Item
          label={"Department"}
          name=""
          rules={[
            {
              required: true,
              message: "Please Enter Department",
            },
          ]}>
          <Select
            placeholder={"Select Department"}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={"Supervisor"}
          name=""
          rules={[
            {
              required: true,
              message: "Please Select Supervisor",
            },
          ]}>
          <Select
            placeholder={"Select Supervisor"}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={"Interviewers"}
          name=""
          rules={[
            {
              required: true,
              message: "Please Select Interviewers",
            },
          ]}>
          <Select
            placeholder={"Select Interviewers"}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={"Post Interviewers"}
          name=""
          rules={[
            {
              required: true,
              message: "Please Select Post Interviewers",
            },
          ]}>
          <Select
            placeholder={"Select Post Interviewers"}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={"Hiring Buddy"}
          name=""
          rules={[
            {
              required: true,
              message: "Please Select Buddy",
            },
          ]}>
          <Select
            placeholder={"Select Buddy"}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item name="members" label={"Reward To"} showSearch={true} rules={[{ required: true }]}>
          <NewCustomSelect
            name="members"
            label={"Members"}
            showSearch={true}
            // direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={"Select Member"}
          />
        </Form.Item>

        <Form.Item name="approvers" label={"Approvers"} showSearch={true} rules={[{ required: true }]}>
          <NewCustomSelect
            name="approvers"
            label={"Approvers"}
            showSearch={true}
            // direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={"Select Approvers"}
          />
        </Form.Item>

        <Form.Item name="country" label={"Country"} showSearch={true} rules={[{ required: true }]}>
          <NewCustomSelect
            name="country"
            label={"Country"}
            showSearch={true}
            // direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={"Select Country"}
          />
        </Form.Item>

        <Form.Item name="city" label={"City"} showSearch={true} rules={[{ required: true }]}>
          <NewCustomSelect
            name="city"
            label={"city"}
            showSearch={true}
            // direction={Direction}
            mode="multiple"
            endPoint="api/Reference/GetAllUserReference"
            requestType="get"
            placeholder={"Select City"}
          />
        </Form.Item>

        <Form.Item area="true">
          <SingleUpload handleImageUpload={handleImageUpload} img="Add Image" position="flex-start" uploadText={"Upload"} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="medium" className="ThemeBtn" block htmlType="submit" title={"Create"}>
            {" "}
            {"Create"}{" "}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
