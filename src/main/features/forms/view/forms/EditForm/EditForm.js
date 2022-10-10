import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Avatar, Form } from "antd";
import FormHeader from "./FormHeader";
import Radio from "./QuestionsItems/Radio";
import RadioWithImage from "./QuestionsItems/RadioWithImage";
import MemberSelect from "../../../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import TextFields from "./QuestionsItems/TextFields";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { defaultUiid } from "../../../../../../utils/Shared/enums/enums";
import { getAllEmployees } from "../../../../../../utils/Shared/store/actions";
import { updateForm } from "../../../store/actions";
// import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import "./editForm.css";
import DrangableQuestions from "./DragableItems";
import {
  createGuid,
  modifySelectData,
  STRINGS,
  getNameForImage,
} from "../../../../../../utils/base";
import BusinessLogo from "../../../../../../content/systemLogo.png";
import { addForm, getFormById } from "../../../store/actions";
import QuestionWithType from "../CreateForm/QuestionWithType";

let initialData = {
  id: "",
  name: "",
  description: "",
  acceptingResponse: true,
  business_id: "",
  businessLogo:
    "https://Konnect.im/upload/2021/12/440ba960-2b69-43d4-90f2-754824fd8a40.png",
  status: 1,
  approverStatus: 2,
  ref_no: "FRM-000042",
  createBy: "",
  createDate: "",
  creator: {
    id: "",
    name: "",
    profile_picture: "",
    designation: "",
    email: "",
    userStatus: 1,
    userStatusDatetime: "",
    type: 1,
    isActive: true,
    isDisable: false,
    business_id: "",
    user_type: 2,
  },
  approvals: [],
  question: [],
};

