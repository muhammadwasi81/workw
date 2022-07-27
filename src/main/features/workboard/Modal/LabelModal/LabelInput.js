import React, { useEffect, useRef, useState } from "react";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";

import styled from "styled-components";
const LabelInputContainer = styled.div`
	&::before {
		background: ${props => props.color};
	}
`;
function LabelInput({ labelObj, todoDetail, handleWorkBoardTodoLabel }) {
	const [labelText, setLabelText] = useState("");
	const [enableText, setEnableText] = useState(true);
	const { labels } = todoDetail;
	const inputRef = useRef();

	const onEnter = e => {
		if (e.keyCode === 13) {
			setEnableText(true);
		}
	};

	useEffect(() => {
		if (!enableText) {
			inputRef.current.focus();
		}
	}, [enableText]);
	// console.log("labels", todoDetail);
	return (
		<LabelInputContainer
			className={`flex mb-2 items-center relative w-full hover:before:w-2 before:h-[40px] before:brightness-75 `}
			color={labelObj.colorCode}
			onClick={() => {
				handleWorkBoardTodoLabel(labelObj);
			}}
		>
			<div
				style={{ background: labelObj.colorCode }}
				className="w-full flex items-center h-[40px]"
			>
				<input
					ref={inputRef}
					className={`h-10 text-white font-bold p-2 my-1 rounded-sm cursor-pointer outline-none px-2 flex w-full bg-transparent`}
					disabled={enableText}
					onKeyDown={onEnter}
					onBlur={() => {
						setEnableText(true);
					}}
					value={labelText}
					onChange={e => {
						setLabelText(e.target.value);
					}}
					onClick={e => {
						e.stopPropagation();
					}}
				/>
				{labels.map(
					label =>
						label.colorCode === labelObj.colorCode && (
							<CheckOutlined className="pr-5 text-base !text-white" />
						)
				)}
			</div>
			<EditOutlined
				className="cursor-pointer hover:bg-neutral-100 rounded-sm p-2 ml-2"
				onClick={e => {
					e.stopPropagation();
					setEnableText(false);
				}}
			/>
		</LabelInputContainer>
	);
}

export default LabelInput;
