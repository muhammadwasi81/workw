import React from "react";
// import DragHandleIcon from '@material-ui/icons/DragHandle';
import { CloseSquareOutlined } from "@ant-design/icons";

const RadioWithImage = (props) => {
  const {
    question,
    handleChange,
    index,
    disableSubmit,
    removeQuestion,
  } = props;
  const { answers } = question;
  console.log("props radio with immage", props);

  return (
    <>
      <div className="c-row txt-fields bg-clr p_15 d-flex">
        <div className="flex-1">
          {question.image.file && (
            <div className="QuesImg">
              <img
                src={(window.URL || window.webkitURL).createObjectURL(
                  question?.image.file
                )}
              />{" "}
            </div>
          )}
          <div className="flex" style={{ justifyContent: "space-between" }}>
            <h1 className="row-tlt">{question.question}</h1>
            <div onClick={() => removeQuestion(index)}>
              <CloseSquareOutlined style={{ fontSize: "150%" }} />
            </div>
          </div>

          <div className="flex-row">
            {answers.map(({ answer, id, image }, i) => (
              <div className="aspect-ratio">
                <label key={i} className="label-box">
                  <img
                    src={
                      image.file
                        ? (window.URL || window.webkitURL).createObjectURL(
                            image.file
                          )
                        : "https://asvs.in/wp-content/uploads/2017/08/dummy.png"
                    }
                    // src={{typeof image === 'string' ? image : getBase64(image, (result)=>  result)}}
                    alt=""
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
                      disabled={disableSubmit}
                    />{" "}
                    <h3 className="ml_10 f-bold">{answer}</h3>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RadioWithImage;
