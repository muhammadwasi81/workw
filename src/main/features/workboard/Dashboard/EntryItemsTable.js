import React, { useEffect, useState, useContext } from "react";
import {Tag } from "antd";
import LabelModal from "../Modal/LabelModal/LabelModal";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import Avatar from "../../../sharedComponents/Avatar/avatar";


import { updateWorkBoardTodoTitle,updateWorkBoardTodoDesc } from "../store/action";

const EntryItemTable = ({
  index,
  accounts,
  handleChange,
//   handleRemoveRow,
   itemValue,
}) => {

  console.log(itemValue,"todoDetailtodoDetailgggg");
 
  const dispatch = useDispatch();
  const [titleValue,setTitle] = useState();
  const [descValue,setDescValue] = useState();
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);

  const tilteDebounce = useDebounce(titleValue, 500);
  const descriptionDebounce = useDebounce(descValue, 500);

  const showLabelModal = () => {
    setIsLabelModalVisible(!isLabelModalVisible);
    };

    const handleInputChangeTitle = (e) => {
      const {value} = e.target;
      setTitle({...titleValue,[value]:value});
     
        dispatch(
        updateWorkBoardTodoTitle({
        todoId: itemValue.id,
        title: value,
      })
     );
    }

  const handleInputChangeDescription = (e) => {
    const {value} = e.target;
      console.log( value, 'name value')
      setDescValue({...descValue, [value]: value})

        dispatch(
            updateWorkBoardTodoDesc({
               todoId: itemValue.id, 
               description:value,
        })
     );
  };


  return (
    <>
    <tr>
      <td>
        <input
          name="name"
          value={itemValue.name}
          //onChange={(e) => handleInputChangeTitle(e)}
        />
      </td>
      <td>
        <input
          name="description"
           value={itemValue.description}
          //onChange={(e)=>handleInputChangeDescription(e)}
        />
      </td>

      
      <td> 
      {/* {itemValue.members.map((member) =>
      <Avatar membersData={member} heading={"Members"} />
      )} */}
      </td>

      <td>
        {/* {itemValue.createDate} */}
        {/* {moment((createDate)=>itemValue.createDate.format("DD MMM YYYY"))}  */}
      </td>
    </tr>
    </>
  );
};
export default EntryItemTable;
