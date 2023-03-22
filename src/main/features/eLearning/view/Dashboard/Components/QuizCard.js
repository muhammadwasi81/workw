import React from "react";
import WhiteCard from "../../../UI/WhiteCard";
import BoxThumnail from "../UI/BoxThumnail";
import { BsFileText } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import moment from "moment";
function QuizCard({ item }) {
  console.log(item);
  const { name, description, questions, validTill, id } = item;
  const navigate = useNavigate();
  console.log(moment().isSameOrBefore(validTill));
  console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
  let dateNow = moment().format("YYYY-MM-DD");
  let newValidDate = moment(validTill).format("YYYY-MM-DD ");
  return (
    <WhiteCard
      onClick={() => {
        navigate(`quiz/${id}`, { state: { data: item } });
      }}
      className="cursor-pointer hover:shadow-lg transition-all relative overflow-hidden"
    >
      {/** validity render */}
      {moment(dateNow).isSameOrBefore(newValidDate) === true ? (
        <div className="absolute top-0 right-0 bg-[#008844] text-white font-semibold rounded-bl-lg p-2 z-50">
          Valid
        </div>
      ) : (
        <div className="absolute top-0 right-0  bg-[#D40413] text-white font-semibold rounded-bl-lg p-2 z-50">
          Expired
        </div>
      )}

      <div className="flex flex-col gap-1">
        <BoxThumnail
          image={
            "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80"
          }
          title={name}
          description={description}
        />
      </div>
      {/* <p className="!mb-0 flex items-center gap-1 font-semibold">
        <BsFileText className="!text-lg" /> Questions: {questions.length}
      </p> */}
    </WhiteCard>
  );
}

export default QuizCard;
