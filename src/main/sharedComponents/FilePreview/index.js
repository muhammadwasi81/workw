import React from "react";
import "./style.css";
import { DeleteOutlined } from "@ant-design/icons";
import { getFileExt } from "./helper";
import Attachments from "../../features/travel/view/UI/Attachments";

function FilePreview({ files, onDelete }) {
  console.log(files, "files");
  return (
    <div className="filerView">
      {files.map((file, index) => {
        return (
          <div className="image" key={index}>
            <img src={getFileExt(file)} alt="" />
            <div className="overlay">
              <DeleteOutlined
                onClick={() => {
                  onDelete(index);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FilePreview;
