import "./leaveType.css";
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
} from "../../../../sharedComponents/StyledComponents/adminForm";

import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { useDispatch, useSelector } from "react-redux";

export default function LeaveTypeForm({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, leave, Direction } = dictionaryList[userLanguage];
  console.log("jkjll", administration);

  const [form, setForm] = useState(data);

  const handleClear = (e) => {
    setForm({ ...form, description: "", name: "" });
    setClearButton(false);
  };

  const handelChangeName = (e) => {
    console.log(e.target.value);
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, name: e.target.value });
  };

  const handelChangeDescription = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, description: e.target.value });
  };
  const handelChangeCounts = (e) => {
    if (e.target.value.length > 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
    setForm({ ...form, defaultAllotLeaves: e.target.value });
  };

  useEffect(() => {
    setForm(data);
  }, [data]);
  const { loader } = useSelector((state) => state.leaveTypeSlice);

  return (
    <FormContainer>
      <FormHeader>{administration.leave.Leave}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{administration.leave.leaveType}</FormLabel>
          <Input
            placeholder={administration.leave.enterLeave}
            value={form.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{administration.leave.description}</FormLabel>
          <FormTextArea
            placeholder={administration.leave.enterDescription}
            value={form.description}
            onChange={handelChangeDescription}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{administration.leave.allotLeaves}</FormLabel>
          <Input
            placeholder={"Alloted Leaves"}
            value={form.defaultAllotLeaves}
            type={"number"}
            onChange={handelChangeCounts}
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
              onClick={(e) => {
                onSubmit(form);
                setClearButton(false);
              }}
              loading={loading}
            >
              {administration.leave.save}
            </FormButton>
          </>
        ) : (
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={(e) => {
              onSubmit(form);
              setClearButton(false);
            }}
            loading={loading}
          >
            {administration.leave.Add}
          </FormButton>
        )}
        {clearButton && (
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={handleClear}
          >
            {administration.leave.clear}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
