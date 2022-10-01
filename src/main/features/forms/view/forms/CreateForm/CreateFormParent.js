import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import FormHeader from "../EditForm/FormHeader";
import Radio from "./QuestionsItems/Radio";
import RadioWithImage from "./QuestionsItems/RadioWithImage";
import TextFields from "./QuestionsItems/TextFields";
import { defaultUiid } from "../../../../../../utils/Shared/enums/enums";
import { useNavigate } from "react-router-dom";
import Create from "./Create";
// import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import "../EditForm/editForm.css";
import DrangableQuestions from "./DragableItems";
import {
  createGuid,
  modifySelectData,
  STRINGS,
} from "../../../../../../utils/base";
import BusinessLogo from "../../../../../../content/systemLogo.png";
import { addForm } from "../../../store/actions";

let initialData = {
  id: "",
  subject: "",
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

export const CreateFormParent = (props) => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataObj, setDataObj] = useState(initialData);
  const [formData, setFormData] = useState(null);
  const [question, setQuestions] = useState([]);
  const [snackbarState, setSnackbarState] = useState({
    isOpen: false,
    Message: "",
    variant: "error",
  });
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    // console.log("use effect works when data object change****");
    setFormDataByType(dataObj);
  }, [dataObj]);

  useEffect(() => {
    const append = (answers, fileList) =>
      answers.map((x, index) => {
        let image = fileList.filter((it) => it.index === index)[0]?.image
          ?.originFileObj;
        return {
          answer: x,
          image: {
            file: image,
            id: defaultUiid,
          },
        };
      });
    let questionArray = question.map((elem, index) => {
      console.log("element", elem);
      return {
        // id: createGuid(),
        // formId: createGuid(),
        answerType: elem.answerType,
        sequence: index,
        question: elem.Question,
        createBy: user.id,
        answers: elem.options
          ? // ? append(elem.options, elem.fileList[index]?.originFileObj)
            append(elem.options, elem.fileList)
          : [],
      };
    });
    // console.log("****", questionArray);
    setDataObj({ ...dataObj, question: questionArray });
  }, [question]);

  const dataGet = (values) => {
    console.log("data getting from create form component", values);
    setQuestions([...question, values]);
  };

  // const createForm = () => {
  //   // console.log("create form done!!!!");
  //   // console.log("data object", dataObj);
  //   dispatch(addForm(dataObj));
  // };

  const subDescriptionGet = (values) => {
    // console.log("sub description", values);
    let payload = {
      ...dataObj,
      id: createGuid(),
      subject: values.subject,
      description: values.description,
      approvers: modifySelectData(values.approvers).map((el, index) => {
        return {
          approverId: el,
        };
      }),
    };
    setDataObj(payload);
    // console.log("final data to be send to api****", payload);
    dispatch(addForm(payload));
    navigate(-1);
  };

  let setFormDataByType = (data) => {
    // console.log("data getting in set form by type****", data);
    // console.log("questions data map****", data.questions);
    let filteredData = data.question.map((item, index) => {
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
        console.log("item", item);
        if (item.answers[index]?.image?.file) {
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
    // console.log("filtered data", filteredData);
    setFormData({ ...data, question: filteredData });
    // console.log("formData", formData);
  };
  const handleChange = (items) => {
    console.log(items);
  };
  const handleSequenceChange = (items) => {
    console.log(items);
    let filteredData = items.map((item, index) => {
      return {
        ...item,
        sequence: index,
      };
    });
    setFormData({ ...formData, question: filteredData });
  };
  if (!formData) return <div>Loading...</div>;
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
          />
          <DrangableQuestions
            questions={formData.question}
            handleChange={handleSequenceChange}
          >
            {formData &&
              formData.question.map((item, index) => (
                <>
                  {console.log("item radio with image", item)}
                  {item.localType === "radio" && (
                    <Radio
                      handleRadioChange={handleChange}
                      question={item}
                      index={index}
                    />
                  )}
                  {item.localType === "radioWithImage" && (
                    <RadioWithImage
                      handleChange={handleChange}
                      question={item}
                      index={index}
                    />
                  )}
                  {item.localType === "text" && (
                    <TextFields
                      handleChange={handleChange}
                      fieldData={item}
                      index={index}
                      type="text"
                    />
                  )}
                  {item.localType === "number" && (
                    <TextFields
                      handleChange={handleChange}
                      fieldData={item}
                      index={index}
                      type="number"
                    />
                  )}
                </>
              ))}
          </DrangableQuestions>
          <Create
            dataSend={(values) => dataGet(values)}
            subDescriptionSend={(values) => subDescriptionGet(values)}
          />
        </div>
      </div>
    </>
  );
};

// export default CreateFormParent;
