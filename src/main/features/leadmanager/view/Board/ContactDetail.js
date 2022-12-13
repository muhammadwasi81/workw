import { Button, Form, Input, Select, Tag } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { jsonToFormData } from "../../../../../utils/base";
import { DEFAULT_GUID } from "../../../../../utils/constants";
import CommentWrapper from "../../../../sharedComponents/Comment/CommentWrapper";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import {
  addLeadManagerContact,
  updateLeadManagerContact,
} from "../../store/actions";
import { LeadManagerDictionary } from "../../localization";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

const { Option } = Select;
function ContactDetail(props) {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
    userLanguage
  ];
  const { detail, labels, placeHolder, status } = LeadManagerDictionaryList;
  const prefixSelector = (
    <Form.Item name="titleId" noStyle>
      <Select>
        <Option value={1}>{labels.mr}</Option>
        <Option value={2}>{labels.ms}</Option>
        <Option value={3}>{labels.mrs}</Option>
      </Select>
    </Form.Item>
  );
  useEffect(() => {
    setImage("");
  }, []);
  const { isContactUpdated, contactDetail } = props;
  const onFinish = (value) => {
    let imageObj = {
      // id: DEFAULT_GUID,
      id: !isContactUpdated
        ? DEFAULT_GUID
        : typeof image === "string"
        ? props.contactDetail.imageId
        : DEFAULT_GUID,
      file: image,
    };
    // if (props.contactDetail.imageId !== DEFAULT_GUID) {
    // 	imageObj = { ...imageObj, id: props.contactDetail.imageId };
    // }
    if (!isContactUpdated) {
      dispatch(
        addLeadManagerContact(
          jsonToFormData({
            image: { ...imageObj },
            ...value,
            detailId: props.data.id,
          })
        )
      );
      return;
    }
    // console.log("image", typeof image);
    // if (typeof image === "string") {
    // 	console.log("true");
    // } else {
    // 	console.log("false");
    // }
    dispatch(
      updateLeadManagerContact(
        jsonToFormData({
          image: { ...imageObj },
          ...value,
          detailId: props.data.id,
          id: props.contactDetail.id,
        })
      )
    );
  };

  useEffect(() => {
    if (isContactUpdated) {
      form.setFieldsValue({ ...contactDetail });
      setImage(contactDetail.image);
    }
  }, [isContactUpdated]);

  return (
    <Form
      name="basic"
      autoComplete="off"
      layout="vertical"
      initialValues={{ titleId: 1 }}
      onFinish={onFinish}
      form={form}
    >
      <div className="grid gap-x-5 grid-cols-[1.8fr_1.3fr_0.3fr]">
        <div className="flex gap-5">
          <Form.Item
            label={labels.friendlyStatus}
            name="friendlyStatusId"
            className=""
          >
            <Select
              // onChange={handleChange}
              placeholder={placeHolder.selectFriendlyStatus}
            >
              <Option value={1}>
                <Tag color="green">{status.friendly}</Tag>
              </Option>
              <Option value={2}>
                <Tag color="yellow">{status.neutral}</Tag>
              </Option>
              <Option value={3}>
                <Tag color="red">{status.unfriendly}</Tag>
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={labels.activeStatus}
            name="activeStatusId"
            className=""
          >
            <Select
              // onChange={handleChange}
              placeholder={placeHolder.selectActiveStatus}
            >
              <Option value={1}>
                <Tag color="green">{status.active}</Tag>
              </Option>
              <Option value={2}>
                <Tag color="red">{status.inActive}</Tag>
              </Option>
            </Select>
          </Form.Item>
        </div>
        <div></div>

        <Form.Item
          label={labels.name}
          name="name"
          className="w-full"
          rules={[
            {
              required: true,
              message: "Please enter name!",
            },
          ]}
        >
          <Input
            placeholder={placeHolder.writeName}
            addonBefore={prefixSelector}
          />
        </Form.Item>
        <div
          style={{ gridArea: "1/3/span 2/ span 1" }}
          className="flex items-end"
        >
          <SingleUpload
            handleImageUpload={(fileData) => {
              if (fileData.length > 0) {
                setImage(fileData[0].originFileObj);
              } else {
                setImage(null);
              }
              // console.log("filedata", fileData);
            }}
            // uploadText={labels.uploadCvr}
            // multiple={false}
            url={image}
            position={"justify-end item-end"}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-5">
        <Form.Item
          label={labels.phone}
          name="phoneNumber"
          className=""
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter phone number!",
          //   },
          // ]}
        >
          <Input placeholder={placeHolder.writePhoneNumber} />
        </Form.Item>
        <Form.Item
          label={labels.email}
          name="email"
          className=""
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter valid email!",
          //   },
          // ]}
        >
          <Input placeholder={placeHolder.writeEmailAddress} type={"email"} />
        </Form.Item>
        <Form.Item
          label={labels.officeAddress}
          name="officeAddress"
          className=""
        >
          <Input placeholder={placeHolder.writeOfficeAddress} />
        </Form.Item>
        <Form.Item label={labels.address} name="address" className="">
          <Input placeholder={placeHolder.writeAddress} />
        </Form.Item>
        <Form.Item label={labels.gender} name="genderId" className="">
          <Select placeholder={placeHolder.selectGender}>
            <Option value={1}>{labels.male}</Option>
            <Option value={2}>{labels.female}</Option>
          </Select>
        </Form.Item>
        <Form.Item label={labels.designation} name="designation" className="">
          <Input placeholder={placeHolder.writeDesignation} />
        </Form.Item>
        <Form.Item
          label={labels.description}
          name="description"
          className=""
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter description!",
          //   },
          // ]}
        >
          <Input placeholder={placeHolder.writeDescription} />
        </Form.Item>
      </div>
      {props.isContactUpdated && (
        <CommentWrapper
          referenceId={props.contactDetail.id}
          isCommentLoad={true}
          module={8}
          loadSkeleton={true}
        />
      )}

      <Form.Item className="!mt-5">
        <Button
          type="primary"
          htmlType="submit"
          className="ThemeBtn !block ml-auto"
          loading={props.loading}
        >
          {!props.isContactUpdated ? labels.addContact : labels.updateContact}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ContactDetail;
