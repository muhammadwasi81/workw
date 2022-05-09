import { CloseOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar/avatar'
import Select from "../Select/Select"
function MemberDisplayBox({data,height,width}) {
        const [state, setstate] = useState(data)
    useEffect(() => {
        setstate(data)
    }, [data])
    return (
        <div className="member-display-container" style={{height:height?height:"300px",width:width}}>

       { data? data.map(x=>(
             <div className="member-box">
            
             <div className="member-box-avatar">
             <Avatar height={35} width={35} round={true} name={x.name?x.name:""}/>
             <div className="userdetail">
                 <Typography >
                { x.name?x.name:"Developer"}
                 </Typography>
                 <span>
                { x.designation?x.designation:"Designation"}
                 </span>
             </div>
                 
             </div>

             <div className="department">
               <Select style={{width:"100%"}} placeholder="Department"/>
                 
             </div>
             <CloseOutlined />


         </div>
        )):"NO DATA"
        
        }
       

    </div>
    )
}

export default MemberDisplayBox
