import React from "react";
// import DragHandleIcon from '@material-ui/icons/DragHandle';
import { HolderOutlined, CloseSquareOutlined } from "@ant-design/icons";
import SingleUpload from "../../../../../../sharedComponents/Upload/singleUpload";

const Radio = (props) => {
  const {
    question,
    handleRadioChange,
    index,
    disableSubmit,
    handleChange,
    removeQuestion,
    handleQuestionImageChange,
    handleOptionsChange,
    handleOptionImageChange,
  } = props;
  const { answers } = question;

  console.log("radio", props);

  return (
    <>
      <div className="c-row txt-fields bg-clr p_15 d-flex">
        {/* img here */}
        <div className="flex-1">
          {question.image ? (
            // <div className="QuesImg">
            //   <img src={question.image} />{" "}
            // </div>
            <SingleUpload
              handleImageUpload={(info) => handleQuestionImageChange(info)}
              img="Add Image"
              position="flex-start"
              uploadText={"Upload"}
              url={
                question
                  ? question.image
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
          {/* <h1 className="row-tlt">{question.question}</h1> */}
          <div className="flex">
            <input
              className="required label w-full"
              defaultValue={question.question}
              onChange={handleChange}
            />
            <div onClick={() => removeQuestion(index)}>
              <CloseSquareOutlined style={{ fontSize: "150%" }} />
            </div>
          </div>

          <div className="flex-row">
            {answers.map(({ answer, id, image }, i) => (
              <div className="aspect-ratio">
                <label key={i} className="label-box">
                  {/* <img
                    src={
                      image
                        ? image
                        : "https://asvs.in/wp-content/uploads/2017/08/dummy.png"
                    }
                    // src={{typeof image === 'string' ? image : getBase64(image, (result)=>  result)}}
                    alt=""
                  /> */}
                  <SingleUpload
                    handleImageUpload={(info) =>
                      handleOptionImageChange(info, i)
                    }
                    img="Add Image"
                    position="flex-start"
                    uploadText={"Upload"}
                    url={
                      image
                        ? image
                        : "https://asvs.in/wp-content/uploads/2017/08/dummy.png"
                    }
                  />
                  <div className="flex-item mt_10">
                    <input
                      value={id}
                      onChange={(e) =>
                        handleChange(
                          e.target.value,
                          index,
                          question.id,
                          question.localType
                        )
                      }
                      name="label"
                      type="radio"
                      // disabled={disableSubmit}
                      disabled={true}
                    />{" "}
                    {/* <h3 className="ml_10 f-bold">{answer}</h3> */}
                    <input
                      className="ml_10 f-bold"
                      defaultValue={answer}
                      onChange={(e) => handleOptionsChange(e, i)}
                    />
                  </div>
                </label>
              </div>
            ))}
          </div>
          {/* <div className="flex-end">
            <button className="clr-sec">Clear Section</button>
          </div> */}
        </div>
        <div className="dragIcon">{/* <DragHandleIcon /> */}</div>
      </div>
    </>
  );
};

export default Radio;
