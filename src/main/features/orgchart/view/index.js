import React, { useState } from 'react';
import { Avatar, Space } from 'antd';
import { Tree, TreeNode } from 'react-organizational-chart';
import { UserOutlined,DownOutlined,UpOutlined} from '@ant-design/icons';

import styled from "styled-components";

import "./style.css";
import TreeNodes from "./Tree";
import {EmployeeData}  from "./EmployeeData";

function Node() {

  const StyledNode = styled.div`
  display: ${ <Avatar size="large" icon={<UserOutlined />}/>};
  
`;
  const [data,setData] = useState([EmployeeData]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [childcollapse,setchildCollapse] = React.useState(false);
  console.log("dataaaaa",data);

  const handleCollapse = () => {
    setCollapsed(true);
  };
  const handleClose = () =>{
    setCollapsed(false);
  }

  const handlechildcollapse = ()=>{
    setchildCollapse(true);
  }
  const handlechildcollapseclose = ()=>{
    setchildCollapse(false);
  }
  return(
   <>
    <div className='expand'>
      <Avatar size="large" icon={<UserOutlined />}/>
       Miletap
       {collapsed? <UpOutlined onClick={handleClose} />:
          <DownOutlined onClick={handleCollapse}/>
       } 
    </div>

    {collapsed?
     <Tree
     lineWidth={'1px'}
     lineColor={'black'}
     lineBorderRadius={'10px'}
     label={<StyledNode><Avatar size="large" icon={<UserOutlined />}/></StyledNode>}>

     <TreeNode label={<StyledNode><Avatar size="large" icon={<UserOutlined />}/></StyledNode>}>
             <TreeNode label={<StyledNode>Grand Child</StyledNode>} />
           </TreeNode>

           <TreeNode label={<StyledNode>
            <div className='expand'>
                <Avatar size="large" icon={<UserOutlined />}/>
                Owais Sheikh
                {childcollapse? <UpOutlined onClick={handlechildcollapseclose} />:
                    <DownOutlined onClick={handlechildcollapse}/>
                } 
             </div>
            
            </StyledNode>}>
              {childcollapse?
             <TreeNode label={<StyledNode>Grand Child</StyledNode>}>
               <TreeNode label={<StyledNode>Great Grand Child 1</StyledNode>} />
               <TreeNode label={<StyledNode>Great Grand Child 2</StyledNode>} />
             </TreeNode>:""
                         }
             </TreeNode>
            
           
            <TreeNode label={<StyledNode><Avatar size="large" icon={<UserOutlined />}/></StyledNode>}>
             <TreeNode label={<StyledNode>Grand Child 1</StyledNode>} />
             <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} />
    </TreeNode>
  </Tree>
    : <></>
    }


  </>)
}
export default Node;