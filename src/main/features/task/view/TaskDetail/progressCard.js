import { Checkbox, Divider, Progress } from "antd";
import React, { useState } from "react";
import SublineDesigWithTime from "../../../../../components/SharedComponent/UserShortInfo/SubLine/DesigWithTime";
import UserInfo from "../../../../../components/SharedComponent/UserShortInfo/UserInfo";
import arrowIcon from "../../../../../content/NewContent/Task/svg/arrowGrey.svg";

const ProgressCard = () => {
    const [openDetail, setOpenDetail] = useState(true)
return(
    <div className="progressCard" >
        <div >
            <div style={{display:"flex", justifyContent:"space-between"}}>
         <UserInfo
            avatarSrc="https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
            name="Abu Bakar"
            Subline={<SublineDesigWithTime designation="ReactJs Developer" />}
          />
          <div className="taskProgressArrow" onClick={()=>setOpenDetail(!openDetail)} >
              <img alt="" src={arrowIcon}/>
          </div>
          </div>
           <Progress className="task-rigth-progress" strokeColor="#1b5669" percent={80} />
           </div>
           <div style={{display:openDetail ? "unset" : "none"}} >
           <Divider />
           <div>
           <Checkbox className="progress-checkbox" checked onChange={()=>{}}>Design a Task Page and inners of Tasks</Checkbox>
           <Checkbox className="progress-checkbox" checked onChange={()=>{}}>Design a Task Page and inners of Tasks</Checkbox>
           <Checkbox className="progress-checkbox" checked onChange={()=>{}}>Design a Task Page and inners of Tasks</Checkbox>
           <Checkbox className="progress-checkbox" checked onChange={()=>{}}>Design a Task Page and inners of Tasks</Checkbox>
           <Checkbox className="progress-checkbox" checked onChange={()=>{}}>Design a Task Page and inners of Tasks</Checkbox>
           <Checkbox className="progress-checkbox" checked onChange={()=>{}}>Design a Task Page and inners of Tasks</Checkbox>
           <Checkbox className="progress-checkbox" onChange={()=>{}}>Design a Task Page and inners of Tasks</Checkbox>
           <Checkbox className="progress-checkbox" onChange={()=>{}}>Design a Task Page and inners of Tasks</Checkbox>
           <Checkbox className="progress-checkbox" onChange={()=>{}}>Design a Task Page and inners of Tasks</Checkbox>
           </div>
           </div>
    </div>
)
}
export default ProgressCard