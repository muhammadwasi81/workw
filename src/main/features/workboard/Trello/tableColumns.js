import { Tag } from "antd";
import moment from "moment";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import { EditFilled } from "@ant-design/icons";
// import Avatar from "../../../../../../../sharedComponents/Avatar/avatar";

// import TagAvatar from "../../../../../sharedComponents/Avatar/TagAvatar";
// import StatusTag from "../../../../../sharedComponents/Tag/StatusTag";
import TodoTitleInput from "../UI/TodoTitleInput";


// const handleInputChange = (e) => {
//   handleChange(e.target.value, e.target.name, index);
// };
const Edit = (row,todoData) => {
  console.log(row,"rowwwclickeddd")
  return(
   <p
			onClick={e => 
          <TodoTitleInput
            title={todoData && todoData.title}
            id={todoData && todoData.id}
            sectionId={todoData && todoData.sectionId}
         />
        
        //handleEdit(row)
      }
    />
    
  
  );
};

export const sectionTableColumn = (todoData,onRow,WorkBoardDictionaryList) => {
  return [
    {
      title: WorkBoardDictionaryList.labels.title,
      dataIndex: "title",
      ellipsis: true,
      sort: true,
      className:"tablerow",
      // render: (_, row) => {
      //   //console.log(row,"onActionClickonActionClick");
      //   		return Edit(row,todoData);
      //   	},
    },
    {
      title: WorkBoardDictionaryList.labels.section,
      dataIndex: "workBoardSection",
      ellipsis: true,
      sort: true,
      render:(event) =>{
        return(
          <input
            name="workBoardSection"
            onChange={(value)=>console.log(value,"jjjjjj")}
           // value={value.section}
        />
          )
      }
    },
    {
      title: WorkBoardDictionaryList.labels.description,
      dataIndex: "description",
      ellipsis: true,
      sort: true,
    },

    {
      title: WorkBoardDictionaryList.labels.labels,
      dataIndex: "labels",
      ellipsis: true,
      render: (labels) =>
        labels.map((label) => <Tag color={label.colorCode} className="!h-5" />),
    },
    {
      title: WorkBoardDictionaryList.labels.createdDate,
      dataIndex: "createDate",
      render: (createDate) => moment(createDate).format("DD MMM YYYY"),
      ellipsis: true,
      sort: true,
    },
  ];
};
