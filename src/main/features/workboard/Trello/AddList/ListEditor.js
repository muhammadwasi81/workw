import React, { useEffect, useRef } from "react";
import { Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const useOutsideClick = (ref, callback) => {
	const handleClick = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	});
};
function ListEditor(props) {
	const ref = useRef();

	// const handleClick = e => {
	// 	const node = inputRef.current;

	// 	if (node.contains(e.target)) {
	// 		return;
	// 	}
	// 	props.onClickOutside();
	// };

	// useOutsideClick(ref, handleClick);

	const onEnter = e => {
		if (e.keyCode === 13) {
			e.preventDefault();
			props.saveList();
		}
	};

	const { title, handleChangeTitle, labels } = props;
	return (
		<div className="p-1 flex items-center gap-1" ref={ref}>
			<Input
				placeholder={labels.enterSectionTitle}
				className=""
				style={{
					boxShadow: "inset 0 0 0 2px #0079bf",
				}}
				value={title}
				onChange={handleChangeTitle}
				onKeyDown={onEnter}
				autoFocus
			/>
			{/* {deleteList && (
				<DeleteOutlined onClick={deleteList} className="text-base" />
			)} */}
		</div>
	);
}

export default ListEditor;
