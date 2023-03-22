import "./JobDescription.css";
import { Select } from "antd";
import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDesignation } from "../../designation/store/actions";
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
import { jobDescDictionaryList } from "../localization/index";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";

export default function JobDescriptionForm({ data, onSubmit }) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { jobDescDictionary } = jobDescDictionaryList[userLanguage];

  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.jobDescriptionSlice);

  const { Option } = Select;
  const [designationId, setDesignationId] = useState("");
  const [form, setForm] = useState(data);

  const { designations } = useSelector((state) => state.designationSlice);

  useEffect(() => {
    dispatch(getAllDesignation());
  }, []);

  const handleChange = (value) => {
    const x = designations.filter((item) => item.id === value);
    setForm({ ...form, designationId: x[0].id });
  };

  useEffect(() => {
    setForm(data);
  }, [data]);
  return (
    <FormContainer>
      <FormHeader>{jobDescDictionary.jobDesc}</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>{jobDescDictionary.designation}</FormLabel>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder={jobDescDictionary.selectDesign}
            optionFilterProp="children"
            onChange={handleChange}
            value={form.designationId}
            name="designationId"
          >
            {designations.map((item) => (
              <Select.Option value={item.id}>{item.description}</Select.Option>
            ))}
          </Select>
        </FormInput>
        <FormInput>
          <FormLabel>Description</FormLabel>
          <FormTextArea
            placeholder={jobDescDictionary.enterDesc}
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
              {jobDescDictionary.saveJobDesc}
            </FormButton>
            <FormButton
              type="primary"
              size="medium"
              className="formBtn"
              onClick={(e) =>
                setForm({ ...form, designationId: "", description: "" })
              }
            >
              {jobDescDictionary.clear}
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
            {jobDescDictionary.addJobdesc}
          </FormButton>
        )}
      </FormButtonContainer>
    </FormContainer>
  );
}
