import React, { useState, useContext, useEffect } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../../../sharedComponents/AppComponents/MainFlexContainer";
import { getAllDepartmentAppraisalQuestionService } from "../../../../departments/services/service";
import { getAllQuestion } from "../../../../appraisal/appraisalQuestion/store/actions";
import Header from "../../../../../layout/header/index";
import SubmitAppraisalBody from "./submitAppraisalBody";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { appraisalDictionaryList } from "../../../localization/index";
import { createGuid, modifySelectData } from "../../../../../../utils/base";
import { getAllGrades } from "../../../../grade/store/actions";
import { addAppraisal } from "../../../store/action";
import { openNotification } from "../../../../../../utils/Shared/store/slice";
function Index() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appraisalDictionary } = appraisalDictionaryList[userLanguage];
  const { submitAppraisal } = appraisalDictionary;
  const CurrentTab = useSelector(
    (state) => state.appraisalModuleSlice.currentTab
  );
  const [submit, setSubmit] = useState(false);
  const { userTask } = useSelector((state) => state.appraisalModuleSlice);

  const createAppraisal = () => {
    console.log("create works");
    setSubmit(true);
    dataGet();
  };

  const dataGet = (data, startDate, endDate, userId) => {
    console.log(
      data,
      startDate,
      endDate,
      userId,
      "in index file of submit appraisal"
    );
    //TODO: make an object that will be send as payload to api call
    let payload = {
      id: createGuid(),
      userId: userId,
      startDate: startDate,
      endDate: endDate,
      questions: data?.questions,
      gradeId: data?.values.gradeId,
      salary: data.salary ? data.salary : null,
      bonus: data.bonus ? data.bonus : null,
      comment: data?.values.comment,
      approvers: modifySelectData(data?.values.approvers).map((el, index) => {
        return {
          approverId: el,
          approverType: 0,
        };
      }),
      tasks: userTask?.map((el) => el.taskId),
    };
    //dispatch add appraisal
    if (!userTask.length) {
      console.log(payload, "final payload");
      dispatch(
        openNotification({
          message: "Tasks is required",
          type: "error",
        })
      );
    } else {
      console.log(payload, "final payload");
      dispatch(addAppraisal(payload));
    }
    // console.log(payload, "final payload");
    //setState submit false when API is called
    setSubmit(false);
  };

  useEffect(() => {
    console.log("first mount appraisal");
    dispatch(getAllQuestion());
    dispatch(getAllGrades());
  }, []);

  return (
    <>
      <TabbableContainer>
        <Header
          buttons={[
            {
              buttonText: submitAppraisal,
              render: (
                <Button className="ThemeBtn" onClick={createAppraisal}>
                  <PlusOutlined />
                  {submitAppraisal}
                </Button>
              ),
            },
          ]}
        />
        <ContBody>
          <SubmitAppraisalBody
            submit={submit}
            dataSend={(val, startDate, endDate, userId) =>
              dataGet(val, startDate, endDate, userId)
            }
          />
        </ContBody>
      </TabbableContainer>
    </>
  );
}

export default Index;
