import React from "react";
import "./style.css";
function FilePreview({ files, onDelete }) {
  console.log(files);
  const getFilePreview = (type, name) => {
    return name;
  };
  return (
    <div className="filerView">
      {files.map(({ type, name }, index) => {
        return (
          <div className="image" key={index}>
            <img src={getFilePreview(type, name)} alt="" />
          </div>
        );
      })}
    </div>
  );
}

export default FilePreview;
