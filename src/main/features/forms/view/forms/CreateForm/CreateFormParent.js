import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, message } from "antd";
import FormHeader from "../EditForm/FormHeader";
import Radio from "./QuestionsItems/Radio";
import RadioWithImage from "./QuestionsItems/RadioWithImage";
import TextFields from "./QuestionsItems/TextFields";
import { defaultUiid } from "../../../../../../utils/Shared/enums/enums";
import { useNavigate } from "react-router-dom";
import Create from "./Create";
// import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import "../EditForm/editForm.css";

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
    console.log("useEffect works when question is update", question);
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
    let questionArray = question.map((elem, index) => {
      console.log("element", elem);

      if (!("fileList" in elem)) {
        console.log("this works");
        return elem;
      } else {
        // console.log(elem);
        return {
          // id: createGuid(),
          // formId: createGuid(),
          answerType: elem.answerType,
          sequence: index,
          question: elem.question,
          image: {
            file:
              elem.image &&
              (elem.image?.originFileObj
                ? elem.image?.originFileObj
                : elem.image.file),
          },
          createBy: user.id,
          answers: elem.fileList ? append(elem.answers, elem?.fileList) : [],
        };
      }
    });
    console.log("****", questionArray);
    setDataObj({ ...dataObj, question: questionArray });
  }, [question]);

  const dataGet = (values) => {
    console.log("data getting from create form component", values);
    setQuestions([...question, values]);
  };

  const subDescriptionGet = (values) => {
    console.log("sub description", values);
    let payload = {
      ...dataObj,
      id: createGuid(),
      subject: values.subject,
      description: values.description,
      approvers: values.approvers && modifySelectData(values.approvers).map((el, index) => {
        return {
          approverId: el,
        };
      }),
      privacyId: values.privacyId
    };
    setDataObj(payload);
    console.log(payload, 'payload.....')
    // console.log("final data to be send to api****", payload);
    if (payload.question.length >= 1) {
      console.log("dispatch actions");
      console.log(payload, 'payload before dispatch')
      dispatch(addForm(payload));
      navigate(-1);
    } else {
      message.error("can't submit without questions");
    }
  };

  let setFormDataByType = (data) => {
    // console.log("data getting in set form by type****", data);
    console.log("questions data map****", data);
    let filteredData = data.question.map((item, index) => {
      console.log(item, "item type");
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
        // console.log("item", item);
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

  const removeQuestion = (i) => {
    console.log("remove question ii", i);
    const data = [...formData.question];
    console.log(data, "data");
    //REMOVE QUESTION FROM ARRAY AND SET SEQUENCE
    data.splice(i, 1);
    console.log("filtered data", data);
    // //UPDATE THE DATA IN STATE
    let filteredData = data.map((item, index) => {
      return {
        ...item,
        sequence: index,
      };
    });
    console.log("new filter data", filteredData);
    setQuestions(filteredData);
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
          <Create
            dataSend={(values) => dataGet(values)}
            subDescriptionSend={(values) => subDescriptionGet(values)}
            removeQuestion={removeQuestion}
            handleSequenceChange={handleSequenceChange}
            formData={formData}
          />
          {/* <FormHeader
            title={formData.subject}
            description={formData.description}
            isAcceptingResp={formData.acceptingResponse}
          /> */}
        </div>
      </div>
    </>
  );
};

// export default CreateFormParent;
