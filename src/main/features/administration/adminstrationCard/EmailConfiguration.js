import { Divider, Input, message } from "antd";
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
import { emailConfiDictionaryList } from "../../emailConfiguration/localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useDispatch, useSelector } from "react-redux";
import blackLogo from "../../../../content/blackLogo.svg";
import { addEmailConfiguration } from "../../emailConfiguration/store/actions";
import "./adminstartionCard.css";

export default function EmailConfigurationForm({
  formData,
  setFormData,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, emailConfiDictionary } = emailConfiDictionaryList[
    userLanguage
  ];
  const { loader } = useSelector((state) => state.emailConfigurationSlice);
  const onSubmitEmailConfiguration = (e) => {
    if (
      e.emailName === "" ||
      e.incomingPort === "" ||
      e.incomingServerAddress === "" ||
      e.outgoingPort === "" ||
      e.outgoingServerAddress === "" ||
      e.provider === ""
    ) {
      return message.error("Please fill all required fields");
    } else {
      dispatch(addEmailConfiguration(e));
    }
  };
  return (
    <>
      <div>
        <img src={blackLogo} width={70} />
      </div>
      <div className="flex flex-row gap-5">
        <div className=" flex flex-col">
          <FormContainer
            style={{ width: "500px", marginTop: "30px", height: "530px" }}
            className="email-form-container"
          >
            <FormHeader>{emailConfiDictionary.emailConfi}</FormHeader>
            <FormInputContainer>
              <FormInput>
                <FormLabel>{emailConfiDictionary.emailConfi}</FormLabel>
                <Input
                  placeholder={emailConfiDictionary.enterEmailConfi}
                  value={formData.emailName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emailName: e.target.value,
                    })
                  }
                />
              </FormInput>
              <FormInput>
                <FormLabel>{emailConfiDictionary.incomingPort}</FormLabel>
                <Input
                  placeholder={emailConfiDictionary.enterIncomingPort}
                  value={formData.incomingPort}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      incomingPort: e.target.value,
                    })
                  }
                />
              </FormInput>
              <FormInput>
                <FormLabel>
                  {emailConfiDictionary.incomingServerAddress}
                </FormLabel>
                <Input
                  placeholder={emailConfiDictionary.enterIncomingServerAddress}
                  value={formData.incomingServerAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      incomingServerAddress: e.target.value,
                    })
                  }
                />
              </FormInput>
              <FormInput>
                <FormLabel>{emailConfiDictionary.outgoingPort}</FormLabel>
                <Input
                  placeholder={emailConfiDictionary.enterOutgoingPort}
                  value={formData.outgoingPort}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      outgoingPort: e.target.value,
                    })
                  }
                />
              </FormInput>
              <FormInput>
                <FormLabel>
                  {emailConfiDictionary.outgoingServerAddress}
                </FormLabel>
                <Input
                  placeholder={emailConfiDictionary.enterOutgoingServerAddress}
                  value={formData.outgoingServerAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      outgoingServerAddress: e.target.value,
                    })
                  }
                />
              </FormInput>
              <FormInput>
                <FormLabel>{emailConfiDictionary.provider}</FormLabel>
                <Input
                  placeholder={emailConfiDictionary.enterProvider}
                  value={formData.provider}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      provider: e.target.value,
                    })
                  }
                />
              </FormInput>
            </FormInputContainer>
            <FormButtonContainer>
              <FormButton
                type="primary"
                size="medium"
                style={{ width: "" }}
                className="formBtn"
                onClick={(e) => onSubmitEmailConfiguration(formData)}
                loading={loader}
              >
                Add{" "}
              </FormButton>
              <FormButton
                type="primary"
                size="medium"
                style={{ width: "" }}
                className="formBtn"
                onSuccess={onSuccess}
              >
                Submit
              </FormButton>
            </FormButtonContainer>
          </FormContainer>
        </div>
        <Divider
          type="vertical"
          style={{
            height: "530px",
          }}
        />
        <div className="basis-1/4  flex flex-col justify-center">
          <div className="moduleHeader justify-center mb-7">
            Email Configuration
          </div>
          <img src={blackLogo} width={200} />
        </div>
      </div>
    </>
  );
}
