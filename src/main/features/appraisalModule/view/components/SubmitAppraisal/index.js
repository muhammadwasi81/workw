import React, { useState, useContext, useEffect } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../../../sharedComponents/AppComponents/MainFlexContainer";
import { getAllDepartmentAppraisalQuestionService } from "../../../../departments/services/service";
import {getAllQuestion} from '../../../../appraisal/appraisalQuestion/store/actions';
import Header from "../../../../../layout/header/index";
import SubmitAppraisalBody from "./submitAppraisalBody";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LanguageChangeContext } from "../../../../../../utils/localization/localContext/LocalContext";
import { appraisalDictionaryList } from "../../../localization/index";
function Index() {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { appraisalDictionary } = appraisalDictionaryList[userLanguage];
  const { submitAppraisal } = appraisalDictionary;
  const CurrentTab = useSelector(
    (state) => state.appraisalModuleSlice.currentTab
  );
  const [submit, setSubmit] = useState(false);

  const createAppraisal = () => {
    console.log("create works");
    setSubmit(true);
  };

  const dataGet = (data) => {
    console.log(data, "in index file of submit appraisal");
    //TODO: API call here when API is ready

    //setState submit false when API is called
    setSubmit(false);
  };

  useEffect(()=>{
    console.log('first mount appraisal')
    dispatch(getAllQuestion()); 
  },[])

  return (
    <>
      <TabbableContainer>
        <Header
          buttons={[
            {
              buttonText: submitAppraisal,
              render: (
                <Button className="ThemeBtn" onClick={() => createAppraisal()}>
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
            dataSend={(val) => dataGet(val)}
          />
        </ContBody>
      </TabbableContainer>
    </>
  );
}

export default Index;
