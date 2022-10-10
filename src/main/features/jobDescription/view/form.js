import "./JobDescription.css";
import { Input, Select,  } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllDesignation} from "../../designation/store/actions" 
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

export default function JobDescriptionForm({ data, onSubmit, loading }) {
  const dispatch = useDispatch();
  const { Option } = Select;  
  const [designationId, setDesignationId] = useState("");
  const [form, setForm] = useState(data);

  const { designations } = useSelector((state) => state.designationSlice);

  useEffect(() => {
    dispatch(getAllDesignation());
  }, []);

  const  handleChange = (value) =>  {
    const x = designations.filter((item) => item.id === value)
    setForm({...form, designationId: x[0].id})
    
  }

  useEffect(() => {
    setForm(data);
  }, [data]);
  return (
    <FormContainer>
      <FormHeader>Job Description</FormHeader>
      <FormInputContainer>
        <FormInput>
          <FormLabel>
            Designation
          </FormLabel>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select Designation"
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
            placeholder={"Enter Description"}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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
            Save Job Description
          </FormButton>
          <FormButton
            type="primary"
            size="medium"
            style={{}}
            className="formBtn"
            onClick={(e) => setForm({ ...form, designationId: "", description: "",  })}
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
        Add Job Description 
      </FormButton>
        }
      </FormButtonContainer>
    </FormContainer>
  );
}
