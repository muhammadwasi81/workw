import { Divider, Rate } from "antd";
import React from "react";

const QuestionList = ({ questions }) => {
  return (
    <>
      <div className="inputBox mt-4">
        {questions &&
          questions.map((item) => {
            return (
              <>
                <div className="flex justify-between items-center mt-4">
                  <span className="max-w-[35rem]">{item.question}</span>
                  <Rate disabled defaultValue={item.ratingAssign} />
                </div>
                <Divider />
              </>
            );
          })}
      </div>
    </>
  );
};

export default QuestionList;
