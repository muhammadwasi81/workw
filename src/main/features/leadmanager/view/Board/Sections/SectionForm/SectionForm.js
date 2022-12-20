import React, { useEffect, useContext } from "react";
import { Button, Form, Input, Radio, Select, Tag } from "antd";
import { BiPencil, BiWorld } from "react-icons/bi";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { LeadManagerDictionary } from "../../../../localization";
import { LanguageChangeContext } from "../../../../../../../utils/localization/localContext/LocalContext";
import { useDispatch } from "react-redux";
import { resetSuccess } from "../../../../store/slice";

// import { leadSectionEnum } from "../../../../enum/enum";
function SectionForm(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const Option = Select;
  const loading = useSelector((state) => state.leadMangerSlice.loading);
  const success = useSelector((state) => state.leadMangerSlice.success);
  const leadManagerDetail = useSelector(
    (state) => state.leadMangerSlice.leadManagerDetail
  );
  useEffect(() => {
    if (success) {
      form.resetFields();
      dispatch(resetSuccess());
      props.handleToggleForm();
    }
  }, [success]);

  // console.log('leadManagerDetail?.leadManagerDetail?.sections',);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
    userLanguage
  ];
  const { detail, labels, placeHolder, status } = LeadManagerDictionaryList;
  return (
    <div className="bg-white p-3 rounded-sm">
      <Form
        form={form}
        name="basic"
        initialValues={{
          typeId: 1,
          sectionId: leadManagerDetail?.sections[0].id,
        }}
        layout={"vertical"}
        onFinish={props.onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Name required!",
            },
          ]}
        >
          <Input
            prefix={<BiPencil className="!text-gray-500" />}
            placeholder={placeHolder.leadName}
          />
        </Form.Item>
        <Form.Item name="phoneNumber">
          <Input
            prefix={<PhoneOutlined rotate={90} className="!text-gray-500" />}
            placeholder={placeHolder.leadPhoneNumber}
          />
        </Form.Item>
        <Form.Item name="emailAddress">
          <Input
            type={"email"}
            prefix={<MailOutlined className="!text-gray-500" />}
            placeholder={placeHolder.leadEmailAddress}
          />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Address required!",
            },
          ]}
        >
          <Input
            prefix={<EnvironmentOutlined className="!text-gray-500" />}
            placeholder={placeHolder.leadAddress}
          />
        </Form.Item>
        <Form.Item
          name="website"
          // rules={[
          //   {
          //     required: true,
          //     message: "Website required!",
          //   },
          // ]}
        >
          <Input
            prefix={<BiWorld className="!text-gray-500" />}
            placeholder={placeHolder.leadWebiste}
            type={"url"}
            defaultValue="http://www."
          />
        </Form.Item>
        <Form.Item name="typeId">
          <Radio.Group>
            <Radio value={1}> {detail.business}</Radio>
            <Radio value={2}> {detail.individual}</Radio>
          </Radio.Group>
        </Form.Item>
        {props.list && (
          <Form.Item name="sectionId" label={labels.section}>
            <Select>
              {leadManagerDetail?.sections.map((leadSection) => (
                <Option value={leadSection.id} key={leadSection.id}>
                  <Tag color={leadSection.colorCode}>{leadSection.name}</Tag>
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item>
          <div className="flex items-end gap-2 justify-end">
            <Button
              htmlType="button"
              className="ThemeBtn"
              onClick={props.handleToggleForm}
            >
              {labels.cancel}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="ThemeBtn"
              loading={loading}
            >
              {labels.add}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SectionForm;
