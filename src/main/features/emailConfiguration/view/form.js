import "./grade.css";
import { Input } from "antd";
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
} from "../../../sharedComponents/Administration/StyledComponents/adminForm";
import { emailConfiDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useDispatch, useSelector } from "react-redux";

export default function EmailConfigurationForm({ data, onSubmit, loading }) {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, emailConfiDictionary } = emailConfiDictionaryList[
    userLanguage
  ];
  const { loader } = useSelector((state) => state.emailConfigurationSlice);

  return (
    <FormContainer>
      <FormHeader>{emailConfiDictionary.emailConfi}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{emailConfiDictionary.emailConfi}</FormLabel>
          <Input
            placeholder={emailConfiDictionary.enterEmailConfi}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{emailConfiDictionary.incomingPort}</FormLabel>
          <Input
            placeholder={emailConfiDictionary.enterIncomingPort}
            value={form.incomingPort}
            onChange={(e) => setForm({ ...form, incomingPort: e.target.value })}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{emailConfiDictionary.incomingServerAddress}</FormLabel>
          <Input
            placeholder={emailConfiDictionary.enterIncomingServerAddress}
            value={form.incomingServerAddress}
            onChange={(e) =>
              setForm({ ...form, incomingServerAddress: e.target.value })
            }
          />
        </FormInput>
        <FormInput>
          <FormLabel>{emailConfiDictionary.outgoingPort}</FormLabel>
          <Input
            placeholder={emailConfiDictionary.enterOutgoingPort}
            value={form.outgoingPort}
            onChange={(e) => setForm({ ...form, outgoingPort: e.target.value })}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{emailConfiDictionary.outgoingServerAddress}</FormLabel>
          <Input
            placeholder={emailConfiDictionary.enterOutgoingServerAddress}
            value={form.outgoingServerAddress}
            onChange={(e) =>
              setForm({ ...form, outgoingServerAddress: e.target.value })
            }
          />
        </FormInput>
        <FormInput>
          <FormLabel>{emailConfiDictionary.provider}</FormLabel>
          <Input
            placeholder={emailConfiDictionary.enterProvider}
            value={form.provider}
            onChange={(e) => setForm({ ...form, provider: e.target.value })}
          />
        </FormInput>
      </FormInputContainer>
      <FormButtonContainer>
        {form.id ? (
          <>
            <FormButton
              type="primary"
              size="medium"
              style={{}}
              className="formBtn"
              onClick={(e) => onSubmit(form)}
              loading={loading}
            >
              {emailConfiDictionary.saveEmailConfi}
            </FormButton>
            <FormButton
              type="primary"
              size="medium"
              style={{}}
              className="formBtn"
              onClick={(e) => setForm({ ...form, description: "", name: "" })}
            >
              {emailConfiDictionary.clear}
            </FormButton>
          </>
        ) : (
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={(e) => onSubmit(form)}
            loading={loading}
          >
            {emailConfiDictionary.addEmailConfi}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
