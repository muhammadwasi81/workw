import React, { useState, useContext, useEffect } from "react";
import { Button, Drawer, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import { addCareerApplicant } from "../../store/action";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { STRINGS } from "../../../../../utils/base";
import TextArea from "antd/lib/input/TextArea";
import { useSelector } from "react-redux";
import { handleOpenApplyComposer } from "../../store/slice";

const ApplyComposer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList, Direction } = CareerDictionary[userLanguage];
  const dispatch = useDispatch();
  const [attachments, setAttachment] = useState([]);
  const [form] = Form.useForm();

  const { loader, applySuccess, applyComposer } = useSelector(
    (state) => state.careerSlice
  );

  useEffect(() => {
    if (applySuccess) {
      form.resetFields();
    }
  }, [applySuccess]);

  const { labels } = CareerDictionaryList;
  // console.log(CareerDictionaryList);

  const onFinish = (values) => {
    console.log(values, "values in onfinish", props.id);
    // console.log(attachments[0].originFileObj);
    const payload = {
      ...values,
      careerId: props.id,
      attachments:
        attachments.length === 0
          ? attachments
          : [{ file: attachments[0].originFileObj, id: STRINGS.DEFAULTS.guid }],
    };
    dispatch(addCareerApplicant(payload));
  };

  return (
    <>
      <Drawer
        title={
          <h1 style={{ fontSize: "20px", margin: 0 }}>{labels.applyJob}</h1>
        }
        width="768"
        // onClose={props.onClose}
        onClose={() => {
          dispatch(handleOpenApplyComposer(false));
        }}
        visible={applyComposer}
        className="detailedViewComposer drawerSecondary"
        placement={Direction === "rtl" ? "left" : "right"}
        style={{
          cursor: "pointer",
          textAlign: Direction === "ltr" ? "" : "end",
        }}
      >
        <Form
          form={form}
          name="createCareer"
          className={Direction === "rtl" ? "createCareerRight" : "createCareer"}
          // initialValues={initialState}
          onFinish={onFinish}
          layout="vertical"
          style={{ direction: Direction }}
        >
          <Form.Item
            label={labels.firstName}
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please Enter First Name",
              },
            ]}
          >
            <Input
              size="large"
              placeholder={labels.enterFirstName}
              type="text"
            />
          </Form.Item>
          <Form.Item
            label={labels.lastName}
            name="LastName"
            rules={[
              {
                required: true,
                message: "Please Enter Last Name",
              },
            ]}
          >
            <Input
              size="large"
              placeholder={labels.enterLastName}
              type="text"
            />
          </Form.Item>
          <Form.Item
            label={labels.email}
            name="email"
            rules={[
              {
                required: true,
                message: "Please Enter Email",
                type: "email",
              },
            ]}
          >
            <Input size="large" placeholder={labels.enterEmail} type="email" />
          </Form.Item>
          <Form.Item
            label={labels.phoneNumber}
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
              placeholder={labels.enterPhoneNumber}
              type="number"
            />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item
              label={labels.currentSalary}
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
              <Input
                size="large"
                placeholder={labels.currentSalary}
                type="number"
              />
            </Form.Item>
            <Form.Item
              label={labels.expectedSalary}
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
              <Input
                size="large"
                placeholder={labels.expectedSalary}
                type="number"
              />
            </Form.Item>
          </div>
          <div className="flex justify-between">
            <Form.Item
              label={labels.experience}
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
              <Input
                size="large"
                placeholder={labels.experience}
                type="number"
              />
            </Form.Item>
            <Form.Item
              label={labels.noticePeriod}
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
              <Input
                size="large"
                placeholder={labels.noticePeriod}
                type="number"
              />
            </Form.Item>
          </div>
          <Form.Item label={labels.coverNote} name="note">
            <Input.TextArea size="large" placeholder={labels.coverNote} />
          </Form.Item>
          <Form.Item area="true" label={labels.attachment} name="attachment">
            <SingleUpload
              handleImageUpload={(val) => {
                setAttachment(val);
              }}
              img="Add Image"
              position="flex-start"
              uploadText={labels.upload}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="medium"
              className="ThemeBtn"
              block
              htmlType="submit"
              loading={loader}
            >
              {labels.applyJob}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default ApplyComposer;
