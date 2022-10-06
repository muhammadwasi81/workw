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
  } = props;
  const { answers } = question;

  console.log("radio", props);

  return (
    <>
      <div className="c-row txt-fields bg-clr p_15 d-flex">
        {/* img here */}
        <div className="flex-1">
          {question.image && (
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
          )}
          {/* <h1 className="row-tlt">{question.question}</h1> */}
          <div className="flex">
            <input
              className="required label w-full"
              defaultValue={question.question}
              onChange={handleChange}
            />
            <button onClick={() => removeQuestion(index)}>
              <CloseSquareOutlined style={{ fontSize: "150%" }} />
            </button>
          </div>

          {answers.map(({ answer, id }, i) => (
            <div key={i} className="radio-wrapper mb_10">
              <label htmlFor="">
                <input
                  onChange={(e) =>
                    handleRadioChange(
                      e.target.value,
                      index,
                      question.id,
                      question.localType
                    )
                  }
                  className="styled-radio mr_10"
                  type="radio"
                  name="radio"
                  id="radio1"
                  value={id}
                  disabled={disableSubmit}
                />
                {/* <h3 className="f-bold">{answer}</h3> */}
                <input
                  className="required label w-full"
                  defaultValue={answer}
                  onChange={(e) => handleOptionsChange(e, i)}
                />
              </label>
            </div>
          ))}
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
