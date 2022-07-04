import React from "react";

function Colors({ colorPicker }) {
	const colors = [
		"#d0ebfd",
		"#d9f4d9",
		"#f1d3d9",
		"#fbfbe8",
		"#f1f1f1",
		"#ffffff",
		"#fffaf3",
	];
	return (
		<div className="flex w-72 h-10">
			{colors.map(color => (
				<div
					className="flex"
					style={{ backgroundColor: color, width: "100%" }}
					id={color}
					onClick={e => {
						colorPicker(e.target.id);
					}}
				/>
			))}
		</div>
	);
}

export default Colors;
