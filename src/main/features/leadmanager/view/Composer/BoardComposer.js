import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Input, Skeleton } from "antd";
import WorkBoardMemberSelect from "./WorkBoardMemberSelect";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { useDispatch } from "react-redux";
// import { addWorkBoard, updateWorkBoard } from "../store/action";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { jsonToFormData } from "../../../../../utils/base";
import { defaultUiid } from "../../../../../utils/Shared/enums/enums";
import { addLeadManager, updateLeadManager } from "../../store/actions";
import { useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { LeadManagerDictionary } from "../../localization/index";

function BoardComposer({ isEdit, loading, dataLoading = false, direction }) {
  const leadDetail = useSelector(
    (state) => state.leadMangerSlice.leadManagerDetail
  );
  const { userLanguage } = useContext(LanguageChangeContext);
  const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
    userLanguage
  ];
  const { placeHolder, labels } = LeadManagerDictionaryList;
  const { createGrp, updateGrp } = labels;
  const [form] = Form.useForm();
  const userId = useSelector((state) => state.userSlice.user.id);
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [privacyId, setPrivacyId] = useState(1);

  const onFinish = (values) => {
    console.log(values, "values");
    let members = values.members.map((member) => {
      return { memberId: member };
    });
    let imgObj = { file: image, id: defaultUiid };
    let tempObj = { ...values };
    tempObj.members = members;
    tempObj.image = imgObj;
    tempObj.privacyId = privacyId;
    if (isEdit) {
      if (typeof image === "string" && image) {
        tempObj.image = { ...imgObj, id: leadDetail.imageId };
      }
      tempObj.id = leadDetail.id;
      dispatch(updateLeadManager(jsonToFormData(tempObj)));
      return;
    }
    dispatch(addLeadManager(jsonToFormData(tempObj)));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onPrivacyChange = (value) => {
    setPrivacyId(value);
  };
  useEffect(() => {
    setImage("");
  }, []);

  useEffect(() => {
    if (leadDetail && isEdit) {
      // console.log("lead detail", leadDetail);
      form.setFieldsValue({ ...leadDetail });
      form.setFieldsValue({
        members: leadDetail.members
          .map((members) => {
            return members.memberId;
          })
          .filter((member) => member !== userId),
      });
      setImage(leadDetail.image);
      setPrivacyId(leadDetail.privacyId);
    }
  }, [form, leadDetail]);

  return (
    <Form
      name="lead manager form"
      layout="vertical"
      initialValues={{ name: "", description: "", members: [] }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
      dir={direction}
      className={`${direction}`}
    >
      <div className="flex-col-reverse flex gap-2 sm:gap-10 sm:flex-row justify-center">
        <Form.Item
          label={labels.grpName}
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your board name!",
            },
          ]}
          className="w-full"
        >
          {dataLoading ? (
            <Skeleton.Input active={true} block size={"large"} />
          ) : (
            <Input size="large" placeholder={placeHolder.grpNamePH} />
          )}
        </Form.Item>
        <Form.Item area="true" className="!m-0">
          {dataLoading ? (
            <Skeleton.Image active={true} />
          ) : (
            <SingleUpload
              handleImageUpload={(fileData) => {
                // console.log("fileData", fileData);
                if (fileData.length > 0) {
                  setImage(fileData[0].originFileObj);
                } else {
                  setImage("");
                }
              }}
              uploadText={labels.uploadCvr}
              multiple={false}
              url={image}
              position={"justify-center"}
            />
          )}
        </Form.Item>
      </div>
      <Form.Item
        label={labels.grpDescription}
        name="description"
        rules={[
          {
            required: true,
            message: "Please input your board description!",
          },
        ]}
      >
        {dataLoading ? (
          <Skeleton.Input active={true} block size={"large"} />
        ) : (
          <Input size="large" placeholder={placeHolder.grpNameDescPH} />
        )}
      </Form.Item>
      {/* {!isEdit && ( */}
      <>
        {dataLoading ? (
          <Skeleton.Input active={true} block size={"large"} />
        ) : (
          <WorkBoardMemberSelect
            placeholder={placeHolder.serachMembersPH}
            label={labels.members}
          />
        )}
      </>
      {/* )} */}
      <Form.Item>
        <div className="flex items-center gap-2">
          {dataLoading ? (
            <>
              <Skeleton.Avatar active={true} size={"large"} shape={"square"} />
              <Skeleton.Button
                active={true}
                size={"large"}
                shape={"square"}
                block
              />
            </>
          ) : (
            <>
              <PrivacyOptions
                privacyId={privacyId}
                onPrivacyChange={onPrivacyChange}
                labels={labels}
              />
              <Button
                type="primary"
                htmlType="submit"
                block
                className="ThemeBtn"
                size="large"
                loading={loading}
              >
                {isEdit ? "Update Lead Manager" : "Create Lead Manager"}
              </Button>
            </>
          )}
        </div>
      </Form.Item>
    </Form>
  );
}

export default BoardComposer;
