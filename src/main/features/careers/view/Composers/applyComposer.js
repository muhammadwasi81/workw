import React from "react";
import { Button, Drawer, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { addCareerApplicant } from "../../store/action";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";

const ApplyComposer = (props) => {
  const dispatch = useDispatch();
  console.log(props);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values, "values in onfinish", props.id);
    const payload = {
      ...values,
      careerId: props.id,
    };
    dispatch(addCareerApplicant(payload));
    // console.log(props.id);
    form.resetFields();
    props.onClose();
  };

  return (
    <>
      <Drawer
        title={<h1 style={{ fontSize: "20px", margin: 0 }}>{"Apply Job"}</h1>}
        width="768"
        // placement={
        //   (Direction === "ltr" ? "left" : "right",
        //   isTablet ? "bottom" : "right")
        // }
        placement="right"
        onClose={props.onClose}
        visible={props.visible}
        className="detailedViewComposer drawerSecondary"
        style={{
          cursor: "pointer",
        }}
      >
        <Form
          form={form}
          name="createCareer"
          className="createCareer"
          // initialValues={initialState}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label={"First Name"}
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please Enter First Name",
              },
            ]}
          >
            <Input size="large" placeholder="Enter First Name " type="text" />
          </Form.Item>
          <Form.Item
            label={"Last Name"}
            name="LastName"
            rules={[
              {
                required: true,
                message: "Please Enter Last Name",
              },
            ]}
          >
            <Input size="large" placeholder="Enter LastName " type="text" />
          </Form.Item>
          <Form.Item
            label={"Email"}
            name="email"
            rules={[
              {
                required: true,
                message: "Please Enter Email",
                type: "email",
              },
            ]}
          >
            <Input size="large" placeholder="Enter Email " type="email" />
          </Form.Item>
          <Form.Item
            label={"Phone Number"}
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please Enter Phone Number",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter Phone Number "
              type="number"
            />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item
              label={"Current Salary"}
              name="currentSalary"
              rules={[
                {
                  required: true,
                  message: "Please Enter Current Salary",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <Input size="large" placeholder="Current Salary" type="number" />
            </Form.Item>
            <Form.Item
              label={"Expected Salary"}
              name="expectedSalary"
              rules={[
                {
                  required: true,
                  message: "Please Enter Expected Salary",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <Input size="large" placeholder="Expected Salary" type="number" />
            </Form.Item>
          </div>
          <div className="flex justify-between">
            <Form.Item
              label={"Experience"}
              name="experience"
              rules={[
                {
                  required: true,
                  message: "Please Enter Experience",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <Input size="large" placeholder="Experience" type="number" />
            </Form.Item>
            <Form.Item
              label={"Notice Period"}
              name="noticePeriod"
              rules={[
                {
                  required: true,
                  message: "Please Enter Notice Period ",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <Input size="large" placeholder="Expected Salary" type="number" />
            </Form.Item>
          </div>
          <Form.Item label={"Cover Note"} name="note">
            <Input.TextArea size="large" placeholder={"Cover Note"} />
          </Form.Item>
          <Form.Item area="true" label="Attachment">
            <SingleUpload
              handleImageUpload={() => {}}
              img="Add Image"
              position="flex-start"
              uploadText={"Upload"}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="medium"
              className="ThemeBtn"
              block
              htmlType="submit"
            >
              Apply Job
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default ApplyComposer;
