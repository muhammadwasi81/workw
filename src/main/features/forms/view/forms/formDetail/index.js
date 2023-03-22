import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message, Skeleton } from 'antd';
import { MessagePage } from '../SubmitForm/congratsPage';
import FormHeader from '../SubmitForm/FormHeader';
import Radio from './QuestionsItems/Radio';
import RadioWithImage from './QuestionsItems/RadioWithImage';
import TextFields from './QuestionsItems/TextFields';
import { useSearchParams, useLocation } from 'react-router-dom';
import {
  getFormById,
  submitForm as submitFormAction,
} from '../../../store/actions';
import BusinessLogo from '../../../../../../content/systemLogo.png';
import '../SubmitForm/SubmitForm.css';
import { LanguageChangeContext } from '../../../../../../utils/localization/localContext/LocalContext';
import { documentDictionaryList } from '../../../localization/index';
import Header from './Header';

let initialData = {
  formId: '',
  userId: '',
  email: '',
  attempt: [],
};

const ResponseFormDetails = (props) => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];

  const { submit, poweredBy } = documentDictionary;
  const dispatch = useDispatch();
  const { disableSubmit } = props;
  let { id } = useParams();
  const [searchParams] = useSearchParams();
  const [userEmail, setUserEmail] = useState('');
  const [formStatus, setStatus] = useState('');
  const [formData, setFormData] = useState({});
  const [submitForm, setSubmitForms] = useState(initialData);
  const [attempt, setAttempt] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    isOpen: false,
    Message: '',
    variant: 'error',
  });
  const { formDetail } = useSelector((state) => state.formSlice);
  const { user } = useSelector((state) => state.userSlice);
  //   const { state } = props.location;

  useEffect(() => {
    console.log('dispatch works for getting data from api');
    // const id = searchParams.get("id");
    dispatch(getFormById(id));
    console.log('formDetail', formDetail);
  }, []);

  useEffect(() => {
    console.log('useEffect works when component update');
    console.log('***', formDetail);
    if (Object.keys(formDetail).length > 1) {
      setFormDataByType(formDetail);
      setSubmitForms({
        ...submitForm,
        formId: formDetail?.id,
        // email: formDetail?.creator?.email,
        userId: user?.id,
        attempt: formDetail?.question.map((el, index) => {
          return {
            questionId: el.id,
            // answer: el.answers.length > 1 ? { answer_id: "" } : "",
            answer: '',
          };
        }),
      });
    }
  }, [formDetail]);

  let setFormDataByType = (data) => {
    console.log('data send form parameter***', data);
    let filteredData = data.question.map((item, index) => {
      if (item.answerType === 2) {
        return {
          ...item,
          localType: 'number',
          sequence: index,
        };
      } else if (item.answerType === 3) {
        return {
          ...item,
          localType: 'text',
          sequence: index,
        };
      } else if (item.answerType === 1) {
        //check image available
        console.log('items in submit form', item);
        if (item.answers[index]?.image?.length > 1) {
          console.log('worksss');
          return {
            ...item,
            localType: 'radioWithImage',
            sequence: index,
          };
        } else {
          console.log('not working');
          return {
            ...item,
            localType: 'radio',
            sequence: index,
          };
        }
      }
    });
    console.log('Filtered data', filteredData);
    setFormData({ ...formDetail, question: filteredData });
    // console.log("Form data", formData);
  };

  let handleChange = (value, index, id, answerType) => {
    let updateAnswers = [...submitForm.attempt];
    if (updateAnswers[index].questionId === id) {
      if (!Array.isArray(updateAnswers[index].answer)) {
        updateAnswers[index].answer = value;
      } else {
        updateAnswers[index].answer_id = value;
      }
    }
    setSubmitForms({ ...submitForm, attempt: updateAnswers });
  };

  const handleSubmit = () => {
    let payload = submitForm;
    // console.log(payload);
    /**TODO: check answer length is empty
     * check if answer is radio option
     */
    const dataCheck = payload.attempt.map((el, index) => {
      if (el.answer.length === 0) {
        return false;
      } else {
        return true;
      }
    });
    // console.log(dataCheck);

    //sending data to api
    if (!dataCheck.some((el) => el === false)) {
      dispatch(submitFormAction(payload));
      setIsSubmited(true);
    } else {
      message.error('Please Fill All the fields');
    }
  };

  if (!formData) return <MessagePage message={formStatus} />;
  if (isSubmited)
    return (
      <div className="w-full h-full flex m-auto justify-center items-center">
        <MessagePage message="Thank you for your responses" />
      </div>
    );

  return (
    <>
      <Header />

      <div className="submit-form-wrap">
        <div className="formCompanyLogo">
          <img src={BusinessLogo} />
        </div>
        {Object.keys(formData).length > 1 ? (
          <div className="center-fix">
            <FormHeader
              title={formData.subject}
              description={formData.description}
              isAcceptingResp={formData.acceptingResponse}
              handleChangeEmail={(e) =>
                setSubmitForms({ ...submitForm, email: e.target.value })
              }
              disableSubmit={disableSubmit}
            />
            {formData &&
              formData.question.map((item, index) => (
                <>
                  {item.localType === 'radio' && (
                    <Radio
                      handleRadioChange={handleChange}
                      question={item}
                      index={index}
                      disableSubmit={disableSubmit}
                      required={true}
                    />
                  )}
                  {item.localType === 'radioWithImage' && (
                    <RadioWithImage
                      handleChange={handleChange}
                      question={item}
                      index={index}
                      disableSubmit={disableSubmit}
                      required={true}
                    />
                  )}
                  {item.localType === 'text' && (
                    <TextFields
                      handleChange={handleChange}
                      fieldData={item}
                      index={index}
                      type="text"
                      disableSubmit={disableSubmit}
                      required={true}
                    />
                  )}
                  {item.localType === 'number' && (
                    <TextFields
                      handleChange={handleChange}
                      fieldData={item}
                      index={index}
                      type="number"
                      disableSubmit={disableSubmit}
                      required={true}
                    />
                  )}
                </>
              ))}
            <div className="poweredBy">
              <div>{poweredBy}</div>
              <a href="https://workw.com">
                <img src={BusinessLogo} />
              </a>
            </div>
          </div>
        ) : (
          <div className="center-fix">
            {[...Array(5)].map((item) => (
              <div className="c-row txt-fields bg-clr p_15">
                <Skeleton active />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default ResponseFormDetails;
