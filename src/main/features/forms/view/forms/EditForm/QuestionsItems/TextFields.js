import React, { useState } from "react";
// import DragHandleIcon from '@material-ui/icons/DragHandle';
import { HolderOutlined, CloseSquareOutlined } from "@ant-design/icons";
import SingleUpload from "../../../../../../sharedComponents/Upload/singleUpload";

const TextFields = (props) => {
  const {
    type,
    fieldData,
    handleChange,
    index,
    removeQuestion,
    handleQuestionImageChange,
  } = props;
  const [isImage, setIsImage] = useState(false);
  console.log("console textfields", props);
  return (
    <>
      <div className="c-row txt-fields bg-clr p_15 flex">
        <div className="flex-1">
          <div>
            {fieldData.image ? (
              // <div className="QuesImg" style={{ width: "50px" }}>
              //   <img src={fieldData.image} />{" "}
              // </div>
              <SingleUpload
                handleImageUpload={(info) => handleQuestionImageChange(info)}
                img="Add Image"
                position="flex-start"
                uploadText={"Upload"}
                url={
                  fieldData
                    ? fieldData.image
                    : "https://asvs.in/wp-content/uploads/2017/08/dummy.png"
                }
              />
            ) : (
              <SingleUpload
                handleImageUpload={(info) => handleQuestionImageChange(info)}
                img="Add Image"
                position="flex-start"
                uploadText={"Upload"}
              />
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

        {/* <div></div> */}

        <div
          className="dragIcon"
          style={{ justifyContent: "space-between", flexDirection: "column" }}
        >
          <div onClick={() => removeQuestion(index)}>
            <CloseSquareOutlined style={{ fontSize: "150%" }} />
          </div>
          <HolderOutlined />
        </div>
      </div>
    </>
  );
};

export default TextFields;
