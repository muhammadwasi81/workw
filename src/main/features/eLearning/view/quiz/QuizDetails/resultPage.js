import React, { useEffect } from "react";
import { Radio, Skeleton, Space } from "antd";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { GetQuizResult } from "../../../store/action";
import { useSelector } from "react-redux";

const ResultPage = ({ id }) => {
  console.log(id, "result page");
  const dispatch = useDispatch();
  const { loaders, quizResult } = useSelector((state) => state.eLearningSlice);

  const { name, quizResultQuestions } = quizResult;

  console.log(quizResult, "quiz result");
  console.log(loaders.getQuizResultLoader, "loader");
  useEffect(() => {
    console.log("useEffect works");
    dispatch(GetQuizResult(id));
  }, []);

  if (loaders.getQuizResultLoader || quizResult.length === 0) {
    return (
      <Skeleton
        active
        paragraph={{
          rows: 20,
        }}
      />
    );
  }

  const getQuestionResultFunction = (options, yourAnswer) => {
    console.log(options, yourAnswer);
    // const result = options.find((el)=>console.log(el))
    let output = (
      <>
        <AiFillCloseCircle color="#DF0000" /> Wrong
      </>
    );
    options.forEach((el) => {
      if (el.id === yourAnswer) {
        if (el.isTrue === true) {
          output = (
            <>
              <AiFillCheckCircle color="#008844" /> Correct
            </>
          );
        }
      }
    });
    return output;
  };
  //TODO: use selector loader and dispatch action on mount
  return (
    <div className="bg-white rounded-lg shadow-md min-h-screen h-fit">
      <div className="bg-[#EDEFF0] h-[6rem] rounded-t-[0.5rem] flex flex-col justify-center pl-[2rem] font-black">
        <span className="text-xl flex items-center gap-x-[0.3rem] ">
          <AiFillCheckCircle color="#008844" /> Your Result!{" "}
        </span>
        {/* <span className="text-lg">
          Grade Received <span className="text-[#008844]">100%</span>
        </span> */}
      </div>
      {quizResultQuestions.map((item, index) => {
        return (
          <div className="flex flex-col mt-[1rem] ml-[1rem]">
            <span>
              {index + 1}. {item.question}
            </span>
            <div className="mt-[1rem] ml-[1rem]">
              <Radio.Group value={item.yourAnswered}>
                <Space direction="vertical">
                  {item.resultQuestionAnswers.map((answers) => {
                    return <Radio value={answers.id}>{answers.answer}</Radio>;
                  })}
                </Space>
              </Radio.Group>
              <div className="h-[4rem] bg-[#EDEFF0] w-[70%] mt-[1rem] flex flex-col justify-center pl-[1rem]">
                <span className="text-sm flex items-center gap-x-[0.3rem] text-[#008844]">
                  {getQuestionResultFunction(
                    item.resultQuestionAnswers,
                    item.yourAnswered
                  )}
                </span>
                {/**show correct answer here */}
                <span className="text-sm">
                  {item.resultQuestionAnswers.map((ans, ansIndex) => {
                    if (ans.isTrue) {
                      return ans.answer;
                    }
                  })}
                  {/* work closely with a supervisor to learn more about a job or
                  industry */}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  // return (
  //   <div className="bg-white rounded-lg shadow-md min-h-screen h-fit">
  //     <div className="bg-[#EDEFF0] h-[6rem] rounded-t-[0.5rem] flex flex-col justify-center pl-[2rem] font-black">
  //       <span className="text-xl flex items-center gap-x-[0.3rem] ">
  //         <AiFillCheckCircle color="#008844" /> Congratulations! You Passed{" "}
  //       </span>
  //       <span className="text-lg">
  //         Grade Received <span className="text-[#008844]">100%</span>
  //       </span>
  //     </div>
  //     {/**mcqs UI will be map accordingly */}
  //     <div className="flex flex-col mt-[1rem] ml-[1rem]">
  //       <span>
  //         1. Fill in the blank: Designers that work as freelancers can expect to
  //         _____
  //       </span>
  //       <div className="mt-[1rem] ml-[1rem]">
  //         <Radio.Group value={1}>
  //           <Space direction="vertical">
  //             <Radio value={1}>
  //               work closely with a supervisor to learn more about a job or
  //               industry
  //             </Radio>
  //             <Radio value={2}>
  //               market their services to businesses to find customers
  //             </Radio>
  //             <Radio value={3}>
  //               receive on-the-job training from an experienced professional
  //             </Radio>
  //             <Radio value={4}>
  //               find short-term jobs with limited responsibility
  //             </Radio>
  //           </Space>
  //         </Radio.Group>
  //         <div className="h-[4rem] bg-[#EDEFF0] w-[70%] mt-[1rem] flex flex-col justify-center pl-[1rem]">
  //           <span className="text-sm flex items-center gap-x-[0.3rem] text-[#008844]">
  //             <AiFillCheckCircle color="#008844" /> Wrong{" "}
  //           </span>
  //           <span className="text-sm">
  //             work closely with a supervisor to learn more about a job or
  //             industry
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="flex flex-col mt-[1rem] ml-[1rem]">
  //       <span>
  //         2. Fill in the blank: Designers that work as freelancers can expect to
  //         _____
  //       </span>
  //       <div className="mt-[1rem] ml-[1rem]">
  //         <Radio.Group value={1}>
  //           <Space direction="vertical">
  //             <Radio value={1}>
  //               work closely with a supervisor to learn more about a job or
  //               industry
  //             </Radio>
  //             <Radio value={2}>
  //               market their services to businesses to find customers
  //             </Radio>
  //             <Radio value={3}>
  //               receive on-the-job training from an experienced professional
  //             </Radio>
  //             <Radio value={4}>
  //               find short-term jobs with limited responsibility
  //             </Radio>
  //           </Space>
  //         </Radio.Group>
  //         <div className="h-[4rem] bg-[#EDEFF0] w-[70%] mt-[1rem] flex flex-col justify-center pl-[1rem]">
  //           <span className="text-sm flex items-center gap-x-[0.3rem] text-[#DF0000]">
  //             <AiFillCloseCircle color="#DF0000" /> Correct{" "}
  //           </span>
  //           <span className="text-sm">
  //             work closely with a supervisor to learn more about a job or
  //             industry
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="flex flex-col mt-[1rem] ml-[1rem]">
  //       <span>
  //         3. Fill in the blank: Designers that work as freelancers can expect to
  //         _____
  //       </span>
  //       <div className="mt-[1rem] ml-[1rem]">
  //         <Radio.Group value={1}>
  //           <Space direction="vertical">
  //             <Radio value={1}>
  //               work closely with a supervisor to learn more about a job or
  //               industry
  //             </Radio>
  //             <Radio value={2}>
  //               market their services to businesses to find customers
  //             </Radio>
  //             <Radio value={3}>
  //               receive on-the-job training from an experienced professional
  //             </Radio>
  //             <Radio value={4}>
  //               find short-term jobs with limited responsibility
  //             </Radio>
  //           </Space>
  //         </Radio.Group>
  //         <div className="h-[4rem] bg-[#EDEFF0] w-[70%] mt-[1rem] flex flex-col justify-center pl-[1rem]">
  //           <span className="text-sm flex items-center gap-x-[0.3rem] text-[#008844]">
  //             <AiFillCheckCircle color="#008844" /> Wrong{" "}
  //           </span>
  //           <span className="text-sm">
  //             work closely with a supervisor to learn more about a job or
  //             industry
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ResultPage;
