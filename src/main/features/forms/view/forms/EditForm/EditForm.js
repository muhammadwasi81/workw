import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormHeader from "./FormHeader";
import Radio from "./QuestionsItems/Radio";
import RadioWithImage from "./QuestionsItems/RadioWithImage";
import TextFields from "./QuestionsItems/TextFields";
// import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import "./editForm.css";
import DrangableQuestions from "./DragableItems";
import { useSelector } from "react-redux";
import { STRINGS } from "../../../../../../utils/base";
// import DragHandleIcon from '@material-ui/icons/DragHandle';
import CreateForm from "../CreateForm/CreateForm";

const EditForm = (props) => {
  let { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [snackbarState, setSnackbarState] = useState({
    isOpen: false,
    Message: "",
    variant: "error",
  });
  const { user } = useSelector((state) => state.userSlice);
  let data = {
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
    questions: [],
  };
  console.log(data);
  useEffect(() => {
    // console.log(user);
    data.name = user.name;
    data.createBy = user.id;
    console.log(data);
    setFormDataByType(data);
  }, []);
  let setFormDataByType = (data) => {
    let filteredData = data.questions.map((item) => {
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
    // setSubmitForms(submitData);
    setFormData({ ...data, questions: filteredData });
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
    setFormData({ ...formData, questions: filteredData });
  };
  console.log(formData);
  if (!formData) return <div>Loading...</div>;
  return (
    <>
      <div className="submit-form-wrap">
        <div className="formCompanyLogo">
          <img src={formData.businessLogo} />
        </div>
        <div className="center-fix">
          <FormHeader
            title={formData.name}
            description={formData.description}
            isAcceptingResp={formData.acceptingResponse}
          />
          <DrangableQuestions
            questions={formData.questions}
            handleChange={handleSequenceChange}
          >
            {formData &&
              formData.questions.map((item, index) => (
                <>
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
          <CreateForm />
        </div>
        {/* <div>
          <CustomizedSnackbars
            isOpen={snackbarState.isOpen}
            cancel={() => setSnackbarState({ ...snackbarState, isOpen: false })}
            variant={snackbarState.variant}
            message={snackbarState.Message}
            duration={2000}
          />
        </div> */}
      </div>
    </>
  );
};

export default EditForm;
