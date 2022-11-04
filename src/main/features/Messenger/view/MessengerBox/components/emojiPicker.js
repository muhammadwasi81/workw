import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import { useEffect, useRef } from "react";

function EmojiPicker({ onSelect, position: { left, bottom } = {} }) {
	const ref = useRef();
	useEffect(() => {
		new Picker({ data, ref, onEmojiSelect: onSelect });
	}, []);

	return <div className="emojiCont" style={{ left, bottom }} ref={ref} />;
}
export default EmojiPicker;

