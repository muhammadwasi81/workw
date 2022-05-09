import "./grade.css";
import { Input } from "antd";
import { useEffect, useState } from "react";
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
export default function EmailConfigurationForm({ data, onSubmit, loading }) {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
    
  }, [data]);

  return (
    <FormContainer>
      <FormHeader>Email Configuration</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>Email Configuration</FormLabel>
          <Input
            placeholder={"Enter Email Configuration"}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Incoming Port</FormLabel>
          <Input
            placeholder={"Enter Incoming Port"}
            value={form.incomingPort}
            onChange={(e) => setForm({ ...form, incomingPort: e.target.value })}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Incoming Server Address</FormLabel>
          <Input
            placeholder={"Enter incoming Server Address"}
            value={form.incomingServerAddress}
            onChange={(e) => setForm({ ...form, incomingServerAddress: e.target.value })}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Outgoing Port</FormLabel>
          <Input
            placeholder={"Enter Outgoing Port"}
            value={form.outgoingPort}
            onChange={(e) => setForm({ ...form, outgoingPort: e.target.value })}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Outgoing Server Address</FormLabel>
          <Input
            placeholder={"Enter Outgoing Server Address"}
            value={form.outgoingServerAddress}
            onChange={(e) => setForm({ ...form, outgoingServerAddress: e.target.value })}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Provider</FormLabel>
          <Input
            placeholder={"Enter Provider"}
            value={form.provider}
            onChange={(e) => setForm({ ...form, provider: e.target.value })}
          />
        </FormInput>
      </FormInputContainer>
      <FormButtonContainer>
        {
          form.id ? 
          <>
            <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={(e) => onSubmit(form)}
          >
            Save Email Configuration
          </FormButton>
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={(e) => setForm({ ...form, description: "", name: "" })}
          >
            Clear 
          </FormButton>
          </>
        : 
        <FormButton
          type="primary"
          size="medium"
          style={{}}
          className="formBtn"
          onClick={(e) => onSubmit(form)}
          // loading={loading}
      >
        Add Email Configuration 
      </FormButton>
        }
      </FormButtonContainer>
    </FormContainer>
  );
}
