import "./customApprovalCategory.css";
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
import { customCategoryDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { useDispatch, useSelector } from "react-redux";

export default function CustomApprovalCategoryForm({ data, onSubmit }) {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { Direction, customcategoryDictionary } = customCategoryDictionaryList[
    userLanguage
  ];
  const { loader } = useSelector((state) => state.customApprovalCategorySlice);

  return (
    <FormContainer>
      <FormHeader>{customcategoryDictionary.customApprovalcategory}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>
            {customcategoryDictionary.customApprovalcategory}
          </FormLabel>
          <Input
            placeholder={customcategoryDictionary.enterCustomApprovalcategory}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </FormInput>
        <FormInput>
          <FormLabel>{customcategoryDictionary.desc}</FormLabel>
          <FormTextArea
            placeholder={customcategoryDictionary.enterDesc}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </FormInput>
      </FormInputContainer>
      <FormButtonContainer>
        {form.id ? (
          <>
            <FormButton
              type="primary"
              size="medium"
              className="formBtn"
              onClick={(e) => onSubmit(form)}
              loading={loader}
            >
              {customcategoryDictionary.saveCategory}
            </FormButton>
            <FormButton
              type="primary"
              size="medium"
              className="formBtn"
              onClick={(e) => setForm({ ...form, description: "", name: "" })}
            >
              {customcategoryDictionary.clear}
            </FormButton>
          </>
        ) : (
          <FormButton
            type="primary"
            size="medium"
            className="formBtn"
            onClick={(e) => onSubmit(form)}
            loading={loader}
          >
            {customcategoryDictionary.addCategory}{" "}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
