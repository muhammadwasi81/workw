import { Image, Tag } from "antd";
import React, { useContext } from "react";
import { SingleItem } from "../../../../sharedComponents/Card/CardStyle";
import "../styles/style.css";


function ShortDetailCard(props) {

  return (
    <>
      <SingleItem>
        <div className="careersDetailCard" >
          <div className="cardLabel" >
            Job Details
          </div>

          <div className="careersSections">
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
              <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
              <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
              <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
              <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
              <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
              <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
              <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
              <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
            <div className="">
              <div className="text-[15px] font-bold text-[grey]">Salary For</div>
              <div className="text-[18px] font-bold">{"user.name"}</div>
            </div>
          </div>
        </div>
      </SingleItem>
    </>
  );
}

export default ShortDetailCard;
