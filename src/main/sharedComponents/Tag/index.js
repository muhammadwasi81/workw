import React from 'react'
import { Tag } from 'antd'
import "./style.css"

const Index = ({status}) => {
  return (
    <>
        <Tag 
            className={
                        status === 2  ? "statusTag approved" : 
                        status === 3 ? "statusTag Cancel" :
                        status === 7 ? "statusTag Cancel" :
                        "statusTag inProcess"
                    } 
        >
        {
            status === 1 ? "In Process" : 
            status === 2 ? "Approved" :
            status === 3 ? "Declined" :
            status === 4 ? "Resend" :
            status === 5 ? "In Active" :
            status === 6 ? "Not Required" :
            status === 7 ? "Cancelled" : ""  
        }
        </Tag>
    </>
  )
}

export default Index