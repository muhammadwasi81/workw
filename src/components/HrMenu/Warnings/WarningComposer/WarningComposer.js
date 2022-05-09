import { Button, Checkbox, DatePicker, Input, Typography } from "antd";
import React, { useState } from "react";
import TextInput from "../../../SharedComponent/Input/TextInput";
// import SuggestionBox from '../../../SharedComponent/searchSelect/SuggestionBox';
import { warningCategoryData } from "./WarningCategories";
import "./composer.css";
function WarningComposer() {
	const [items] = useState(warningCategoryData);

	const { TextArea } = Input;
	const { RangePicker } = DatePicker;
	const options = [
		{ label: "Hotel Required", value: "Apple" },
		{ label: "TADA Application", value: "Pear" },
	];
	const [selected, setSelected] = useState([]);
	const [position, setPosition] = useState(0);

	const isItemSelected = id => !!selected.find(el => el === id);

	const handleClick =
		id =>
		({ getItemById, scrollToItem }) => {
			console.log(id);
			const itemSelected = isItemSelected(id);

			setSelected(currentSelected =>
				itemSelected
					? currentSelected.filter(el => el !== id)
					: currentSelected.concat(id)
			);
		};
	return (
		<form className="travel-composer">
			<div className="input-row">
				<Typography level={5}>Subject</Typography>
				<TextInput placeholder="Enter Group Name..." />
			</div>

			<div className="input-row">
				<Typography level={5}>Description</Typography>
				<TextArea
					style={{ borderRadius: "5px" }}
					placeholder="Enter Description"
					rows={4}
				/>
			</div>
			<div className="input-row">
				<Typography level={5}>Predecessor</Typography>
				{/* <SuggestionBox/> */}
			</div>
			<div className="input-row">
				<Typography level={5}>Agent</Typography>
				<TextInput placeholder="Enter Group Name..." />
			</div>
			<div className="input-row">
				<Typography level={5}>Reason</Typography>
				<TextInput placeholder="Enter Group Name..." />
			</div>
			<div className="input-row">
				<Typography level={5}>Travel</Typography>
				<TextInput placeholder="Enter Group Name..." />
			</div>

			<div className="input-row">
				<Typography level={5}>Task Subject</Typography>
				<RangePicker showTime />
			</div>

			<div className="task-checkbox-container">
				<Typography level={5}>Hotel & TADA</Typography>

				<Checkbox.Group
					options={options}
					defaultValue={["Apple"]}
					//   onChange={onChange}
				/>
			</div>

			<Typography level={5}>Travel By</Typography>
			<div className="travel-type">
				{items.map(({ id, name, image }) => (
					<Card
						itemId={id} // NOTE: itemId is required for track items
						title={name}
						image={image}
						key={id}
						onClick={handleClick(id)}
						selected={isItemSelected(id)}
					/>
				))}
			</div>

			<div className="input-row">
				<Typography level={5}>Special Request</Typography>
				<TextArea
					style={{ borderRadius: "5px" }}
					placeholder="Enter Description"
					rows={4}
				/>
			</div>

			<Button
				type="primary"
				style={{ fontWeight: "bold", marginTop: "10px" }}
				block
			>
				Create Task
			</Button>
		</form>
	);
}

export default WarningComposer;

function Card({ onClick, selected, title, itemId, image }) {
	// const visibility = React.useContext(VisibilityContext);

	return (
		<div onClick={onClick} className="expense-tag" tabIndex={0}>
			<img src={image} alt="" />
			<span>{title}</span>
		</div>
	);
}
