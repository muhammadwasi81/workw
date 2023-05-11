import "./custom.css";
import { Input,Form, Select, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState, useContext } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
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
import MemberSelect from "../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { getAllEmployees } from "../../../../utils/Shared/store/actions";
import {addCustomTag,addCustomTagMember} from "../store/action";
import { useParams } from "react-router-dom";
import { getNameForImage } from "../../../../utils/base";
import { defaultUiid } from '../../../../utils/Shared/enums/enums';

export default function CustomTagForm({
  data,
  onSubmit,
  loading,
  setClearButton,
  clearButton,
}) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { administration, sharedLabels, Direction } = dictionaryList[
    userLanguage
  ];

  const [form, setForm] = useState(data);
  const handleClear = (e) => {
    setForm({ ...form, description: "", name: "" });
    setClearButton(false);
  };

  const handelChangeName = (e) => {
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

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <FormContainer>
      <FormHeader>CustomTag</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>CustomTag</FormLabel>
          <Input
            placeholder="Enter CustomTag"
            value={form?.name}
            onChange={handelChangeName}
          />
        </FormInput>
        <FormInput>
          <FormLabel>Description</FormLabel>
          <FormTextArea
            placeholder= "EnterDescription"
            value={form?.description}
            onChange={handelChangeDescription}
          />
        </FormInput>
      </FormInputContainer>
      <FormButtonContainer>
        {form?.id ? (
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
            >
              SaveCustomTag
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
            AddCustomTag
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
           Clear
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
