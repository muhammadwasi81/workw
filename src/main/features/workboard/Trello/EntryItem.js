import React, { useEffect, useState, useContext } from "react";
import {Tag } from "antd";
import LabelModal from "../Modal/LabelModal/LabelModal";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";

import { updateWorkBoardTodoTitle,updateWorkBoardTodoDesc } from "../store/action";

const TableEntryItem = ({
  index,
  accounts,
  handleChange,
//   handleRemoveRow,
   itemValue,
}) => {

  console.log(itemValue,"todoDetailtodoDetailgggg");
  let defaultTitle = itemValue.title ;
  let defaultDesc = itemValue.description;
  const dispatch = useDispatch();
  const [titleValue,setTitle] = useState(defaultTitle);
  const [descValue,setDescValue] = useState(defaultDesc);
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

  // useEffect(() => {
  //   if (tilteDebounce) handleInputChangeTitle(tilteDebounce);
  // }, [tilteDebounce]);

  // useEffect(() => {
  //   if (descriptionDebounce) handleInputChangeDescription(descriptionDebounce);
  // }, [descriptionDebounce]);

  return (
    <>
    <tr>
      <td>
        <input
          name="title"
          defaultValue={titleValue}
          onChange={(e) => handleInputChangeTitle(e)}
        />
      </td>
      <td> 
        {itemValue.workBoardSection}
      </td>
      <td>
        <input
          name="description"
          defaultValue={descValue}
          onChange={(e)=>handleInputChangeDescription(e)}
        />
      </td>

      
      <td> 
      {itemValue.labels.map((label) =>
      <Tag color={label.colorCode} className="!h-5" onClick={() => showLabelModal()}/>
      )}
      </td>

      <td>
        {itemValue.createDate}
        {/* {moment((createDate)=>itemValue.createDate.format("DD MMM YYYY"))}  */}
      </td>
    </tr>

    <LabelModal
      showLabelModal={showLabelModal}
      isLabelModalVisible={isLabelModalVisible}
      todoDetail={itemValue}
   />
    </>
  );
};
export default TableEntryItem;
