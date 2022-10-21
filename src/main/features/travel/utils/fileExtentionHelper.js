import word from "../../../../content/NewContent/File/word.svg";
import excel from "../../../../content/NewContent/File/excel.svg";
import powerpoint from "../../../../content/NewContent/File/PowerPoint.png";
import text from "../../../../content/NewContent/File/text.svg";
import noPreview from "../../../../content/NewContent/File/nopreview.png";
import pdf2 from "../../../../content/NewContent/Documents/file/pdf2.svg";

export const fileExtentionPreview = file => {
	const extention = file.split(".").slice(-1)[0];

	if (["svg", "png", "jpeg", "jpg", "gif"].includes(extention)) {
		return file;
		// return (window.URL || window.webkitURL).createObjectURL(file);
	} else if (file.split(":")[0] === "blob") return file;
	else if (["doc", "docx"].includes(extention)) return word;
	else if (["xls", "xlsx"].includes(extention)) return excel;
	else if (["ppt", "pptx"].includes(extention)) return powerpoint;
	else if (["pdf"].includes(extention)) return pdf2;
	// else if (["mp4", "avi", "mov"].includes(extention))
	// 	return <></>;
	else if (extention === "txt") return text;
	else return noPreview;
};
