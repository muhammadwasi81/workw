import React from "react";
import { Card } from 'antd';
import "antd/dist/antd.css";
import Draggable from "react-draggable";
import { DeleteOutlined } from "@ant-design/icons";


const CustomCard=({title,cardContent})=>{
    return(<>
      <Card
      size="small"
      title={title}
      hoverable
      extra={<DeleteOutlined />}
      style={{
        width: 300,
        megin:"10px",
      }}
    >
      <p>{cardContent}</p>
    </Card>
    </>)
}
export default CustomCard;