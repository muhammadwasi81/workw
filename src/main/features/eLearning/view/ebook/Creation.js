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
import { addBook, updateBook } from "../../store/action";
import FileUploader from "../../../Messenger/view/MessengerBox/components/fileUploader";
import { getELearningCategory } from "../../../eLearningCategory/store/action";

const { Option } = Select;

function CreateEbook() {
  const dispatch = useDispatch()
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, elearningDictionary } = elearningDictionaryList[userLanguage];
  const { loaders, addBookSuccess, bookEdit } = useSelector((state) => state.eLearningSlice);
  const employees = useSelector((state) => state.sharedSlice.employees);
  const {ELearningCategory } = useSelector((state) => state.eLearningCategorySlice);
  let loader = loaders.addBookLoading
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [pdf, setPdf] = useState(null)
  const [privacyId, setPrivacyId] = useState(PostPrivacyType.PUBLIC);
  const [fileType, setFileType] = useState(1)
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [value, setValue] = useState([]);

  const { rewardCategories } = useSelector((state) => state.sharedSlice);
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

  useEffect(() => {
    dispatch(getELearningCategory());
  }, [])

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
    setProfileImage(data[0]);
  };

  const handlePdfUpload = (data) => {
    setPdf(data[0]);
  };


  const onFinish = (values) => {
    let members = [];
    let assignMembers = [];
    if (!bookEdit) {
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
    } 


    let image = {
      id: STRINGS.DEFAULTS.guid,
      file: profileImage && profileImage,
    };

    let attachment = {
      id: STRINGS.DEFAULTS.guid,
      file: pdf && pdf,
    };

    let dataObject = {
      categoryId: values.categoryId,
      description: values.description,
      privacyId: privacyId,
      name: values.name,
      authorName: values.authorName,
      information: values.information,
      members: members,
      assignMembers: assignMembers,
    }

    console.log(Object.keys(image).length)

    // if (bookEdit) {
    //   if (Object.keys(image).length > 0) {
    //     dispatch(updateBook({...dataObject, id: bookEdit.id, image: image, attachment: attachment}))
    //   } else {
    //     dispatch(updateBook({...dataObject, id: bookEdit.id}))
    //   } 
    // }  else {
    //   if (Object.keys(image).length > 0) {
    //     dispatch(addBook({...dataObject, image: image, attachment: attachment}))
    //   } else {
    //     dispatch(addBook(dataObject))
    //   }
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (addBookSuccess) {
      form.resetFields();
      setProfileImage([])
      setPdf([])
    }
  }, [addBookSuccess]);

  let updateCategory = 
    { 
      id: bookEdit && bookEdit.categoryId,
      name: bookEdit && bookEdit.category
    }


  return (
    <DashboardLayout>
      <MainContainer className="AddCourseMainContainer">
        <Heading>{ bookEdit ? "Update eBook" : "Craete eBook"}</Heading>
        <Form
          form={form}
          name="addCourse"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={bookEdit ? bookEdit : ""}
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
                    defaultValue={updateCategory.id}
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
                  label={"Author Name"}
                  name="authorName"
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
                  name="information"
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
            {
              bookEdit ? "" :
              <div className="flex" style={{ marginTop: "15px" }}>
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
            }
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
                <Input.TextArea placeholder={"Enter Description"} style={{ height: "50px" }} />
              </Form.Item>
              <div className="flex">
                <FileUploader
                  fileList={profileImage ? profileImage : []}
                  uploadButton={<div>Cover Photo</div>}
                  handleUpload={handleImageUpload} 
                  isMultiple={false}
                  acceptFile="image/*"
                  classes=""
                  />
                   <FileUploader
                      fileList={pdf ? pdf : []}
                      isMultiple={false}
                      uploadButton={<div>Upload Book (PDF)</div>}
                      handleUpload={handlePdfUpload} 
                      classes="" 
                      acceptFile=".PDF"
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
                title={bookEdit ? "Update" : "Create"}
                loading={loader}
              >
                {" "}
                {bookEdit ? "Update" : "Create"}{" "}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </MainContainer>
    </DashboardLayout>
  );
}

export default CreateEbook
