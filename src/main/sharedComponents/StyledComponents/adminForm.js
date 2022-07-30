import { Button, Input } from "antd";
import styled from "styled-components";

export const FormContainer = styled.div`
  height: min-content;
  padding-bottom: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 100%;
`;

export const FormHeader = styled.h1`
  width: 100%;
  color: var(--primary_theme_color_green);
  font-weight: 700;
  border: none;
  height: 3rem;
  font-size: 1rem;
  padding: 10px 10px 0 10px;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
`;

export const FormInputContainer = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}`;

export const FormInput = styled.div`
  width: 80%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: "flex-start";
`;
export const AllowncesFormInput = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: "flex-start";
`;

export const FormLabel = styled.label`
  display: flex;
  font-size: 12px;
  border: none;
  color: var(--primary_theme_color_green);
  font-weight: bold;
  font-size: 13px;
`;

export const FormButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormButton = styled(Button)`
  background-color: #1b5669;
  width: 35%;
  border-radius: 4px;
  align-items: center;
  @media (max-width: 768px) {
    width: 80%;
    margin: 0 auto !important;
    margin-bottom: 10px !important;
  }
`;

export const FormTextArea = styled(Input.TextArea)`
  resize: none;
  border-radius: 4px;
  ${(props) => props.direction === "rtl" && "text-align:right"}
`;
