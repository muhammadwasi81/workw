import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Scroll from "./infinteScoll";
import "./style.css";
export default function ScrollSelect() {
	const [input, setInput] = useState("");
	const [iconChangeOnClick, setIconChangeOnClick] = useState(false);
	const mainClass = "scroll_select";
	return (
		<div class="ant-col ant-form-item-control">
			<div class="ant-form-item-control-input">
				<div
					className={`${mainClass}_main ant-form-item-control-input-content`}
				>
					<div
						className={`${mainClass}_container ant-select ant-select-lg ant-select-single ant-select-show-arrow ant-select-show-search`}
					>
						<div
							className={`${mainClass}_input_container ant-select-selector`}
						>
							<span className="ant-select-selection-search">
								<input
									// name={props.name}
									type="text"
									className={`${mainClass}_input ant-select-selection-search-input`}
									onFocus={() => {
										setIconChangeOnClick(true);
									}}
									onBlur={() => {
										setIconChangeOnClick(false);
									}}
									onChange={e => {
										setInput(e.target.value);
									}}
								/>
							</span>
							<span
								className={`ant-select-selection-placeholder ${
									input.length > 0 && "placeholder_hidden"
								}`}
							>
								Search to Select
							</span>
							{!iconChangeOnClick ? (
								<DownOutlined className={`${mainClass}_icon`} />
							) : (
								<SearchOutlined
									className={`${mainClass}_icon`}
								/>
							)}
						</div>
						<div className={`${mainClass}_dropdown`}>
							{iconChangeOnClick && <Scroll />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
