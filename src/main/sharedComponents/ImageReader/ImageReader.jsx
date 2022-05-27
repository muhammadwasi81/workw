import React, { useEffect } from "react";
import "./ImageReader.css";
import { RiCloseFill } from "react-icons/ri";

const ImageReader = (props) => {
  const { file, removeFile, showButton = true } = props;

  const [preview, setPreview] = React.useState("");
  const [fileType, setFileType] = React.useState("");

  useEffect(() => {
    // let checkType = file.type.split("/")[0];
    // setFileType(checkType);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setPreview(reader.result);
      };
    }
    // if (checkType === "application") {
    //   setPreview("https://konnect.im/static/media/pdf.ca264987.svg");
    // }
  }, [file]);

  return (
    <>
      {file && (
        <div className="file-reader">
          {showButton && (
            <button className="remove-file" type="button" onClick={removeFile}>
              <RiCloseFill />
            </button>
          )}
          <div className="image-wrapper">
            <img src={preview} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageReader;
