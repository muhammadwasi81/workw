import { Button, Form, Input } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "../../../../sharedComponents/Input/TextInput";
import { addGroup, updateGroup } from "../../store/actions";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { groupsDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

import MemberListItem from "../../../../sharedComponents/MemberByTag/Index";
import MemberComposer from "./MemberComposer";
import { jsonToFormData } from "../../../../../utils/base";

import {
  defaultUiid,
  FeaturesEnum,
} from "../../../../../utils/Shared/enums/enums";
import FeatureSelect from "../../../../sharedComponents/FeatureSelect/Index";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { addGroupFeaturesAction } from "../../store/actions";
import { useParams } from "react-router-dom";

const initialState = {
  id: "",
  name: "",
  description: "",
  imageId: "",
  members: [],
  hodId: "",
  parentId: "",
};

const Composer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, groupsDictionary } = groupsDictionaryList[userLanguage];
  const { labels, placeHolders, errors, features } = groupsDictionary;
  const { loader, createLoader } = useSelector((state) => state.groupSlice);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState("");
  const { detail, update = false, id } = props;
  const [privacyId, setPrivacyId] = useState(1);
  const [memberList, setMemberList] = useState([]);
  const { groupId } = useParams();

  const [feature, setFeature] = useState([]);
  const onPrivacyChange = (value) => {
    setPrivacyId(value);
  };

  const handleImageUpload = (fileData) => {
    setProfileImage(fileData[0].originFileObj);
  };

  const handelAddMember = (data) => {
    setMemberList([...memberList, data]);
  };

  const onFinish = () => {
    const values = form.getFieldsValue(true);
    let members = memberList.map((member) => {
      return {
        memberId: member.member.id,
        memberType: member.memberType,
      };
    });
    let image = {
      file: profileImage,
      id: defaultUiid,
    };
    if (update) {
      if (!JSON.stringify(profileImage).length) {
        image.id = detail.imageId;
      }
    }
    let objToSend = {
      name: values.name,
      description: values.description,
      members,
      features: values.features,
      image,
      privacyId,
    };

    if (update) {
      dispatch(
        updateGroup(
          jsonToFormData({
            name: values.name,
            description: values.description,
            image,
            id,
            features: values.features,
            privacyId,
          })
        )
      );
      return;
    }
    dispatch(addGroup(jsonToFormData(objToSend)));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (update) {
      const featureValues = detail.features.map((item) => ({
        [item.featureName]: true,
      }));
      form.setFieldsValue({
        features: detail.features.map((item) => {
          return { featureId: item.featureId };
        }),
        name: detail.name,
        description: detail.description,
        ...featureValues.reduce(function(result, current) {
          return Object.assign(result, current);
        }, {}),
      });
      setMemberList([...detail.members]);
      setPrivacyId(detail.privacyId);
    }
  }, [detail]);

  const onFeatureHandler = (featureId, checked) => {
    if (checked) {
      form.setFieldsValue({
        features: [...form.getFieldValue("features"), { featureId: featureId }],
      });
      const payload = {
        featureId: featureId,
        groupId: groupId,
      };
      setFeature(payload);
    }
  };
  return (
    <>
      <Form
        form={form}
        name="addDepartment"
        initialValues={{ Feed: true, features: [{ featureId: 1 }] }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        dir={Direction}
        layout={"vertical"}
        className={`${Direction}`}
      >
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <Form.Item
              label={labels.name}
              name="name"
              labelPosition="top"
              rules={[
                {
                  required: true,
                  message: errors.name,
                },
              ]}
            >
              <TextInput placeholder={placeHolders.namePh} />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item area="true" style={{ marginBottom: 0 }}>
              <SingleUpload
                handleImageUpload={handleImageUpload}
                position="flex-start"
                uploadText={labels.upload}
                multiple={false}
                url={detail?.image ? detail.image : ""}
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          style={{ marginTop: "-18px" }}
          label={labels.desc}
          name="description"
        >
          <Input.TextArea placeholder={placeHolders.descPh} />
        </Form.Item>

        {!update && (
          <>
            <MemberComposer
              handleAdd={handelAddMember}
              placeholder={placeHolders}
              error={errors}
              form={form}
              memberList={memberList?.length > 0}
            />

            {memberList?.length > 0 ? (
              <MemberListItem
                data={memberList}
                onRemove={(row, ind) => {
                  setMemberList(memberList.filter((_, index) => index !== ind));
                }}
              />
            ) : (
              ""
            )}
          </>
        )}
        {!update && (
          <FeatureSelect
            features={features}
            form={form}
            notIncludeFeature={FeaturesEnum.Travel}
            onChange={onFeatureHandler}
          />
        )}

        <Form.Item>
          <div className="flex items-center gap-2">
            <PrivacyOptions
              privacyId={privacyId}
              onPrivacyChange={onPrivacyChange}
              labels={labels}
            />
            <Button
              size="large"
              className="ThemeBtn"
              block
              htmlType="submit"
              loading={createLoader}
              // onClick={onFinish}
            >
              {update
                ? groupsDictionary.updateTextBtn
                : groupsDictionary.createTextBtn}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
