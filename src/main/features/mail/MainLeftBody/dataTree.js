import React from "react";
import {Tree} from 'antd';
import MenuItem from "./MenuItem";
import {STRINGS} from "../../../../utils/base";

const {TreeNode} = Tree;

const Demo = ({mailFolderItem, menuLabel}) => {

    const renderTreeNodes = data =>
        data?.map(({name, subFolders, folderPath, unseen}) => {
            if (subFolders) {
                return (
                    <TreeNode
                        key={folderPath}
                        dataRef={folderPath}
                        isLeaf={(subFolders.length === 0)}
                        title={
                            <MenuItem
                                key={folderPath}
                                path={`${STRINGS.ROUTES.MAIL.DEFAULT}/${folderPath}`}
                                pathName={folderPath}
                                name={name}
                                badgeCount={unseen}
                                onChange={() => {
                                }}/>

                        }>
                        {renderTreeNodes(subFolders)}
                    </TreeNode>
                )
            }
            return <TreeNode
                key={folderPath}
                selectable={false}
                title={
                    <MenuItem
                        key={folderPath}
                        path={`${STRINGS.ROUTES.MAIL.DEFAULT}/${folderPath}`}
                        pathName={folderPath}
                        name={name}
                        badgeCount={unseen}
                        onChange={() => {
                        }}
                    />

                }/>
        })

    return (
        <Tree
            draggable
            blockNode
        >
            {renderTreeNodes(mailFolderItem && mailFolderItem[0] && mailFolderItem[0]?.subFolders)}
        </Tree>
    );
}
export default Demo;