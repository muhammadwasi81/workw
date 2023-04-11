import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardLayout from "../Dashboard/Layout/DashboardLayout";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { FormContainer, Heading, MainContainer } from "./styleObjects";
import "./style.css";
import { Avatar, Button, Form, Input, Select, Radio, message } from "antd";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { useState } from "react";
import { STRINGS, getNameForImage } from "../../../../../utils/base";
import { useSelector } from "react-redux";
import CustomSelect from "../../../../sharedComponents/Select/Select";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { PostPrivacyType } from "../../../../../utils/Shared/enums/enums";
import { addArticle } from "../../store/action";
import FileUploader from "../../../Messenger/view/MessengerBox/components/fileUploader";
import { getELearningCategory } from "../../../eLearningCategory/store/action";

const { Option } = Select;

function CreateArticle() {
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
  const { loaders, success } = useSelector((state) => state.eLearningSlice);
  const employees = useSelector((state) => state.sharedSlice.employees);

  const onChangeRadio = (e) => {
    let value = e.target.value;
    setVideoType(value);
  };

  let loader = loaders.addArticleLoading;
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
      image: image,
      attachment: attachment,
    };

    console.log(dataObject, "DATA OBJECT");

    if (Object.keys(image).length > 0) {
      dispatch(addArticle(dataObject));
    } else {
      dispatch(addArticle(dataObject));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (success) {
      form.resetFields();
      setProfileImage([]);
      setVideo([]);
    }
  }, [success]);

  return (
    <DashboardLayout>
      <MainContainer className="AddCourseMainContainer">
        <Heading>Create Article</Heading>
        <Form
          form={form}
          name="addArticle"
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
                    className="w-full rounded-5"
                    size="large"
                  />
                </Form.Item>
              </div>
            </div>
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
              <div className="innerColumn pt-33">
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
                      placeholder={"Insert Link"}
                      type={"text"}
                      pattern="^https?://.*\.(pdf|PDF|png|jpg|jpeg)$"
                      title="Please enter a valid link to a PDF, PNG, or JPG file, starting with http:// or https://"
                    />
                  </Form.Item>
                ) : (
                  <FileUploader
                    fileList={video ? video : []}
                    isMultiple={false}
                    uploadButton={<div>Upload Photo or PDF</div>}
                    handleUpload={handleVideoUpload}
                    acceptFile=".pdf,.PDF,.png,.jpg,.jpeg"
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
                  className="h-50"
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

export default CreateArticle;
