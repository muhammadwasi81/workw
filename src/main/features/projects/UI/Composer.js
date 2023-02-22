import { Button, Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { getRewardCategory } from "../../../../utils/Shared/store/actions";
import SingleUpload from "../../../sharedComponents/Upload/singleUpload";
import { projectsDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import MemberListItem from "../../../sharedComponents/MemberByTag/Index";
import MemberComposer from "./MemberComposer";
import FeatureSelect from "../../../sharedComponents/FeatureSelect/Index";
import { DatePicker } from "antd";
import { validateEmail } from "../../../../utils/Shared/helper/validateEmail";
import { defaultUiid } from "../../../../utils/Shared/enums/enums";
import { addProject, updateProject } from "../store/actions";
import { jsonToFormData } from "../../../../utils/base";
import { useSelector } from "react-redux";
import moment from "moment";
import PrivacyOptions from "../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { useParams } from "react-router-dom";

const { RangePicker } = DatePicker;

const initialState = {
  name: "",
  description: "",
  imageId: defaultUiid,
  image: "",
  members: [
    {
      memberId: "",
      memberType: 1,
    },
  ],
};

const Composer = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, projectsDictionary } = projectsDictionaryList[
    userLanguage
  ];
  const { labels, placeholders, features, errors } = projectsDictionary;
  const loading = useSelector((state) => state.projectSlice.loader);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [privacyId, setPrivacyId] = useState(1);
  const [feature, setFeature] = useState([]);
  console.log(feature, "featuree composerr");

  const { projectId } = useParams();
  const onPrivacyChange = (value) => {
    setPrivacyId(value);
  };

  const [state, setState] = useState(initialState);

  const [memberList, setMemberList] = useState([]);

  const handleImageUpload = (data) => {
    setProfileImage(data[0].originFileObj);
  };

  const handelAddMember = (data) => {
    setMemberList([...memberList, data]);
  };

  const handleEndStartDate = (value, dateString, name) => {
    setState({
      ...state,
      [name]: dateString,
    });
  };
  const { detail, update, id } = props;
  const onFinish = () => {
    const values = form.getFieldsValue(true);
    let startDate = "";
    let endDate = "";
    if (values.startEndDate) {
      startDate = values.startEndDate[0].format();
      endDate = values.startEndDate[1].format();
    }
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
    if (!profileImage) {
      image.id = detail ? detail.imageId : defaultUiid;
    }
    let objToSend = {
      name: values.name,
      description: values.description,
      startDate,
      endDate,
      externals: values.externals,
      members,
      features: values.features,
      image,
      privacyId,
    };
    if (update) {
      dispatch(
        updateProject(
          jsonToFormData({
            name: values.name,
            description: values.description,
            image,
            id,
          })
        )
      );
      return;
    }
    dispatch(addProject(jsonToFormData(objToSend)));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (update) {
      const featureValues = (detail?.features || []).map((item) => ({
        [item.featureName]: true,
      }));
      form.setFieldsValue({
        features: detail?.features.map((item) => {
          return { featureId: item.featureId };
        }),
        name: detail?.name,
        description: detail?.description,
        startEndDate: [moment(detail?.startDate), moment(detail?.endDate)],
        externals: detail?.externals,
        ...featureValues.reduce(function(result, current) {
          return Object.assign(result, current);
        }, {}),
      });
      setMemberList([...detail?.members]);
      setPrivacyId(detail?.privacyId);
      // setProfileImage(detail.image);
    }
  }, [detail]);
  const onFeatureHandler = (featureId, checked) => {
    if (checked) {
      form.setFieldsValue({
        features: [...form.getFieldValue("features"), { featureId: featureId }],
      });
      const payload = {
        featureId: featureId,
        projectId: projectId,
      };
      setFeature(payload);
    }
  };
  return (
    <>
      <Form
        form={form}
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
              <Input
                placeholder={placeholders.name}
                size="large"
                className="!rounded"
              />
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item area="true" style={{ marginBottom: 0 }}>
              <SingleUpload
                handleImageUpload={handleImageUpload}
                position="flex-start"
                uploadText={labels.upload}
                url={detail?.image ? detail.image : ""}
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          style={{ marginTop: "-18px" }}
          label={labels.desc}
          name="description"
          rules={[
            {
              required: true,
              message: errors.desc,
            },
          ]}
        >
          <Input.TextArea
            placeholder={placeholders.desc}
            rows={4}
            className="!rounded"
          />
        </Form.Item>

        {!update && (
          <>
            <Form.Item label={labels.projectDate} name="startEndDate">
              <RangePicker
                format={"DD/MM/YYYY"}
                placeholder={[placeholders.startDate, placeholders.endDate]}
                onChange={(value, dateString) => {
                  handleEndStartDate(value, dateString, "start_end");
                }}
                size="large"
                className="!rounded"
              />
            </Form.Item>

            <Form.Item
              name={"externals"}
              label={labels.externals}
              direction={Direction}
              // rules={[
              //   {
              //     validator: (_, value) => {
              //       if (validateEmail(value[value.length - 1])) {
              //         form.setFieldsValue({
              //           externals: value,
              //         });
              //         return Promise.resolve();
              //       } else {
              //         message.error("Please add correct email.");
              //         form.setFieldsValue({
              //           externals: form
              //             .getFieldValue("externals")
              //             .slice(0, form.getFieldValue("externals").length - 1),
              //         });
              //         return Promise.reject(
              //           new Error("Please add correct email.")
              //         );
              //       }
              //     },
              //   },
              // ]}
            >
              <Select
                mode="tags"
                dropdownClassName="hidden"
                placeholder={placeholders.externalEmail}
                size="large"
              />
            </Form.Item>

            <MemberComposer
              handleAdd={handelAddMember}
              form={form}
              placeholder={placeholders}
              error={errors}
            />

            {memberList?.length > 0 ? (
              <MemberListItem
                data={memberList}
                onRemove={(row, ind) => {
                  setMemberList(memberList.filter((_, index) => index !== ind));
                }}
              />
            ) : null}
          </>
        )}

        <FeatureSelect
          features={feature}
          form={form}
          onChange={onFeatureHandler}
        />

        <Form.Item>
          <div className="flex items-center gap-2">
            <PrivacyOptions
              privacyId={privacyId}
              onPrivacyChange={onPrivacyChange}
              labels={labels}
            />
            <Button
              className="ThemeBtn"
              block
              size="large"
              htmlType="submit"
              loading={loading}
            >
              {props.buttonText}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default Composer;
