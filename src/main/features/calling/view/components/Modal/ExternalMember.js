import React, { useState } from "react";
import { Avatar, Input } from "antd";
import { validateEmail } from "../../../../../../utils/Shared/helper/validateEmail";
import { getNameForImage } from "../../../../../../utils/base";
import { CloseCircleOutlined } from "@ant-design/icons";

function ExternalMember({
	handleExternalMember,
	externalMembers,
	deleteExternalMembers,
}) {
	const [value, setValue] = useState("");
	const [hasError, setHasError] = useState("");
	const [isEmailExisted, setIsEmailExisted] = useState(false);
	const handleEmailChange = e => {
		setValue(e.target.value);
	};
	const handleEnter = e => {
		if (!validateEmail(value)) {
			setHasError("error");
			setIsEmailExisted(false);
		} else {
			if (externalMembers.find(member => member === value)) {
				setIsEmailExisted(true);
				setHasError("error");
			} else {
				setIsEmailExisted(false);
				handleExternalMember(value);
				setHasError("");
				setValue("");
			}
		}
	};
	return (
		<>
			<Input
				size="large"
				type={"email"}
				value={value}
				onChange={handleEmailChange}
				placeholder="Enter email"
				onPressEnter={handleEnter}
				status={hasError}
			/>
			{hasError && isEmailExisted ? (
				<div style={{ color: "red" }}>Email already existed.</div>
			) : (
				hasError && (
					<div style={{ color: "red" }}>
						Please enter valid email.
					</div>
				)
			)}
			{/* <hr /> */}
			{externalMembers.map((member, index) => (
				<div
					className="flex items-center justify-between border-b py-3 border-b-neutral-300"
					key={index}
				>
					<div className="flex gap-3 items-center">
						<Avatar className=" cursor-pointer" src={""}>
							{getNameForImage(member)}
						</Avatar>
						<p className="!m-0">{member}</p>
					</div>
					<CloseCircleOutlined
						className="!text-red-400 hover:!text-red-600  !border-red-400 hover:!border-red-600 !text-xl cursor-pointer transition"
						onClick={() => {
							deleteExternalMembers(member);
						}}
					/>
				</div>
			))}
		</>
	);
}

export default ExternalMember;
