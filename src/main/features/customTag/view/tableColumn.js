import { DeleteFilled, EditFilled ,PlusOutlined,PlusCircleFilled } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { Popconfirm,Tooltip} from 'antd';
import React,{useContext} from "react"
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../../../sharedComponents/Avatar/avatar";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../utils/localization/languages";
export const tableColumn = (
  //sections,
  handleModal,
  //userLanguage,
  //handleSelectedMembers
) => {
  // const { userLanguage } = useContext(LanguageChangeContext);
  // const { LeadManagerDictionaryList, Direction } = LeadManagerDictionary[
  //   userLanguage
  // ];
  //const { table } = LeadManagerDictionaryList;
  return [
    { title:"Name", dataIndex: 'name', width: '10%', key: 1 },
    { title:"Description", dataIndex: 'description', width: '10%', key: 2 },
    {
      title: "Members",
      dataIndex: ['members'],
      width: 20,
      render: (members, { id }, index) => {
        return (
          <div className="flex gap-2 items-center">
            <Avatar heading="Members" membersData={members || []} />
            <Tooltip title="Add Members">
              <PlusCircleFilled
                className="!text-[20px] !cursor-pointer !text-primary-color "
                onClick={() => handleModal(id)}
                 
                //onClick={handleModal}
                // onClick={(e) => {
                //   e.stopPropagation();
                //   e.preventDefault();
                //   handleModal();
                //   //handleSelectedMembers('', members);
                // }}
              />
            </Tooltip>
          </div>
        );
      },
      // ellipsis: true,
    },
  ];
};
