import { Input } from "antd";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function TextAreaInput({
	name,
	placeholder,
	onChange,
	className,
	value,
	error,
	children,
	label,
	reset,
	rows,
	resize = false,
	...props
}) {
	const [state, setstate] = useState("");

	const handleChange = e => {
		setstate(e.target.value, e.target.name);
		onChange(e.target.value, e.target.name);
	};

	useEffect(() => {
		if (reset) {
			setstate("");
		}
	}, [reset]);
	return (
		<>
			<Input.TextArea
				id={name}
				prefix={
					props.prefix ? (
						<props.prefix
							style={{ color: "#bfbfbf", marginRight: "10px" }}
						/>
					) : (
						false
					)
				}
				rows={rows}
				name={name}
				placeholder={placeholder}
				onChange={handleChange}
				onKeyDown={props.onKeyDown}
				value={state}
				className={className}
				size={props.size}
				style={
					error
						? {
								border: "solid 1px red",
								borderRadius: "5px",
								resize: "none",
						  }
						: { borderRadius: "5px", resize: "none" }
				}
			/>
			{/* {error && <p>{error}</p>} */}
		</>
	);
}

export default TextAreaInput;
TextAreaInput.defaultProps = {
	type: "text",
	className: "",
};

TextAreaInput.propTypes = {
	name: PropTypes.string.isRequired,
	// type: PropTypes.string,
	placeholder: PropTypes.string.isRequired,
	className: PropTypes.string,
	value: PropTypes.any,
	onChange: PropTypes.func.isRequired,
	rows: PropTypes.number,
};
