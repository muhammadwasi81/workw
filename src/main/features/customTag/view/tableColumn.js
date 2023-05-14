import { DeleteFilled, EditFilled ,PlusOutlined,PlusCircleFilled } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { Popconfirm,Tooltip} from 'antd';
import React,{useContext, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../../sharedComponents/customTable";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
const Edit = (handleEdit, row, setClearButton) => {
  // const { userLanguage } = useContext(LanguageChangeContext);
	// const { administration, sharedLabels, Direction } =
	// 	dictionaryList[userLanguage];
	// 	console.log("jkjll",administration.grade.Grade);
  return (
    <EditFilled
      style={{ color: '#1b5669' }}
      onClick={(e) => {
        handleEdit({
          id: row.id,
          name: row.name,
          description: row.description,
        });
        setClearButton(true);
      }}
    />
  );
};
const Delete = (handleDelete, row) => {
  return (
    <Popconfirm
      title="Sure to delete?"
      onConfirm={(e) => handleDelete({ id: row.id })}
    >
      <DeleteFilled style={{ color: '#1b5669' }} />
    </Popconfirm>
  );
};
export const tableColumn  = (
  handelState,
  grade,
  handleEdit,
  handleDelete,
  removeButtons = false,
  rights,
  id,
  setClearButton,
  sharedLabels,
  setrecordData,
  setselectedRecord,
  selectedRecord,
) => {
  return [
    { title:"Name", dataIndex:'name', width: '20%', key: 1 },
    { title: "Description", dataIndex: 'description', width: '30%', key: 2 },
    {
      title: "Members",
      dataIndex: 'members',
      width: '30%',
      render: (members,record) => {
       // console.log(record,"recordrecord");
        return (
          <div className="flex gap-2 items-center">
            <Avatar heading="Members" membersData={members || []} />
            <Tooltip title="Add Members">
            <PlusCircleFilled
              className="!text-[20px] !cursor-pointer !text-primary-color"
              onClick={()=>{
                handelState()
                setrecordData(record)  
                }}/>
          
            </Tooltip>
          </div>
        );
      },
      // ellipsis: true,
    },
    removeButtons
      ? {}
      : {
          align: 'right',
          key: 3,
          render: (_, row) => {
            if (id && row.id === id) return <LoadingOutlined key={row} />;
            if (rights.length <= 0) return;
            if (rights.includes(1) && rights.includes(2))
              return (
                <>
                  {Edit(handleEdit, row, setClearButton)}{' '}
                  {Delete(handleDelete, row)}
                </>
              );
            if (rights.includes(1)) return Edit(handleEdit, row);
            if (rights.includes(2)) return Delete(handleDelete, row);
          },
        },
  ];
};