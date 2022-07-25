import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { STRINGS } from "../../../../../../utils/base";
// import { getUserDataFromStorage, STRINGS } from "../../../utils/base";
// import { API } from "../../../utils/services";
import { MessagePage } from "./congratsPage";
import FormHeader from "./FormHeader";
import Radio from "./QuestionsItems/Radio";
import RadioWithImage from "./QuestionsItems/RadioWithImage";
import TextFields from "./QuestionsItems/TextFields";
// import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import BusinessLogo from '../../../../../../content/systemLogo.png';
import "./SubmitForm.css";

const SubmitForm = (props) => {
  const { disableSubmit } = props;
  let { id } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const [formStatus, setStatus] = useState("");
  const [formData, setFormData] = useState(null);
  const [submitForm, setSubmitForms] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [snackbarState, setSnackbarState] = useState({ isOpen: false, Message: "", variant: "error", });
  useEffect(() => {
    setStatus("Loading")
    // if (disableSubmit) {
    //   API.FORM.getForm(id).then(({ status, data, error }) => {
    //     if (status)
    //       setFormDataByType(data)
    //     else
    //       setStatus(error)
    //   })
    // }
    // else {
    //   API.FORM.getFormToAttempt(id).then(({ status, data, error }) => {
    //     if (status)
    //       setFormDataByType(data)
    //     else
    //       setStatus(error)
    //   })
    // }
    let data = {
      "id": "3c31f09e-0146-4372-bbda-2e74fba23f4a",
      "name": "Test Form",
      "description": "fdd",
      "acceptingResponse": true,
      "business_id": "32bd41c4-ec31-411f-9633-0b4801edbf3f",
      "businessLogo": "https://Konnect.im/upload/2021/12/440ba960-2b69-43d4-90f2-754824fd8a40.png",
      "status": 2,
      "approverStatus": 2,
      "ref_no": "FRM-000017",
      "createBy": "58e2e63b-f3bc-479f-9749-8a5ab6fcb297",
      "createDate": "1652869961000",
      "creator": {
        "id": "58e2e63b-f3bc-479f-9749-8a5ab6fcb297",
        "name": "Amir Naveed",
        "profile_picture": "https://Konnect.im/upload/2022/5/9aa6f26d-f0b0-414f-860e-64d562f002aa.png",
        "designation": "Development Team Lead",
        "email": "amir@miletap.com",
        "userStatus": 2,
        "userStatusDatetime": "1593784088000",
        "type": 1,
        "isActive": true,
        "isDisable": false,
        "business_id": "32bd41c4-ec31-411f-9633-0b4801edbf3f",
        "user_type": 1
      },
      "approvals": [],
      "questions": [
        {
          "id": "56e41627-1681-4bf9-82ad-62b9f5021109",
          "form_id": "3c31f09e-0146-4372-bbda-2e74fba23f4a",
          "question": "Text",
          "sequence": 0,
          "answerType": 3,
          "isRequired": true,
          "image_id": "00000000-0000-0000-0000-000000000000",
          "image": "",
          "createBy": "58e2e63b-f3bc-479f-9749-8a5ab6fcb297",
          "createDate": "1652869961000",
          "answers": []
        },
        {
          "id": "4e7e87a8-31ea-483b-875c-75bfa0e5e7d3",
          "form_id": "3c31f09e-0146-4372-bbda-2e74fba23f4a",
          "question": "Number",
          "sequence": 1,
          "answerType": 4,
          "isRequired": true,
          "image_id": "00000000-0000-0000-0000-000000000000",
          "image": "",
          "createBy": "58e2e63b-f3bc-479f-9749-8a5ab6fcb297",
          "createDate": "1652869961000",
          "answers": []
        },
        {
          "id": "a009653b-1a29-4d28-ab6a-b0e819d3b0d1",
          "form_id": "3c31f09e-0146-4372-bbda-2e74fba23f4a",
          "question": "Polls",
          "sequence": 2,
          "answerType": 1,
          "isRequired": true,
          "image_id": "00000000-0000-0000-0000-000000000000",
          "image": "",
          "createBy": "58e2e63b-f3bc-479f-9749-8a5ab6fcb297",
          "createDate": "1652869961000",
          "answers": [
            {
              "id": "3bda87c4-316e-4562-871b-b7275c0e0d0b",
              "question_id": "a009653b-1a29-4d28-ab6a-b0e819d3b0d1",
              "answer": "sss",
              "image_id": "00000000-0000-0000-0000-000000000000",
              "image": "",
              "createBy": "58e2e63b-f3bc-479f-9749-8a5ab6fcb297",
              "createDate": "1652869961000"
            },
            {
              "id": "22c95340-1201-457d-93ef-c02e1caedba2",
              "question_id": "a009653b-1a29-4d28-ab6a-b0e819d3b0d1",
              "answer": "dddd",
              "image_id": "00000000-0000-0000-0000-000000000000",
              "image": "",
              "createBy": "58e2e63b-f3bc-479f-9749-8a5ab6fcb297",
              "createDate": "1652869961000"
            },
            {
              "id": "d316fd74-0af3-409d-b392-f5bc5b41290a",
              "question_id": "a009653b-1a29-4d28-ab6a-b0e819d3b0d1",
              "answer": "gggg",
              "image_id": "00000000-0000-0000-0000-000000000000",
              "image": "",
              "createBy": "58e2e63b-f3bc-479f-9749-8a5ab6fcb297",
              "createDate": "1652869961000"
            }
          ]
        }
      ]
    };
    setFormDataByType(data)


  }, []);
  let setFormDataByType = (data) => {
    let submitData = []
    let filteredData = data.questions.map((item) => {
      submitData.push({ id: item.id, answer: "", answer_id: "" });
      if (item.answerType === 4) {
        return {
          ...item,
          localType: "number"
        }
      }
      else if (item.answerType === 3) {
        return {
          ...item,
          localType: "text"
        }
      }
      else if (item.answerType === 1 && "radioWithImage") {
        let isRadioWithImg = item.answers.filter(it => it.image_id !== STRINGS.DEFAULTS.guid);
        if (isRadioWithImg.length === 0) {
          return {
            ...item,
            localType: "radio"
          }
        }
        else {
          return {
            ...item,
            localType: "radioWithImage"
          }
        }
      }
    });
    setSubmitForms(submitData);
    setFormData({ ...data, questions: filteredData });
  };
  let handleChange = (value, index, id, answerType) => {
    let updatedQuestions = [...submitForm];
    if (updatedQuestions[index].id === id) {
      if (answerType === "text" || answerType === "number") {
        updatedQuestions[index].answer = value;
      }
      else if (answerType === "radio" || answerType === "radioWithImage") {
        updatedQuestions[index].answer_id = value;
      }
    }
    setSubmitForms([...updatedQuestions]);
  };
  const handleSubmit = () => {
    let payload = {
      form_id: id,
      // user_id: !!localStorage.getItem(STRINGS.STORAGE.token) ? getUserDataFromStorage(STRINGS.STORAGE.user_id) : "",
      user_id: "",
      // email: !!localStorage.getItem(STRINGS.STORAGE.token) ? getUserDataFromStorage(STRINGS.STORAGE.email) : userEmail,
      email: userEmail,
      questions: submitForm.map((item) => {
        return {
          ...item,
          question_id: item.id
        }
      })
    };
    let emptyFields = payload.questions.filter(it => it.answer.length === 0 &&
      (it.answer_id === STRINGS.DEFAULTS.guid || it.answer_id.length === 0))

    if (emptyFields.length === 0) {
      // API.FORM.addFormAttempt(payload).then(({ status, data, error }) => {
      //   if (status) {
      //     setIsSubmited(true)
      //   }
      // })
    }
    else {
      setSnackbarState({ isOpen: true, Message: "Please fill all required fields", variant: "error" })
    }

  }
  if (!formData)
    return <MessagePage message={formStatus} />
  if (isSubmited)
    return <MessagePage message="Thank you for your Response" />
  return (
    <>
      <div className="submit-form-wrap">
        <div className="formCompanyLogo" ><img src={BusinessLogo} /></div>
        <div className="center-fix">
          <FormHeader title={formData.name} description={formData.description} isAcceptingResp={formData.acceptingResponse} handleChangeEmail={(e) => setUserEmail(e.target.value)}
            disableSubmit={disableSubmit} />
          {formData && formData.questions.map((item, index) => (
            <>
              {item.localType === "radio" && <Radio handleRadioChange={handleChange} question={item} index={index} disableSubmit={disableSubmit} />}
              {item.localType === "radioWithImage" && <RadioWithImage handleChange={handleChange} question={item} index={index} disableSubmit={disableSubmit} />}
              {item.localType === "text" && <TextFields handleChange={handleChange} fieldData={item} index={index} type="text" disableSubmit={disableSubmit} />}
              {item.localType === "number" && <TextFields handleChange={handleChange} fieldData={item} index={index} type="number" disableSubmit={disableSubmit} />}
            </>
          ))}
          <div className="flex-between mt_10">
            {!disableSubmit && <button onClick={() => handleSubmit(submitForm)} >Submit</button>}
            {/* <button> Clear Form</button> */}
          </div>
        </div>
        <div className="poweredBy" >Powered by <a href="https://konnect.im/" >
          <img src={BusinessLogo} />
        </a></div>
      </div>
    </>
  );
};

export default SubmitForm;
