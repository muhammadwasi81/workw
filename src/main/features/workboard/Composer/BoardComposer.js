import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Input } from "antd";
// import WorkBoardMemberSelect from "./WorkBoardMemberSelect";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { useDispatch } from "react-redux";
import { addWorkBoard, updateWorkBoard } from "../store/action";
import PrivacyOptions from "../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { jsonToFormData } from "../../../../utils/base";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import WorkBoardMemberSelect from "../../leadmanager/view/Composer/WorkBoardMemberSelect";
import { useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { WorkBoardDictionary } from "../localization";

function BoardComposer({ isEdit, loading }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { labels, placeholder } = WorkBoardDictionaryList;

  const workboardDetail = useSelector(
    (state) => state.trelloSlice.workboardDetail
  );
  const userId = useSelector((state) => state.userSlice.user.id);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [privacyId, setPrivacyId] = useState(1);

  const onFinish = (values) => {
    let membersObj = values.members.map((member) => {
      return { memberId: member };
    });
    let imgObj = { file: image, id: defaultUiid };
    let tempObj = { ...values };
    tempObj.members = membersObj;
    tempObj.image = imgObj;
    tempObj.privacyId = privacyId;
    if (isEdit) {
      if (typeof image === "string" && image) {
        tempObj.image = { ...imgObj, id: workboardDetail.imageId };
      }
      tempObj.id = workboardDetail.id;
      dispatch(updateWorkBoard(jsonToFormData(tempObj)));
      return;
    }
    dispatch(addWorkBoard(jsonToFormData(tempObj)));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onPrivacyChange = (value) => {
    setPrivacyId(value);
  };
  useEffect(() => {
    if (workboardDetail && isEdit) {
      form.setFieldsValue({ ...workboardDetail });
      form.setFieldsValue({
        members: workboardDetail.members
          .map((members) => {
            return members.memberId;
          })
          .filter((member) => member !== userId),
      });
      setImage(workboardDetail.image);
      setPrivacyId(workboardDetail.privacyId);
    }
  }, [form, workboardDetail]);

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ name: "", description: "", members: [] }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <div className="flex gap-10">
        <Form.Item
          label={labels.name}
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your board name!",
            },
          ]}
          className="w-full"
        >
          <Input size="large" placeholder={placeholder.name} />
        </Form.Item>
        <Form.Item area="true" className="!m-0">
          <SingleUpload
            handleImageUpload={(fileData) => {
              setImage(fileData[0].originFileObj);
            }}
            uploadText={labels.uploadCvr}
            multiple={false}
            url={image}
          />
        </Form.Item>
      </div>
      <Form.Item
        label={labels.description}
        name="description"
        rules={[
          {
            required: true,
            message: "Please input your board description!",
          },
        ]}
      >
        <Input.TextArea
          size="large"
          placeholder={placeholder.desc}
          // rows={4}
          autoSize={{ minRows: 4, maxRows: 4 }}
        />
      </Form.Item>

      {/* <Form.Item label="Members" name="members">
				<WorkBoardMemberSelect
					onChange={(val, obj) => {
						setMembersData(val);
					}}
					defaultData={
						composerData &&
						composerData.members.map(members => {
							return members.memberId;
						})
					}
					loadDefaultData={true}
					loading={loading}
				/>
			</Form.Item> */}
      <WorkBoardMemberSelect
        label={labels.members}
        placeholder={placeholder.members}
      />
      <Form.Item>
        <div className="flex items-center gap-2">
          <PrivacyOptions
            privacyId={privacyId}
            onPrivacyChange={onPrivacyChange}
          />
          <Button
            type="primary"
            htmlType="submit"
            block
            className="ThemeBtn"
            size="large"
            loading={loading}
          >
            {isEdit ? labels.Update : labels.Create}
            {/* {labels.Board} */}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default BoardComposer;
