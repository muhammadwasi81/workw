import React, { useContext } from "react";
import DashboardLayout from "../Dashboard/Layout/DashboardLayout";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { FormContainer, Heading, MainContainer } from "./styleObjects";
import "./style.css";
import { Avatar, Button, Form, Input, message, Select } from "antd";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { useState } from "react";
import { STRINGS, getNameForImage } from "../../../../../utils/base";
import { useSelector } from "react-redux";
import CustomSelect from "../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import MySelect from "../../../../sharedComponents/Select/Select";
import { getAllEmployees } from "../../../../../utils/Shared/store/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  CourseOptionsEnum,
  FileTypeEnum,
  LevelEnum,
  TypeEnum,
} from "../../constant";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { PostPrivacyType } from "../../../../../utils/Shared/enums/enums";
import { addSection, addTopic } from "../../store/slice";
import { Table } from "../../../../sharedComponents/customTable";
import { tableColumn } from "./topicColumn";
import { addCourse, getAllQuiz } from "../../store/action";
import CurriculumCollapse from "./curriculumCollapse";
import { useNavigate } from "react-router-dom";
import { getELearningCategory } from "../../../eLearningCategory/store/action";
import FileUploader from "../../../Messenger/view/MessengerBox/components/fileUploader";

const { Option } = Select;

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[
    userLanguage
  ];

  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [singleImage, setSingleImage] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [privacyId, setPrivacyId] = useState(PostPrivacyType.PUBLIC);
  const [curriculums, setCurriculums] = useState([]);
  const [curriculumName, setCurriculumName] = useState("");
  const [topic, setTopic] = useState([]);
  const [fileType, setFileType] = useState(1);
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  const { ELearningCategory } = useSelector(
    (state) => state.eLearningCategorySlice
  );
  const { topics, sections, loaders, addCourseSuccess, quizzes } = useSelector(
    (state) => state.eLearningSlice
  );
  const employees = useSelector((state) => state.sharedSlice.employees);
  let loader = loaders.addCourseLoading;

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
    dispatch(getAllQuiz({ pageNo: 1, pageSize: 20, search: "", sortBy: 1 }));
  }, []);

  const onPrivacyChange = (value) => {
    setPrivacyId(value);
  };

  const onFinish = (values) => {
    let members = [];
    let assignMembers = [];
    if (typeof values.members === "string") {
      members.push({
        memberId: values.members,
      });
    } else {
      members = values.members.map((member) => {
        return {
          memberId: member,
        };
      });
    }

    if (typeof values.assignMembers === "string") {
      assignMembers.push({
        memberId: values.assignMembers,
      });
    } else {
      assignMembers = values.assignMembers.map((member) => {
        return {
          memberId: member,
        };
      });
    }

    let image = {
      id: STRINGS.DEFAULTS.guid,
      file: profileImage && profileImage,
    };

    let payloadOne = {
      categoryId: values.categoryId,
      courseType: values.courseType,
      name: values.name,
      description: values.description,
      shortDescription: values.description,
      privacyId: privacyId,
      levelId: values.levelId,
      image: image,
      members: members,
      assignMembers: assignMembers,
      curriculums: sections,
    };

    if (Object.keys(image).length > 0) {
      dispatch(addCourse(payloadOne));
    } else {
      dispatch(addCourse(payloadOne));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeCurriculum = (e) => {
    let name = e.target.value;
    setCurriculumName(name);
  };
  const handleFileType = (e) => {
    setTopic({ ...topic, type: e });
    setFileType(e);
  };

  const handleImageUpload = (data) => {
    setProfileImage(data[0]);
  };

  const handleAddTopic = (e) => {
    let imageUpload = {
      id: STRINGS.DEFAULTS.guid,
      file: singleImage && singleImage,
    };
    if (
      !form.getFieldValue().curriculumName ||
      !form.getFieldValue().topicName
    ) {
      message.error("All fields required");
    } else {
      setTopic({ ...topic, attachments: imageUpload, quizId: quizId });
      dispatch(addTopic(topic));
      form.setFieldsValue({ topicName: "", type: "", text: "" });
      // setSingleImage([])
    }
  };

  const handleAddSection = (e) => {
    dispatch(
      addSection({ topics, name: curriculumName, description: "dummy content" })
    );
    form.setFieldsValue({ curriculumName: "" });
  };

  useEffect(() => {
    if (addCourseSuccess) {
      form.resetFields();
      setProfileImage([]);
      setSingleImage([]);
    }
  }, [addCourseSuccess]);

  return (
    <DashboardLayout>
      <MainContainer className="AddCourseMainContainer">
        <Heading>Basic Course Detail</Heading>
        <Form
          form={form}
          name="addCourse"
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
                  label={"Select "}
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Category",
                    },
                  ]}
                >
                  <MySelect
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
              <div className="innerColumn">
                <Form.Item
                  label={"Select Course"}
                  name="courseType"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Option",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder={"Select Course Type"}
                    optionFilterProp="children"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                    }}
                    size="large"
                    defaultValue={{ label: "Personal Development", value: 1 }}
                  >
                    {CourseOptionsEnum.map((item) => (
                      <Option value={item.value}>{item.label}</Option>
                    ))}
                  </Select>
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
              <div className="innerColumn">
                <Form.Item
                  label={"Level"}
                  name="levelId"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Level",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder={"Select Level"}
                    optionFilterProp="children"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                    }}
                    size="large"
                  >
                    {LevelEnum.map((item) => (
                      <Option value={item.value}>{item.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="innerColumn">
              <Form.Item
                name="members"
                label={"Course Admin Members"}
                showSearch={true}
                direction={Direction}
                style={{ marginBottom: "0px" }}
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
                        <Avatar
                          name={opt.name}
                          src={opt.image}
                          className="!bg-black"
                        >
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
              <Form.Item
                name="assignMembers"
                label={"Assign Members"}
                showSearch={true}
                direction={Direction}
                style={{ marginBottom: "0px" }}
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
                        <Avatar
                          name={opt.name}
                          src={opt.image}
                          className="!bg-black"
                        >
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
                <Input.TextArea placeholder={"Enter Description"} />
              </Form.Item>
              <FileUploader
                fileList={profileImage ? profileImage : []}
                uploadButton={<div>Upload</div>}
                handleUpload={handleImageUpload}
                isMultiple={false}
                classes=""
              />
            </div>
          </FormContainer>
          <FormContainer>
            <Heading>Add Curriculum</Heading>
            <div className="innerColumn">
              {topics.length > 0 ? (
                ""
              ) : (
                <Form.Item
                  label={"Curriculum"}
                  labelPosition="top"
                  name="curriculumName"
                  onChange={handleChangeCurriculum}
                >
                  <TextInput placeholder={"Enter Curriculum"} />
                </Form.Item>
              )}
            </div>
            <div className="flex">
              <div className="innerColumn">
                <Form.Item
                  label={"Topic Name"}
                  labelPosition="top"
                  className="w-100"
                  name="topicName"
                >
                  <TextInput
                    placeholder={"Enter Topic"}
                    onChange={(e) => setTopic({ ...topic, name: e })}
                  />
                </Form.Item>
              </div>
              <div className="innerColumn">
                <Form.Item label={"File Type"} labelPosition="top" name="Type">
                  <Select
                    onChange={handleFileType}
                    className="w-100"
                    showSearch
                    placeholder={"Select Type"}
                    optionFilterProp="children"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      maxWidth: "100%",
                    }}
                    size="large"
                    defaultValue={fileType}
                  >
                    {FileTypeEnum.map((item) => (
                      <Option value={item.value}>{item.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div
                className="defaultBtn addRowBtn cursor-pointer addTopicBtn"
                onClick={handleAddTopic}
              >
                +
              </div>
            </div>
            <div className="innerColumn">
              {fileType === TypeEnum.QUIZ ? (
                <Form.Item
                  label={"Select Quiz"}
                  name="quizId"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Quiz",
                    },
                  ]}
                >
                  <MySelect
                    data={quizzes}
                    placeholder={"Select Quiz"}
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setQuizId(e)}
                    size="large"
                  />
                </Form.Item>
              ) : fileType === TypeEnum.TEXT ||
                fileType === TypeEnum.LINK ||
                fileType === TypeEnum.YOUTUBE ||
                fileType === TypeEnum.ARTICLES ||
                fileType === TypeEnum.EXTERNAL_COURSE ? (
                <Form.Item
                  label={fileType === TypeEnum.TEXT ? "text" : "link"}
                  labelPosition="top"
                  name="text"
                  onChange={(e) => setTopic({ ...topic, link: e.target.value })}
                >
                  <TextInput
                    placeholder={
                      fileType === TypeEnum.TEXT ? "Enter Text" : "Enter Link"
                    }
                  />
                </Form.Item>
              ) : fileType === TypeEnum.IMAGE ||
                TypeEnum.PDF ||
                TypeEnum.VIDEO ? (
                <FileUploader
                  fileList={singleImage ? singleImage : []}
                  uploadButton={<div>Upload</div>}
                  isMultiple={false}
                  handleUpload={(data) => {
                    setSingleImage(data[0]);
                  }}
                  classes=""
                />
              ) : (
                ""
              )}
            </div>
            <div className="topicTable">
              <h2 style={{ fontSize: "20px", marginBottom: "2px" }}>
                {topics.length > 0 && curriculumName}
              </h2>
              {topics && topics.length > 0 ? (
                <>
                  <Table
                    bordered
                    // columns={tableColumn(dispatch, editData)}
                    columns={tableColumn(dispatch)}
                    className="custom_table"
                    data={topics}
                  />
                  <div
                    className="ThemeBtn addSectionBtn"
                    onClick={handleAddSection}
                  >
                    Add Section
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="sectionContainer">
              <h3>Curriculums</h3>
              {sections && sections.length > 0
                ? sections.map((item, index) => {
                    return (
                      <>
                        <div className="sectionInner">
                          <CurriculumCollapse data={item} index={index} />
                        </div>
                      </>
                    );
                  })
                : ""}
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

export default CreateCourse;
