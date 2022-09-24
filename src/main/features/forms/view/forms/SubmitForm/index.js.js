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
import BusinessLogo from "../../../../../../content/systemLogo.png";
import "./SubmitForm.css";

const SubmitForm = (props) => {
  const { disableSubmit } = props;
  let { id } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const [formStatus, setStatus] = useState("");
  const [formData, setFormData] = useState(null);
  const [submitForm, setSubmitForms] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    isOpen: false,
    Message: "",
    variant: "error",
  });
  //TODO: here we will get forms by ID
  useEffect(() => {
    setStatus("Loading");
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
      id: "c54f223b-46d0-40d8-85d3-9fd8257d2d02",
      name: "Party Invite",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis sem odio. Sed commodo vestibulum leo, sit amet tempus odio consectetur in.",
      acceptingResponse: true,
      business_id: "32bd41c4-ec31-411f-9633-0b4801edbf3f",
      businessLogo:
        "https://Konnect.im/upload/2021/12/440ba960-2b69-43d4-90f2-754824fd8a40.png",
      status: 1,
      approverStatus: 2,
      ref_no: "FRM-000042",
      createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
      createDate: "1658748266000",
      creator: {
        id: "fab583c7-7ebb-4993-b40b-cad65768247b",
        name: "Abu Bakar",
        profile_picture:
          "https://Konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
        designation: "",
        email: "abubakr@miletap.com",
        userStatus: 1,
        userStatusDatetime: "",
        type: 1,
        isActive: true,
        isDisable: false,
        business_id: "32bd41c4-ec31-411f-9633-0b4801edbf3f",
        user_type: 2,
      },
      approvals: [],
      questions: [
        {
          id: "577bc117-1883-4790-bb5e-ecfa8a97f157",
          form_id: "c54f223b-46d0-40d8-85d3-9fd8257d2d02",
          question: "What is your name?",
          sequence: 0,
          answerType: 3,
          isRequired: true,
          image_id: "00000000-0000-0000-0000-000000000000",
          image: "",
          createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
          createDate: "1658748266000",
          answers: [],
        },
        {
          id: "f4c959f1-4d95-443c-981a-6b5866703eac",
          form_id: "c54f223b-46d0-40d8-85d3-9fd8257d2d02",
          question: "Can you attend?",
          sequence: 1,
          answerType: 1,
          isRequired: true,
          image_id: "00000000-0000-0000-0000-000000000000",
          image: "",
          createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
          createDate: "1658748266000",
          answers: [
            {
              id: "1aa57264-8488-42fd-b460-492d1eab9e64",
              question_id: "f4c959f1-4d95-443c-981a-6b5866703eac",
              answer: "One",
              image_id: "00000000-0000-0000-0000-000000000000",
              image: "",
              createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
              createDate: "1658748266000",
            },
            {
              id: "8cd7ed3a-5be9-4586-98e4-555aae8d474e",
              question_id: "f4c959f1-4d95-443c-981a-6b5866703eac",
              answer: "Sorry, can't make it",
              image_id: "00000000-0000-0000-0000-000000000000",
              image: "",
              createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
              createDate: "1658748266000",
            },
          ],
        },
        {
          id: "c4c60b80-b4ad-45a5-9968-432a5b73988a",
          form_id: "c54f223b-46d0-40d8-85d3-9fd8257d2d02",
          question: "How many of you are attending?",
          sequence: 2,
          answerType: 3,
          isRequired: true,
          image_id: "00000000-0000-0000-0000-000000000000",
          image: "",
          createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
          createDate: "1658748266000",
          answers: [],
        },
        {
          id: "88cd1dab-687d-4af3-8161-53088311a736",
          form_id: "c54f223b-46d0-40d8-85d3-9fd8257d2d02",
          question: "Select Best Image here",
          sequence: 3,
          answerType: 1,
          isRequired: true,
          image_id: "00000000-0000-0000-0000-000000000000",
          image: "",
          createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
          createDate: "1658748266000",
          answers: [
            {
              id: "124fe865-1b9b-4a66-932c-0120c47204b8",
              question_id: "88cd1dab-687d-4af3-8161-53088311a736",
              answer: "Two",
              image_id: "b904bf1f-ad03-43be-7ac5-e3c34e5714a3",
              image:
                "https://Konnect.im/upload/2022/7/ada9cb78-f8cb-47a9-b21c-05432820b4f9.png",
              createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
              createDate: "1658748266000",
            },
            {
              id: "5bbd1a8c-7182-4e6c-ba2f-0992cc7db83d",
              question_id: "88cd1dab-687d-4af3-8161-53088311a736",
              answer: "Four",
              image_id: "516472f6-6b49-4ce8-9e40-5f3777a70e36",
              image:
                "https://Konnect.im/upload/2022/7/be561718-280a-4f9b-85d4-aa30b94dc68e.png",
              createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
              createDate: "1658748266000",
            },
            {
              id: "3ad0cb24-d5cc-4cc7-8d81-8a69cab83b8e",
              question_id: "88cd1dab-687d-4af3-8161-53088311a736",
              answer: "One",
              image_id: "e99d0bf1-4856-4999-9488-511f12073535",
              image:
                "https://Konnect.im/upload/2022/7/7d3ffbf7-b12d-42eb-abfd-49c4a59e341b.png",
              createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
              createDate: "1658748266000",
            },
            {
              id: "03c17929-a5c8-419b-b03c-d85ad2e68731",
              question_id: "88cd1dab-687d-4af3-8161-53088311a736",
              answer: "Three",
              image_id: "874e298c-6fc3-4693-6f40-d35306498e0c",
              image:
                "https://Konnect.im/upload/2022/7/f8ea7d0f-9a16-4b84-9f62-a896f382d6fa.png",
              createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
              createDate: "1658748266000",
            },
          ],
        },
      ],
    };
    setFormDataByType(data);
  }, []);
  let setFormDataByType = (data) => {
    let submitData = [];
    let filteredData = data.questions.map((item) => {
      submitData.push({ id: item.id, answer: "", answer_id: "" });
      if (item.answerType === 4) {
        return {
          ...item,
          localType: "number",
        };
      } else if (item.answerType === 3) {
        return {
          ...item,
          localType: "text",
        };
      } else if (item.answerType === 1 && "radioWithImage") {
        let isRadioWithImg = item.answers.filter(
          (it) => it.image_id !== STRINGS.DEFAULTS.guid
        );
        if (isRadioWithImg.length === 0) {
          return {
            ...item,
            localType: "radio",
          };
        } else {
          return {
            ...item,
            localType: "radioWithImage",
          };
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
      } else if (answerType === "radio" || answerType === "radioWithImage") {
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
          question_id: item.id,
        };
      }),
    };
    let emptyFields = payload.questions.filter(
      (it) =>
        it.answer.length === 0 &&
        (it.answer_id === STRINGS.DEFAULTS.guid || it.answer_id.length === 0)
    );

    if (emptyFields.length === 0) {
      // API.FORM.addFormAttempt(payload).then(({ status, data, error }) => {
      //   if (status) {
      //     setIsSubmited(true)
      //   }
      // })
    } else {
      setSnackbarState({
        isOpen: true,
        Message: "Please fill all required fields",
        variant: "error",
      });
    }
  };
  if (!formData) return <MessagePage message={formStatus} />;
  if (isSubmited) return <MessagePage message="Thank you for your Response" />;
  return (
    <>
      <div className="submit-form-wrap">
        <div className="formCompanyLogo">
          <img src={BusinessLogo} />
        </div>
        <div className="center-fix">
          <FormHeader
            title={formData.name}
            description={formData.description}
            isAcceptingResp={formData.acceptingResponse}
            handleChangeEmail={(e) => setUserEmail(e.target.value)}
            disableSubmit={disableSubmit}
          />
          {formData &&
            formData.questions.map((item, index) => (
              <>
                {item.localType === "radio" && (
                  <Radio
                    handleRadioChange={handleChange}
                    question={item}
                    index={index}
                    disableSubmit={disableSubmit}
                  />
                )}
                {item.localType === "radioWithImage" && (
                  <RadioWithImage
                    handleChange={handleChange}
                    question={item}
                    index={index}
                    disableSubmit={disableSubmit}
                  />
                )}
                {item.localType === "text" && (
                  <TextFields
                    handleChange={handleChange}
                    fieldData={item}
                    index={index}
                    type="text"
                    disableSubmit={disableSubmit}
                  />
                )}
                {item.localType === "number" && (
                  <TextFields
                    handleChange={handleChange}
                    fieldData={item}
                    index={index}
                    type="number"
                    disableSubmit={disableSubmit}
                  />
                )}
              </>
            ))}
          <div className="flex-between mt_10">
            {!disableSubmit && (
              <button onClick={() => handleSubmit(submitForm)}>Submit</button>
            )}
            {/* <button> Clear Form</button> */}
          </div>
          <div className="poweredBy">
            <div>Powered by</div>
            <a href="https://workw.com">
              <img src={BusinessLogo} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitForm;
