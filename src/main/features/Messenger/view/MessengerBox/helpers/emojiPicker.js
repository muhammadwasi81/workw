import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import { useEffect, useRef } from "react";

function EmojiPicker(props) {
	const ref = useRef();
	useEffect(() => {
		new Picker({ data, ref, onEmojiSelect: props.onSelect });
	}, []);

	return <div className="emojiCont" ref={ref} />;
}
export default EmojiPicker;
