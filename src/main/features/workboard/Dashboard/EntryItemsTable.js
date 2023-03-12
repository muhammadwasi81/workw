import React, { useEffect, useState, useContext } from "react";
import {Tag } from "antd";
import LabelModal from "../Modal/LabelModal/LabelModal";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";


import { updateWorkBoardTodoTitle,updateWorkBoardTodoDesc } from "../store/action";

const EntryItemTable = ({
  index,
  accounts,
  handleChange,
//   handleRemoveRow,
   itemValue,
}) => {

  console.log(itemValue.members,"todoDetailtodoDetailgggg");
  let date = itemValue.createDate;
 
  let defaultName = itemValue.name ;
  let defaultDesc = itemValue.description;

  console.log(defaultName,"defaultNamedefaultName");
  const dispatch = useDispatch();
  const [titleValue,setTitle] = useState(defaultName);
  const [descValue,setDescValue] = useState(defaultDesc);
  //const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);

  const tilteDebounce = useDebounce(titleValue, 500);
  const descriptionDebounce = useDebounce(descValue, 500);


    const handleInputChangeTitle = (e) => {
     
    //     dispatch(
    //     updateWorkBoardTodoTitle({
    //     todoId: itemValue.id,
    //     title: value,
    //   })
    //  );
    }

  const handleInputChangeDescription = (e) => {

      console.log(descValue,"mytitleValue");
    //     dispatch(
    //         updateWorkBoardTodoDesc({
    //            todoId: itemValue.id, 
    //            description:value,
    //     })
    //  );
  };

  useEffect(() => {
    if (tilteDebounce) handleInputChangeTitle(tilteDebounce);
  }, [tilteDebounce]);

  useEffect(() => {
    if (descriptionDebounce) handleInputChangeDescription(descriptionDebounce);
  }, [descriptionDebounce]);


  return (
    <>
    <tr>
      <td>
        <input
          name="name"
          defaultValue={titleValue}
         // value={titleValue}
          onChange={(e) => setTitle(e.target.value)}
        />
      </td>
      <td>
        <input
          name="description"
          defaultValue={descValue}
          onChange={(e)=> setDescValue(e.target.value)}
        />
      </td>

      <td>
        <Avatar membersData={itemValue.members} heading={"Members"} />
      </td> 
      
      <td>
      {moment(date).format("DD MMM YYYY")}
      </td>
    </tr>
    </>
  );
};
export default EntryItemTable;
