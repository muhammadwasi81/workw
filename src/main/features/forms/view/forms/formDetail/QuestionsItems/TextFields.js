import React, { useState } from "react";
// import DragHandleIcon from '@material-ui/icons/DragHandle';
import { HolderOutlined, CloseSquareOutlined } from "@ant-design/icons";

const TextFields = (props) => {
  const { type, fieldData, handleChange, index, removeQuestion } = props;
  const [isImage, setIsImage] = useState(false);
  // console.log(fieldData);
  return (
    <>
      <div className="c-row txt-fields bg-clr p_15 flex">
        <div className="flex-1">
          <div>
            {fieldData.image.file && (
              <div className="QuesImg" style={{ width: "50px" }}>
                <img
                  src={(window.URL || window.webkitURL).createObjectURL(
                    fieldData?.image?.file
                  )}
                />{" "}
              </div>
            )}
            {/* <input
              className="required label w-full"
              defaultValue={fieldData.question}
            /> */}
            <label className="required label" htmlFor="">
              {fieldData.question}
            </label>
          </div>
          <input
            disabled={true}
            className="styled-input"
            type={type}
            placeholder="Type here..."
          />
        </div>
      </div>
    </>
  );
};

export default TextFields;
