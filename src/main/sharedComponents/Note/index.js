import React from "react";
import { BsThreeDots } from "react-icons/bs";
import * as S from "./Note.style.js";
const Note = () => {
	return (
		<>
			<S.NoteHead>
				Note
				<BsThreeDots />
			</S.NoteHead>
			<S.Textarea placeholder="Write Here" />
		</>
	);
};

export default Note;
