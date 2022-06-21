import word from "../../../content/NewContent/File/word.svg";
import excel from "../../../content/NewContent/File/excel.svg";
import powerpoint from "../../../content/NewContent/File/PowerPoint.png";
import text from "../../../content/NewContent/File/text.svg";
import noPreview from "../../../content/NewContent/File/nopreview.png";
export const getFileExt = (file) => {
  const extention = file.name.split(".").slice(-1)[0];
  if (["svg", "png", "jpeg", "jpg", "gif"].includes(extention)) {
    return (window.URL || window.webkitURL).createObjectURL(file);
  } else if (extention === "doc") return word;
  else if (["xls", "xlsx"].includes(extention)) return excel;
  else if (["ppt", "pptx"].includes(extention)) return powerpoint;
  else if (extention === "txt") return text;
  else return noPreview;
};
