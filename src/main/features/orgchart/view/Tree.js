import React from 'react';
import { Avatar, Space } from 'antd';
import { Tree, TreeNode } from 'react-organizational-chart';
import { UserOutlined,DownOutlined,UpOutlined} from '@ant-design/icons';

import styled from "styled-components";

const StyledNode = styled.div`
 
`;

function TreeNodes() {
  return (
    
    <Tree
      lineWidth={'1px'}
      lineColor={'black'}
      lineBorderRadius={'10px'}
      label={<StyledNode><Avatar size="large" icon={<UserOutlined />}/></StyledNode>}>

      <TreeNode label={<StyledNode><Avatar size="large" icon={<UserOutlined />}/></StyledNode>}>
              <TreeNode label={<StyledNode>Grand Child</StyledNode>} />
            </TreeNode>

            <TreeNode label={<StyledNode><Avatar size="large" icon={<UserOutlined />}/></StyledNode>}>
              <TreeNode label={<StyledNode>Grand Child</StyledNode>}>
                <TreeNode label={<StyledNode>Great Grand Child 1</StyledNode>} />
                <TreeNode label={<StyledNode>Great Grand Child 2</StyledNode>} />
              </TreeNode>
            </TreeNode>

            <TreeNode label={<StyledNode><Avatar size="large" icon={<UserOutlined />}/></StyledNode>}>
              <TreeNode label={<StyledNode>Grand Child 1</StyledNode>} />
              <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} />
     </TreeNode>
   </Tree>
  )
}

export default TreeNodes