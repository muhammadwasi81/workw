import { Tag } from "antd";

export const TagRender = ({ props }) => {
	console.log("props", props);
	const { value, closable, onClose } = props;

	const onPreventMouseDown = event => {
		event.preventDefault();
		event.stopPropagation();
	};

	return (
		<Tag
			className="!mr-1 !flex !items-center !px-2 !py-1 !text-sm"
			onMouseDown={onPreventMouseDown}
			closable={closable}
			onClose={onClose}
		>
			{value}
		</Tag>
	);
};
