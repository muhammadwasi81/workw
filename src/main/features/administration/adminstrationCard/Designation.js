import { Input, Divider, message } from "antd";
import { useEffect, useState, useContext } from "react";
import {
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormHeader,
  FormInput,
  FormInputContainer,
  FormLabel,
  FormTextArea,
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";

import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
import { useDispatch, useSelector } from "react-redux";
import blackLogo from "../../../../content/blackLogo.svg";
import { addDesignation } from "../../designation/store/actions";

function Designation({ formData, setFormData }) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const {
    administration,
    designation,
    sharedLabels,
    Direction,
  } = dictionaryList[userLanguage];

  const [form, setForm] = useState();

  useEffect(() => {
    setForm();
  }, []);
  const { loader } = useSelector((state) => state.designationSlice);

  const onSubmitDesignation = (e) => {
    if (e.name === "" || e.description === "") {
      return message.error("Please fill all required fields");
    } else {
      dispatch(addDesignation(e));
    }
  };
  return (
    <>
      <div>
        <img src={blackLogo} width={70} />
      </div>
      <div className="flex flex-row gap-5">
        <div className=" flex flex-col">
          <FormContainer className="adminstration-card">
            <FormHeader>{administration.designation.desig}</FormHeader>
            <FormInputContainer>
              <FormInput>
                <FormLabel>{administration.designation.desig}</FormLabel>
                <Input
                  placeholder={administration.designation.enterdesig}
                  value={formData.designationName}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </FormInput>
              <FormInput>
                <FormLabel>{administration.designation.description}</FormLabel>
                <FormTextArea
                  placeholder={administration.designation.enterDescription}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </FormInput>
            </FormInputContainer>
            <FormButtonContainer>
              <FormButton
                type="primary"
                size="medium"
                className="formBtn"
                onClick={(e) => onSubmitDesignation(formData)}
                loading={loader}
              >
                {administration.designation.Add}
              </FormButton>
            </FormButtonContainer>
          </FormContainer>
        </div>
        <Divider type="vertical" style={{ height: "400px" }} />
        <div className="basis-1/4  flex flex-col justify-center">
          <div className="moduleHeader justify-center mb-7">Designation</div>
          <img src={blackLogo} width={200} />
        </div>
      </div>
    </>
  );
}
export default Designation;
