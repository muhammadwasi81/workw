import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";

function DescriptionInput(props) {
	const [showDesc, setShowDesc] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		if (showDesc) {
			inputRef.current.focus({
				cursor: "start",
			});
		}
	}, [showDesc]);
	return (
		<>
			{!showDesc ? (
				<div
					className="bg-neutral-100 rounded-sm w-full p-2 h-20 cursor-pointer hover:bg-neutral-200 text-gray-500"
					onClick={() => {
						setShowDesc(true);
					}}
				>
					Add more detailed description...
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<div className="bg-neutral-100 rounded-sm w-full">
						<TextArea
							className="!outline-none !bg-transparent !p-2 !rounded-sm  placeholder:!text-gray-500 placeholder:!font-bold resize-none"
							placeholder="Add more detailed description..."
							rows={4}
							ref={inputRef}
						/>
					</div>
					<div className="flex gap-2">
						<Button className="ThemeBtn">Save</Button>
						<Button
							type="text"
							className=""
							onClick={() => {
								setShowDesc(false);
							}}
						>
							Cancel
						</Button>
					</div>
				</div>
			)}
		</>
	);
}

export default DescriptionInput;
