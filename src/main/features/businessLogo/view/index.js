import { Input } from "antd";
import { AdminContainer } from "../../../../components/HrMenu/Administration/StyledComponents/admin";

import {
	FormContainer,
	FormHeader,
	FormInput,
	FormInputContainer
} from "../../../../components/HrMenu/Administration/StyledComponents/adminForm";

export default function BusinessLogo() {
  return (
    <AdminContainer>
      <FormContainer>
        <FormHeader>Business Logo</FormHeader>
        <FormInputContainer>
          <FormInput>
            <Input
              placeholder={"Enter Grade"}
              value={""}
            />
          </FormInput>
        </FormInputContainer>
      </FormContainer>
    </AdminContainer>
  );
}
