import React, { useState } from "react";
// import DragHandleIcon from '@material-ui/icons/DragHandle';
import { HolderOutlined } from "@ant-design/icons";

const TextFields = (props) => {
  const { type, fieldData, handleChange, index } = props;
  const [isImage, setIsImage] = useState(false);
  return (
    <>
      <div className="c-row txt-fields bg-clr p_15 flex">
        <div className="flex-1">
          <div>
            {fieldData.image && (
              <div className="QuesImg" style={{ width: "50px" }}>
                <img src={fieldData.image} />{" "}
              </div>
            )}
            <input
              className="required label w-full"
              defaultValue={fieldData.question}
              onChange={handleChange}
            />
          </div>
          <input
            disabled={true}
            className="styled-input"
            type={type}
            placeholder="Type here..."
            onChange={handleChange}
          />
        </div>

        <div>
          <button>Question Type</button>
        </div>

        <div className="dragIcon">
          <HolderOutlined />
        </div>
      </div>
    </>
  );
};

export default TextFields;
