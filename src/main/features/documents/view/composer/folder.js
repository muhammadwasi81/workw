import { Button, Form, Input } from "antd";
import React, { useState, useContext } from "react";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import Select from "../../../../sharedComponents/Select/Select";
import { useDispatch } from "react-redux";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { uploadImage } from "../../../../../utils/Shared/store/actions";
import NewCustomSelect from "../../../../sharedComponents/CustomSelect/newCustomSelect";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { PostPrivacyType } from "../../../../../utils/Shared/enums/enums";
import { addDocument } from "../../store/actions";
import { DOCUMENT_ENUM } from "../../constant";
import { useSelector } from "react-redux";
import { documentDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

const CreateFolder = ({ isOpen, handleClose, referenceId, referenceType }) => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.documentSlice.loader);
  const ParentId = useSelector((state) => state.documentSlice.parentId);
  const [form] = Form.useForm();
  const [privacyId, setPrivacyId] = useState(PostPrivacyType.PUBLIC);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];
  const onPrivacyChange = (value) => {
    setPrivacyId(value);
  };

  const onFinish = (values) => {
    let payload = {
      name: values.name,
      description: values.description,
      members: values.readers
        ? values.readers.map((item) => ({
            memberId: item,
            memberType: 1,
            memberRightType: DOCUMENT_ENUM.MEMBER_RIGHT_TYPE.READER,
          }))
        : [],
      parentId: ParentId,
      documentType: DOCUMENT_ENUM.DUCOMENT_TYPE.folder,
      privacyId: privacyId,
      referenceId,
      referenceType,
    };
    dispatch(addDocument({ payload, form }));
    // form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <SideDrawer
        title={documentDictionary.CreateFolder}
        isDisable={true}
        isOpen={isOpen}
        isAccessDrawer={false}
        handleClose={handleClose}
      >
        <Form
          form={form}
          name="addFolder"
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
        >
          <Form.Item
            label={documentDictionary.Name}
            name="name"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: "Name",
              },
            ]}
          >
            <TextInput placeholder={documentDictionary.enterName} />
          </Form.Item>

          <Form.Item label={documentDictionary.Description} name="description">
            <Input.TextArea placeholder={documentDictionary.enterDescription} />
          </Form.Item>

          {privacyId === PostPrivacyType.PRIVATE && (
            <Form.Item
              name="readers"
              label={documentDictionary.readers}
              showSearch={true}
              // direction={Direction}
            >
              <NewCustomSelect
                name="readers"
                label={documentDictionary.readers}
                showSearch={true}
                // direction={Direction}
                mode="multiple"
                endPoint="api/Reference/GetAllUserReference"
                requestType="get"
                placeholder={documentDictionary.selectReaders}
              />
            </Form.Item>
          )}
          <Form.Item>
            <div className="flex items-center gap-2">
              <PrivacyOptions
                privacyId={privacyId}
                onPrivacyChange={onPrivacyChange}
              />
              <Button
                type="primary"
                size="medium"
                className="ThemeBtn"
                block
                htmlType="submit"
                title={documentDictionary.createMilepad}
                loading={loader}
              >
                {" "}
                {documentDictionary.CreateFolder}{" "}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </SideDrawer>
    </>
  );
};

export default CreateFolder;
