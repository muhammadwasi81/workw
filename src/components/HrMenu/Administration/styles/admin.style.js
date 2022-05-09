//adminlistelements
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Form, InputNumber, Radio, Select } from "antd";
import Input from "../../../SharedComponent/Input/TextInput";
import InputArea from "../../../SharedComponent/Input/TextArea";
import Button from "../../../SharedComponent/button/index";

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

//adminpanelcontainer
export const AdminPanelContainer = styled.div`
	display: flex;
	width: 100%;
	background: #f9f9f9;
	min-height: 80vh;
	flex-direction: ${props =>
		props.theme.Direction === "ltr" ? "row" : "row-reverse"};
`;
export const AdminList = styled.div`
	height: min-content;
	overflow-y: scroll;
`;
export const List = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	white-space: nowrap;
	height: min-content;
	min-height: 700px;
	margin: 1.2rem 0.5rem;
	background-color: white;
	border-radius: 4px;

	@media ${device.tablet} {
		& {
			height: min-content;
		}
	}
`;
export const Item = styled.div`
	width: 100%;
	height: 50px;
	list-style-type: none;

	border-bottom: 1px solid rgba(29, 45, 58, 0.1);

	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
`;
export const Link = styled(NavLink)`
	flex-direction: ${props =>
		props.theme.Direction === "ltr" ? "row" : "row-reverse"};

	text-decoration: none !important ;
	padding-right: 10px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	height: 100%;
	color: #1a5669;
	font-family: inherit;
	font-weight: ${props => (props.theme.Direction === "ltr" ? 700 : 500)};

	font-size: 15px;
	position: relative;
	&::before {
		content: "";
		height: 100%;
		background-color: #365899;
		position: absolute;
		top: 0;
		left: 0;
	}
	&:hover {
		color: #1a5669;
		::before {
			width: 2px;
		}
	}
	&.active,
	&:active {
		background-color: #1b5669;
		border-radius: 0 4px 4px 0;
		color: white;

		& > svg {
			fill: white;
		}

		&:hover {
			color: #1b5669;
			color: white;
			& > svg {
				fill: white;
			}
		}
	}

	& > svg {
		margin-right: 0.7rem;
		margin-left: 1rem;
	}
`;

//customtable

export const Container = styled.div`
	width: 100%;
	display: block;
	flex-direction: ${props =>
		props.theme.Direction === "ltr" ? "row" : "row-reverse"};
	margin: 1rem 0;
	border-radius: 4px;
	background-color: white;
	@media (max-width: 1200px) {
		flex-direction: column;
	}
`;
export const Heading = styled.div`
	width: 100%;
	color: #1a5669;
	font-weight: ${props => (props.theme.Direction === "ltr" ? 700 : 500)};

	border: none;
	height: 3rem;
	font-size: 1rem;
	padding: 10px 10px 0 10px;
	margin-bottom: 1.2rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	flex-direction: ${props =>
		props.theme.Direction === "ltr" ? "row" : "row-reverse"};
`;
export const FormCustom = styled(Form)`
	flex: 0 0 25%;
	min-width: 13rem;
	margin: 10px;
	height: min-content;
	padding-bottom: 1rem;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 4px;

	&&& {
		.ant-form-item-control-input-content {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
	}
`;

export const InputContainer = styled.div`
	width: 80%;
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: ${props =>
		props.theme.Direction === "ltr" ? "flex-start" : "flex-end"};
`;
export const Text = styled.div`
	display: flex;

	font-size: 12px;
	border: none;
	color: #1a5669;
	font-weight: bold;
	font-size: 13px;
`;

export const InputText = styled(Input)`
	width: 100%;
	height: 2.5rem;
	&::placeholder {
		display: flex;

		flex-direction: ${props =>
			props.theme.Direction === "ltr" ? "row" : "row-reverse"};
	}
`;
export const InputNo = styled(InputNumber)`
	width: 100%;
	height: 2.5rem;
`;
export const InputTextArea = styled(InputArea)`
	width: 100%;
	margin-bottom: 10px;
	resize: none;
`;

//jobdescription
export const SelectOption = styled(Select)`
	width: 100% !important;
	height: 2.5rem;
`;

///allowance radio button

export const RadioContainer = styled(Radio.Group)`
	width: 80%;
	height: 2rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
export const RadioButton = styled(Radio)``;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;
export const CustomButton = styled(Button)``;
