import React, { useEffect, useState, useContext } from "react";
import {Tag } from "antd";
import LabelModal from "../Modal/LabelModal/LabelModal";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import moment from "moment";

import { updateWorkBoardTodoTitle,updateWorkBoardTodoDesc } from "../store/action";

const TableEntryItem = ({
  index,
  accounts,
  handleChange,
//   handleRemoveRow,
   itemValue,
}) => {

 
  let defaultTitle = itemValue.title ;
  let defaultDesc = itemValue.description;
  let date = itemValue.createDate;

  console.log(date,"todoDetailtodoDetailgggg");
  const dispatch = useDispatch();
  const [titleValue,setTitle] = useState(defaultTitle);
  const [descValue,setDescValue] = useState(defaultDesc);
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);
  const tilteDebounce = useDebounce(titleValue, 500);
  const descriptionDebounce = useDebounce(descValue, 500);

  const showLabelModal = () => {
    setIsLabelModalVisible(!isLabelModalVisible);
    };

    const handleInputChangeTitle = (value) => {
        dispatch(
        updateWorkBoardTodoTitle({
        todoId: itemValue.id,
        title: value,
      })
     );
    }

  const handleInputChangeDescription = (value) => {
        dispatch(
            updateWorkBoardTodoDesc({
               todoId: itemValue.id, 
               description:value,
        })
     );
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
          defaultValue={titleValue}
          onChange={(e) => setTitle(e.target.value)}
        />
      </td>
      <td> 
        {itemValue.workBoardSection}
      </td>
      <td>
        <input
          value={descValue}
          onChange={(e)=> setDescValue(e.target.value)}
        />
      </td>

      
       <td> 
          {itemValue.labels.map((label) =>
          <Tag color={label.colorCode} className="!h-5" onClick={() => showLabelModal()}/>
          )}
       </td>

      <td>
        {moment(date).format("DD MMM YYYY")}
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
