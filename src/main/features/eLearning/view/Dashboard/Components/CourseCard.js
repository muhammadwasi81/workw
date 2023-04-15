import { Progress } from "antd";
import React from "react";
import { BsFileText } from "react-icons/bs";
import beginner from "../../../../../../content/NewContent/eLearning/beginer.svg";
import master from "../../../../../../content/NewContent/eLearning/master.svg";
import intermediate from "../../../../../../content/NewContent/eLearning/intermediate.svg";
import WhiteCard from "../../../UI/WhiteCard";
import BoxThumnail from "../UI/BoxThumnail";
import defaultImage from "../../../../../../content/NewContent/courses/courseDefault.jpg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../../utils/routes";

export const LevelsIcon = {
  1: <img src={beginner} alt="beginner" />,
  2: <img src={intermediate} alt="intermediate" />,
  3: <img src={master} alt="master" />,
};
export const tag = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advance",
};
function CourseCard({ data }) {
  const navigate = useNavigate();
  let { name, courseType, description, image, levelId } = data;

  return (
    <WhiteCard
      onClick={() => {
        navigate(`${ROUTES.ELearning.COURSE_DETAIL}/${data.id}`);
      }}
      className="cursor-pointer hover:shadow-lg transition-all"
    >
      <div className="flex flex-col gap-1">
        <BoxThumnail
          tag={tag[levelId]}
          level={LevelsIcon[levelId]}
          image={image === "" ? defaultImage : image}
          title={name}
          description={description}
        />
        <Progress
          percent={30}
          showInfo={false}
          strokeColor="var(--currentThemeColor)"
        />

        <div className="flex justify-between items-center font-semibold">
          <p className="!mb-0 flex items-center gap-1">
            <BsFileText className="!text-lg" /> 3/5 Lessons
          </p>
          <span>30%</span>
        </div>
      </div>
    </WhiteCard>
  );
}

export default CourseCard;
