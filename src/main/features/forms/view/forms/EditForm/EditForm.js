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
import BusinessLogo from "../../../../../../content/systemLogo.png";
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
    questions: [
      // {
      //   id: "577bc117-1883-4790-bb5e-ecfa8a97f157",
      //   form_id: "c54f223b-46d0-40d8-85d3-9fd8257d2d02",
      //   question: "What is your name?",
      //   sequence: 0,
      //   answerType: 3,
      //   isRequired: true,
      //   image_id: "00000000-0000-0000-0000-000000000000",
      //   image: "",
      //   createBy: "fab583c7-7ebb-4993-b40b-cad65768247b",
      //   createDate: "1658748266000",
      //   answers: [],
      // },
    ],
  };
  // console.log(props, "props in edit section");
  useEffect(() => {
    console.log(data);
    setFormDataByType(data);
  }, []);

  // useEffect(() => {
  //   console.log(data);
  //   setFormDataByType(data);
  // }, []);

  // useEffect(() => {
  //   console.log("use effect works when form datta changes");
  //   setFormDataByType(formData);
  // }, [formData]);

  const dataGet = (values) => {
    console.log("data getting from create form component", values);
    setFormDataByType(values);
  };

  let setFormDataByType = (data) => {
    console.log("data getting in set form by type", data);
    console.log("questions data map", data.questions);
    let filteredData = data.questions.map((item, index) => {
      if (item.answerType === 2) {
        console.log("************check");
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
      } else if (item.answerType === 1 && "radioWithImage") {
        let isRadioWithImg = item.answers.filter(
          (it) => it.image_id !== STRINGS.DEFAULTS.guid
        );
        if (isRadioWithImg.length === 0) {
          return {
            ...item,
            localType: "radio",
            sequence: index,
          };
        } else {
          return {
            ...item,
            localType: "radioWithImage",
            sequence: index,
          };
        }
      }
    });
    // setSubmitForms(submitData);
    console.log("filtered data", filteredData);
    setFormData({ ...data, questions: filteredData });
    console.log("formData", formData);
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
  if (!formData) return <div>Loading...</div>;
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
          <CreateForm dataSend={dataGet} />
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
