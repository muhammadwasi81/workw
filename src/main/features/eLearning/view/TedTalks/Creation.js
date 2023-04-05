import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardLayout from "../Dashboard/Layout/DashboardLayout";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { FormContainer, Heading, MainContainer } from "./styleObjects";
import "./style.css";
import { Avatar, Button, Form, Input, Select, Radio } from "antd";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { useState } from "react";
import { STRINGS, getNameForImage } from "../../../../../utils/base";
import { useSelector } from "react-redux";
import CustomSelect from "../../../../sharedComponents/Select/Select";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { PostPrivacyType } from "../../../../../utils/Shared/enums/enums";
import { addTedTalk } from "../../store/action";
import FileUploader from "../../../Messenger/view/MessengerBox/components/fileUploader";
import { getELearningCategory } from "../../../eLearningCategory/store/action";

const { Option } = Select;

function CreateTedTalk() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[
    userLanguage
  ];

  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [privacyId, setPrivacyId] = useState(PostPrivacyType.PUBLIC);
  const [fileType, setFileType] = useState(1);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);
  const [videoType, setVideoType] = useState(1);

  const { ELearningCategory } = useSelector(
    (state) => state.eLearningCategorySlice
  );
  const { loaders, addTedTalksuccess } = useSelector(
    (state) => state.eLearningSlice
  );
  const employees = useSelector((state) => state.sharedSlice.employees);

  const onChangeRadio = (e) => {
    let value = e.target.value;
    setVideoType(value);
  };

  let loader = loaders.addTedTalkLoading;
  const selectedData = (data, obj) => {
    setValue(data);
    handleMember(obj);
  };
  useEffect(() => {
    fetchEmployees("", 0);
  }, []);

  const handleMember = (val) => {
    setNewState({
      ...newState,
      members: [...val],
    });
  };

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  const [newState, setNewState] = useState({
    members: [],
    memberType: null,
  });

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  useEffect(() => {
    dispatch(getELearningCategory());
  }, []);

  const onPrivacyChange = (value) => {
    setPrivacyId(value);
  };

  const handleImageUpload = (data) => {
    setProfileImage(data[0]);
  };

  const handleVideoUpload = (data) => {
    setVideo(data[0]);
  };

  const onFinish = (values) => {
    // let members = [];
    // let assignMembers = [];
    // if (typeof values.members === "string") {
    //   members.push({
    //     memberId: values.members,
    //   });
    // } else {
    //   members = values.members.map((member) => {
    //     return {
    //       memberId: member,
    //     };
    //   });
    // }

    // if (typeof values.assignMembers === "string") {
    //   assignMembers.push({
    //     memberId: values.assignMembers,
    //   });
    // } else {
    //   assignMembers = values.assignMembers.map((member) => {
    //     return {
    //       memberId: member,
    //     };
    //   });
    // }

    let image = {
      id: STRINGS.DEFAULTS.guid,
      file: profileImage && profileImage,
    };

    let attachment = {
      id: STRINGS.DEFAULTS.guid,
      file: video && video,
    };

    let dataObject = {
      categoryId: values.categoryId,
      description: values.description,
      privacyId: privacyId,
      name: values.name,
      links: values.links,
      // authorName: values.athorName,
      // members: members,
      // assignMembers: assignMembers,
      image: image,
      attachment: attachment,
    };

    if (Object.keys(image).length > 0) {
      dispatch(addTedTalk(dataObject));
    } else {
      dispatch(addTedTalk(dataObject));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (addTedTalksuccess) {
      form.resetFields();
      setProfileImage([]);
      setVideo([]);
    }
  }, [addTedTalksuccess]);

  return (
    <DashboardLayout>
      <MainContainer className="AddCourseMainContainer">
        <Heading>Create TedTalk</Heading>
        <Form
          form={form}
          name="addTedTalk"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <FormContainer>
            <div className="flex">
              <div className="innerColumn">
                <Form.Item
                  label={"Select Category"}
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Category",
                    },
                  ]}
                >
                  <CustomSelect
                    data={ELearningCategory}
                    placeholder={"Select Categoy"}
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                    }}
                    size="large"
                  />
                </Form.Item>
              </div>
            </div>
            {/* <div className="flex" style={{ marginTop: "15px" }}>
              <div className="innerColumn">
                <Form.Item
                  name="members"
                  label={"Members"}
                  showSearch={true}
                  direction={Direction}
                  style={{ marginBottom: "0px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Select Member",
                    },
                  ]}
                >
                  <CustomSelect
                    style={{ marginBottom: "0px" }}
                    data={firstTimeEmpData}
                    selectedData={selectedData}
                    canFetchNow={isFirstTimeDataLoaded}
                    fetchData={fetchEmployees}
                    placeholder={"Select Member"}
                    size="large"
                    mode={"multiple"}
                    isObject={true}
                    loadDefaultData={false}
                    optionComponent={(opt) => {
                      return (
                        <>
                          <Avatar name={opt.name} src={opt.image} className="!bg-black">
                            {getNameForImage(opt.name)}
                          </Avatar>
                          {opt.name}
                        </>
                      );
                    }}
                    dataVal={value}
                    name="members"
                    showSearch={true}
                    direction={Direction}
                    rules={[
                      {
                        required: true,
                        message: "Please Select Member",
                      },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="innerColumn">
                <Form.Item
                  name="assignMembers"
                  label={"Assign Members"}
                  showSearch={true}
                  direction={Direction}
                  style={{ marginBottom: "0px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Select Assign Member",
                    },
                  ]}
                >
                  <CustomSelect
                    style={{ marginBottom: "0px" }}
                    data={firstTimeEmpData}
                    selectedData={selectedData}
                    canFetchNow={isFirstTimeDataLoaded}
                    fetchData={fetchEmployees}
                    placeholder={"Select Assign Member"}
                    size="large"
                    mode={"multiple"}
                    isObject={true}
                    loadDefaultData={false}
                    optionComponent={(opt) => {
                      return (
                        <>
                          <Avatar name={opt.name} src={opt.image} className="!bg-black">
                            {getNameForImage(opt.name)}
                          </Avatar>
                          {opt.name}
                        </>
                      );
                    }}
                    dataVal={value}
                    name="assignMembers"
                    showSearch={true}
                    direction={Direction}
                    rules={[
                      {
                        required: true,
                        message: "Please Select Assign Member",
                      },
                    ]}
                  />
                </Form.Item>
              </div>
            </div> */}
            <div className="flex">
              <div className="innerColumn">
                <Form.Item
                  label={"Name"}
                  name="name"
                  labelPosition="top"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Name",
                    },
                  ]}
                >
                  <TextInput placeholder={"Enter Name"} />
                </Form.Item>
              </div>
              <div className="innerColumn" style={{ paddingTop: "33px" }}>
                <Form.Item>
                  <Radio.Group onChange={onChangeRadio} value={videoType}>
                    <Radio value={1}>Via Link</Radio>
                    <Radio value={2}>Via Video Upload</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className="flex">
              <div className="innerColumn">
                {videoType === 1 ? (
                  <Form.Item
                    label={"Link"}
                    name="links"
                    labelPosition="top"
                    rules={[
                      {
                        required: true,
                        message: "Please Insert Link",
                      },
                    ]}
                  >
                    <TextInput
                      pattern="^https?://.*\.mp4$"
                      title="Please enter a valid MP4 video link, starting with http:// or https:// and ending with .mp4"
                      placeholder={"Insert Link"}
                    />
                  </Form.Item>
                ) : (
                  <FileUploader
                    fileList={video ? video : []}
                    isMultiple={false}
                    uploadButton={<div>Upload Video</div>}
                    handleUpload={handleVideoUpload}
                    acceptFile=".mp4"
                    classes=""
                    // acceptFile=".PDF"
                  />
                )}
              </div>
            </div>
            <div className="innerColumn">
              <Form.Item
                label={"Description"}
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Enter Description",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder={"Enter Description"}
                  style={{ height: "50px" }}
                />
              </Form.Item>
              <div className="flex">
                <FileUploader
                  fileList={profileImage ? profileImage : []}
                  uploadButton={<div>Upload Image</div>}
                  handleUpload={handleImageUpload}
                  isMultiple={false}
                  acceptFile="image/*"
                  classes=""
                />
              </div>
            </div>
          </FormContainer>
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
                title={"Create"}
                loading={loader}
              >
                {" "}
                {"Create"}{" "}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </MainContainer>
    </DashboardLayout>
  );
}

export default CreateTedTalk;
