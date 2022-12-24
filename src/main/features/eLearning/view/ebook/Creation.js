import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardLayout from "../Dashboard/Layout/DashboardLayout";
import { elearningDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { FormContainer, Heading, MainContainer } from "./styleObjects";
import "./style.css"
import { Avatar, Button, Form, Input, Select } from "antd";
import TextInput from "../../../../sharedComponents/Input/TextInput";
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";
import { useState } from "react";
import { STRINGS, getNameForImage } from "../../../../../utils/base";
import { useSelector } from "react-redux";
import CustomSelect from "../../../../sharedComponents/Select/Select";
import { getAllEmployees, getRewardCategory } from "../../../../../utils/Shared/store/actions";
import PrivacyOptions from "../../../../sharedComponents/PrivacyOptionsDropdown/PrivacyOptions";
import { PostPrivacyType } from "../../../../../utils/Shared/enums/enums";
import { addBook } from "../../store/action";

const { Option } = Select;

function CreateEbook() {
  const dispatch = useDispatch()
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[ userLanguage  ];

  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [pdf, setPdf] = useState(null)
  const [privacyId, setPrivacyId] = useState(PostPrivacyType.PUBLIC);
  const [fileType, setFileType] = useState(1)
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  const { rewardCategories } = useSelector((state) => state.sharedSlice);
  const { loader, success } = useSelector((state) => state.eLearningSlice);
  const employees = useSelector((state) => state.sharedSlice.employees);

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
    dispatch(getRewardCategory());
  }, []);

  const onPrivacyChange = value => {
		setPrivacyId(value);
	};

  const handleImageUpload = (data) => {
    setProfileImage(data);
  };

  const handlePdfUpload = (data) => {
    setPdf(data);
  };


  const onFinish = (values) => {
    console.log(values, "VALUES !!!!");
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
      file: profileImage && profileImage[0]?.originFileObj,
    };

    let attachment = {
      id: STRINGS.DEFAULTS.guid,
      file: pdf && pdf[0]?.originFileObj,
    };

    let dataObject = {
      // categoryId: values.categoryId,
      description: values.description,
      privacyId: privacyId,
      name: values.name,
      authorName: values.athorName,
      information: values.information,
      members: members,
      assignMembers: assignMembers,
      image: image,
      attachment: attachment,
    }

    console.log(dataObject, "PAYLOAD ONE");

    if (Object.keys(image).length > 0) {
      dispatch(addBook(dataObject))
    } else {
      dispatch(addBook(dataObject))
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (success) {
      form.resetFields();
    }
  }, [success]);

  return (
      <DashboardLayout>
      <MainContainer className="AddCourseMainContainer">
      <Heading>Create E-Book</Heading>
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
                  data={rewardCategories}
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
                label={"Athor Name"}
                name="athorName"
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
          </div>
          <div className="flex">
          <div className="innerColumn">
              <Form.Item
              label={"Information"}
              name="informataion"
              rules={[
                {
                  required: true,
                  message: "Enter Information",
                },
              ]}
            >
              <Input.TextArea placeholder={"Enter Information"} />
          </Form.Item>
            </div>
          </div>
          <div className="flex" style={{marginTop: "15px"}}>
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
            <Input.TextArea placeholder={"Enter Description"} style={{height: "50px"}} />
          </Form.Item>
          <div className="flex"> 
            <Form.Item area="true">
              <SingleUpload
                handleImageUpload={handleImageUpload}
                img="Add Image"
                position="flex-start"
                uploadText={"Image"}
                accept="image/*"
              />
            </Form.Item>
            <Form.Item area="true">
              <SingleUpload
                handleImageUpload={handlePdfUpload}
                img="Add Image"
                position="flex-start"
                uploadText={"Attachment"}
                accept=".pdf"
              />
            </Form.Item>
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

export default CreateEbook
