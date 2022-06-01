import styled, { css } from "styled-components";
import {
  Steps,
  Form,
  Select,
  Button,
  Upload,
  Divider,
  Space,
  Table,
} from "antd";

const { Step } = Steps;

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

export const Container = styled(Form)`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  padding-bottom: 6rem;
`;
export const ContentDivider = styled(Divider)`
  margin-top: 0 !important;
  color: black;
  & > span {
    border: none;
    color: rgb(26, 86, 105);
    font-weight: bold;
    font-size: 18px;
    white-space: nowrap;
  }
  &::before,
  &::after {
    border-top: 1px solid #00000052 !important;
  }
`;
// export const Stepers = styled(Steps)`
//   height: 100px;
//   display: flex;
//   align-items: center;
//   border-bottom: 1px solid #d9d9d9;
//   padding: 10px;
//   @media (max-width: 1160px) {
//     border-bottom: none;
//     border-right: 10px;
//     height: 90vh !important;
//     flex: 0 0 138px;

//     align-items: flex-start;
//     & .ant-steps-item-title {
//     }
//   }
// `;
// export const Steper = styled(Step)``;
// //addemployee basic info form
export const FormItem = styled(Form.Item)`
  width: 100%;
  margin-bottom: 0px;
  flex-direction: column !important;
  & > div:first-child {
    display: flex;
    border: none;
    color: #1a5669;
    font-weight: bold;
    font-size: 13px;
    white-space: nowrap;
  }
  & .ant-form-item-required {
    ${(props) => props.direction === "rtl" && "flex-direction: row-reverse"}
  }
  & .ant-select-arrow {
    ${(props) => props.direction === "rtl" && "left: 13px"}
  }
  & .ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    ${(props) => props.direction === "rtl" && "padding-right: 0px"}
  }
  & .ant-input,
  .ant-select-selector,
  .ant-input,
  .ant-form-item-explain-error {
    ${(props) => props.direction === "rtl" && "text-align: right"}
  }

  ${(props) =>
    props.area
      ? css`
          grid-area: 1/-2 / span 2 / span 1;
          justify-self: flex-end;
        `
      : ""};
  ${(props) => props.addressArea && css``}
`;
export const BasicForm = styled.div`
  padding: 0.5rem 2rem;
  display: grid;
  margin-top: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  row-gap: 5px;
  column-gap: 15px;
  direction: ${(props) => (props.direction === "ltr" ? "ltr" : "rtl")};
  ${Form.Item} {
    justify-content: ${(props) =>
      props.direction === "ltr" ? "flex-end" : "flex-start"};
  }
  .ant-input-group-addon:first-child {
    border-right: ${(props) =>
      props.direction === "ltr" ? "0" : "1px solid #d9d9d9"};
    border-left: ${(props) =>
      props.direction === "ltr" ? "1px solid #d9d9d9" : "0"};
  }
`;
//label

export const LabelText = styled.label``;
export const ImageUpload = styled(Upload)`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1056px) {
    justify-content: center;
  }
`;
export const ImageButton = styled(Button)`
  width: 120px;
  height: 135px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const CustomSelect = styled(Select)`
  & .ant-select-selector {
    height: 40px;
  }
`;
export const CustomButton = styled(Button)`
  border-radius: 5px;
  width: 100%;
`;
//education form container
export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.type !== "constant"
      ? "repeat(auto-fit, minmax(20rem, 1fr))"
      : "repeat(auto-fit, minmax(15rem, 1fr))"};
  row-gap: 5px;
  column-gap: 15px;
  padding: 0.5rem 2rem;
`;
export const CustomSpace = styled(Space)`
  display: grid !important;
  grid-template-columns: ${(props) =>
    props.type !== "constant"
      ? "repeat(auto-fit, minmax(20rem, 1fr))"
      : "repeat(auto-fit, minmax(12rem, 1fr))"};
  row-gap: 1px;
  column-gap: 15px;
  padding: 0.5rem 2rem;
  align-items: flex-start;
  .ant-space-item:last-child {
    align-self: center;
    margin-top:1rem
  }
}
`;
export const AddMoreDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
export const EFormItem = styled(Form.Item)`
  width: 100%;
  align-self: center;
  justify-self: center;
  margin-bottom: 0;
  flex-direction: column !important;
  & > div:first-child {
    display: flex;
    direction: ${(props) => (props.direction === "ltr" ? "ltr" : "rtl")};
    border: none;
    color: #1a5669;
    font-weight: bold;
    font-size: 13px;
    white-space: nowrap;
  }
  & .custom-for-attachment-1 {
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 30px;
  }
  & .custom-for-attachment-2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 50px;
  align-items: center;
  button {
    display: flex;
    align-items: center;
  }
`;
export const EButton = styled(Button)`
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 5px !important;
  width: 12.4rem !important;
`;
export const EmployeeCardCustom = styled.div`
  display: flex;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 12px 6px -12px #bbbbbb;
  padding-right: 1rem;
  transition: 0.3s all;
  border: 1px solid transparent;
  cursor: pointer;
  .employeeCard__img {
    width: 12rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .employeeCard__body {
    padding: 1rem;
    p {
      font-size: 18px;
      font-weight: 700;
      color: #454545;
      margin-bottom: 2px;
    }
    & > div {
      font-size: 12px;
      color: #9a9a9a;
      display: flex;
      span {
        white-space: nowrap;
        font-weight: 700;
      }
    }
  }
  .employeeCard__footer {
    display: flex;
    align-items: flex-end;
    padding-bottom: 2rem;
    .anticon {
      color: #666;
      font-size: 2rem;
    }
  }
  .buttonGroup {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  .ThemeBtn span {
    color: #fff;
  }
  .dangerBtn {
    background: #db5252 !important;
    border: none;
    border-radius: 5px;
    span {
      color: #fff;
    }
  }
  &:hover {
    background: #f8f8f8;
    border-color: #ccc;
    box-shadow: 0 18px 12px -18px #bbbbbb;
  }
`;
export const AllEmpolyeeContainer = styled.div`
  width: 100%;
  display: grid;
  margin-top: 5px;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  height: fit-content;
  direction: ${(props) => (props.direction === "ltr" ? "ltr" : "rtl")};
  ${EmployeeCardCustom} {
    padding-right: ${(props) => (props.direction === "ltr" ? "1rem" : "0")};
    padding-left: ${(props) => (props.direction === "ltr" ? "0" : "1rem")};
  }
`;
export const Customtable = styled(Table)`
  direction: ${(props) => (props.direction === "ltr" ? "ltr" : "rtl")};
`;
