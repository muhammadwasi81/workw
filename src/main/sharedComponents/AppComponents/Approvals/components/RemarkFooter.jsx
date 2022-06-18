import { Input } from "antd";
import React, { useState } from "react";
import Avatar from "../../../Avatar/avatarOLD";
import { SmileOutlined, PictureOutlined } from "@ant-design/icons";
import FilePreview from "../../../FilePreview";
function RemarkFooter() {
  const [files, setFiles] = useState([]);
  const handleFile = (e) => {
    setFiles((prevValue) => [...prevValue, ...e.target.files]);
  };
  const handleDelete = (deleteFile) => {
    const allFiles = files.filter((file) => file.name !== deleteFile);
    setFiles(allFiles);
  };
  return (
    <div className="remarkFooter">
      <div className="remarkFooter__top">
        <div className="left">
          <Avatar size={40} round width={"30px"} height={"30px"} />
        </div>
        <div className="right">
          <FilePreview files={files} onDelete={handleDelete} />
          <div className="input">
            <Input placeholder="Write Your Remarks Here ..." />
            <SmileOutlined />
            <label htmlFor="imageUpload">
              <PictureOutlined />
            </label>
            <input
              type="file"
              id="imageUpload"
              style={{ display: "none" }}
              onChange={(e) => handleFile(e)}
            />
          </div>
        </div>
      </div>
      <div className="remarkFooter__bottom">
        <div className="left"></div>
        <div className="right">
          <ul className="list">
            <div className="list__item">In Process</div>
            <div className="list__item">Approve</div>
            <div className="list__item">Decline</div>
            <div className="list__item">Hold</div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RemarkFooter;