const EditForm = (props) => {
  console.log(useParams());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);
  const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
  const [dataObj, setDataObj] = useState([]);
  const [formData, setFormData] = useState(null);
  const [question, setQuestions] = useState([]);

  const { user } = useSelector((state) => state.userSlice);
  const { formDetail, loader } = useSelector((state) => state.formSlice);
  const {
    sharedSlice: { employees },
  } = useSelector((state) => state);

  // useEffect(() => {
  //   // console.log("use effect works when data object change****");
  //   setFormDataByType(dataObj);
  // }, [dataObj]);

  const fetchEmployees = (text, pgNo) => {
    dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
  };

  useEffect(() => {
    //getformbyid data for edit
    dispatch(getFormById(id));
    fetchEmployees("", 0);
  }, []);

  useEffect(() => {
    if (employees.length > 0 && !isFirstTimeDataLoaded) {
      setIsFirstTimeDataLoaded(true);
      setFirstTimeEmpData(employees);
    }
  }, [employees]);

  useEffect(() => {
    console.log("useEffect works when component update");
    if (Object.keys(formDetail).length > 1) {
      setDataObj(formDetail);
    }
  }, [formDetail]);

  useEffect(() => {
    console.log("use effect works when data object change****", dataObj);
    if (Object.keys(dataObj).length > 1) {
      setFormDataByType(dataObj);
    }
  }, [dataObj]);

  let setFormDataByType = (data) => {
    console.log("data getting in set form by type****", data);
    let filteredData = data?.question.map((item, index) => {
      console.log("filtering data");
      if (item.answerType === 2) {
        return {
          ...item,
          localType: "number",
          sequence: index,
        };
      } else if (item.answerType === 3) {
        return {
          ...item,
          localType: "text",
          sequence: index,
        };
      } else if (item.answerType === 1) {
        if (item.answers[index]?.image?.length > 1) {
          console.log("item with radio");
          return {
            ...item,
            localType: "radioWithImage",
            sequence: index,
          };
        } else {
          return {
            ...item,
            localType: "radio",
            sequence: index,
          };
        }
      }
    });
    // setSubmitForms(submitData);
    console.log("filtered data", filteredData);
    setFormData({ ...data, question: filteredData });
    // console.log("formData", formData);
  };

  const handleChange = (e, index) => {
    console.log("change items", e.target.value);
    console.log("index", index);

    //TODO: setState for fields
    let updatedFormData = { ...dataGet };
    updatedFormData.question[index].question = e.target.value;
    setDataObj(updatedFormData);
  };

  const handleChangeTitle = (e) => {
    console.log("change title", e.target.value);
    //TODO: setState for fields
    setDataObj({ ...dataObj, subject: e.target.value });
  };

  const handleChangeDescription = (e) => {
    console.log("change Description", e.target.value);
    //TODO: setState for fields
    setDataObj({ ...dataObj, description: e.target.value });
  };

  const handleSequenceChange = (items) => {
    console.log(items);
    let filteredData = items.map((item, index) => {
      return {
        ...item,
        sequence: index,
      };
    });
    setDataObj({ ...dataObj, question: filteredData });
  };

  const handleQuestionImageChange = (info, index) => {
    console.log("handleimagechange", info[0]);
    console.log("handleimagechangeindex", index);

    //TODO:  here we have both index and info we will set this data in state for edit purpose
    console.log("form data updates start");
    let updatedFormData = { ...dataObj };
    console.log(info.length, "length");
    updatedFormData.question[index].image =
      typeof info[0] === "object" ? { file: info[0].originFileObj } : {};
    setDataObj(updatedFormData);
    console.log("form data updates end");
  };

  const handleOptionImageChange = (info, opIndex, quesIndex) => {
    console.log(info, "info");
    console.log(opIndex, "option index");
    console.log(quesIndex, "question index");

    console.log(info.length, "info length");

    //TODO:  here we have both index and info we will set this data in state for edit purpose
    console.log("form data options updates start");
    let updatedFormData = { ...dataObj };
    console.log(updatedFormData.question[quesIndex].answers[opIndex].image);

    updatedFormData.question[quesIndex] = {
      ...updatedFormData.question[quesIndex],
      answers: updatedFormData.question[quesIndex].answers.map(
        (item, ansIndex) => ({
          ...item,
          image:
            ansIndex === opIndex
              ? info.length >= 1
                ? { file: info[0].originFileObj }
                : ""
              : item.image,
        })
      ),
    };
    console.log(updatedFormData.question);
    setDataObj(updatedFormData);
    console.log(updatedFormData, "questiondata");
    console.log("form data options updates end");
  };

  const handleOptionsChange = (e, opIndex, quesIndex) => {
    console.log(e.target.value, "info");
    console.log(opIndex, "option index");
    console.log(quesIndex, "question index");

    //TODO:  here we have both index and info we will set this data in state for edit purpose
    console.log("form data options updates start");
    let updatedFormData = { ...dataObj };
    console.log(updatedFormData.question[quesIndex].answers[opIndex].image);

    updatedFormData.question[quesIndex] = {
      ...updatedFormData.question[quesIndex],
      answers: updatedFormData.question[quesIndex].answers.map(
        (item, ansIndex) => ({
          ...item,
          answer: ansIndex === opIndex ? e.target.value : item.answer,
        })
      ),
    };
    console.log(updatedFormData.question);
    setDataObj(updatedFormData);
    console.log(updatedFormData, "questiondata");
    console.log("form data options updates end");
  };

  const removeQuestion = (i) => {
    console.log(i);
    const data = [...formData.question];
    console.log(data, "data");
    //REMOVE QUESTION FROM ARRAY AND SET SEQUENCE
    data.splice(i, 1);
    console.log("filtered data", data);
    //UPDATE THE DATA IN STATE
    let filteredData = data.map((item, index) => {
      return {
        ...item,
        sequence: index,
      };
    });

    setDataObj({ ...dataObj, question: filteredData });
  };

  const dataGet = (values) => {
    const append = (answers, fileList) =>
      answers.map((x, index) => {
        let image =
          fileList &&
          fileList?.filter((it) => it.index === index)[0]?.image?.originFileObj;
        return {
          answer: x,
          image: {
            file: image && image,
            id: defaultUiid,
          },
        };
      });

    let ques = {
      answerType: values.answerType,
      // sequence: index,
      question: values.question,
      image: {
        file:
          values.image &&
          (values.image?.originFileObj
            ? values.image?.originFileObj
            : values.image.file),
      },
      createBy: user.id,
      answers: values.fileList ? append(values.answers, values?.fileList) : [],
    };
    console.log(ques, "new question");

    //TODO: append question in dataObj
    let data = [...dataObj.question];
    console.log(data, "data spread");
    data.push(ques);
    setDataObj({ ...dataObj, question: data });
  };

  const onEdit = () => {
    console.log("edit console start");
    dispatch(updateForm(formData));
    console.log("dispatch complete");
    navigate(-1);
  };

  if (!formData) return;
  <div>Loading...</div>;
  console.log("formdata", formData);
  return (
    <>
      <div className="submit-form-wrap">
        <div className="formCompanyLogo">
          <img src={BusinessLogo} />
        </div>
        <div className="center-fix">
          <FormHeader
            title={formData.subject}
            description={formData.description}
            isAcceptingResp={formData.acceptingResponse}
            handleChangeTitle={handleChangeTitle}
            handleDescriptionChange={handleChangeDescription}
          />
          {/* <Form.Item label="Approvers" name="approvers">
            <MemberSelect
              name="Approvers"
              mode="multiple"
              formItem={false}
              isObject={true}
              onChange={(e) => console.log(e)}
              data={firstTimeEmpData}
              canFetchNow={isFirstTimeDataLoaded}
              fetchData={fetchEmployees}
              placeholder="Select Approvers"
              selectedData={(_, obj) => {
                setEmployeesData([...obj]);
              }}
              optionComponent={(opt) => {
                return (
                  <>
                    <Avatar src={opt.image} className="!bg-black">
                      {getNameForImage(opt.name)}
                    </Avatar>
                    {opt.name}
                  </>
                );
              }}
            />
          </Form.Item> */}
          <QuestionWithType dataSend={(values) => dataGet(values)} />
          <DrangableQuestions
            questions={formData.question}
            handleChange={handleSequenceChange}
          >
            {formData &&
              formData.question.map((item, index) => (
                <>
                  {item.localType === "radio" && (
                    <Radio
                      handleRadioChange={(e) => handleChange(e, index)}
                      question={item}
                      index={index}
                      removeQuestion={(index) => removeQuestion(index)}
                      handleQuestionImageChange={(info) =>
                        handleQuestionImageChange(info, index)
                      }
                      handleOptionsChange={(e, i) =>
                        handleOptionsChange(e, i, index)
                      }
                      handleOptionImageChange={(info, i) =>
                        handleOptionImageChange(info, i, index)
                      }
                    />
                  )}
                  {item.localType === "radioWithImage" && (
                    <RadioWithImage
                      handleChange={(e) => handleChange(e, index)}
                      question={item}
                      index={index}
                      removeQuestion={(index) => removeQuestion(index)}
                      handleQuestionImageChange={(info) =>
                        handleQuestionImageChange(info, index)
                      }
                      handleOptionsChange={(e, i) =>
                        handleOptionsChange(e, i, index)
                      }
                      handleOptionImageChange={(info, i) =>
                        handleOptionImageChange(info, i, index)
                      }
                    />
                  )}
                  {item.localType === "text" && (
                    <TextFields
                      handleChange={(e) => handleChange(e, index)}
                      fieldData={item}
                      index={index}
                      type="text"
                      removeQuestion={(index) => removeQuestion(index)}
                      handleQuestionImageChange={(info) =>
                        handleQuestionImageChange(info, index)
                      }
                    />
                  )}
                  {item.localType === "number" && (
                    <TextFields
                      handleChange={(e) => handleChange(e, index)}
                      fieldData={item}
                      index={index}
                      type="number"
                      removeQuestion={(index) => removeQuestion(index)}
                      handleQuestionImageChange={(info) =>
                        handleQuestionImageChange(info, index)
                      }
                    />
                  )}
                </>
              ))}
          </DrangableQuestions>
          <Button type="primary" onClick={onEdit}>
            Edit Form
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditForm;
