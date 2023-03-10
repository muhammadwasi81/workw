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
  const defaultValue = {
    title: itemValue.title,
    description: itemValue.description,
  };


  const dispatch = useDispatch();
  //const [uservalue,setUservalue] = useState(defaultValue);
  const [titleValue,setTitle] = useState(defaultValue);
  const [descValue,setDescValue] = useState(defaultValue);
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);
  const tilteDebounce = useDebounce(titleValue, 500);
  const descriptionDebounce = useDebounce(descValue, 500);

  const showLabelModal = () => {
    setIsLabelModalVisible(!isLabelModalVisible);
    };

    const handleInputChangeTitle = (e) => {
      const {value} = e.target;
      console.log( value, 'name value')
      setTitle({...titleValue, [value]: value})

    //     dispatch(
    //     updateWorkBoardTodoTitle({
    //     todoId: itemValue.id,
    //     title: titleValue,
    //   })
    //  );
    }
  // const handleInputChangeTitle = (e) => {

  //   const {value} = e.target
  //   console.log( value, 'name value')
  //   setTitle({...titleValue, [value]: value})
    // console.log(e.target.value, 'easasasasasa')
    // let tempvalue = e.target.value;
    // console.log("kkkk",tempvalue);
    //  setTitle(e.target.value)
  //   dispatch(
  //     updateWorkBoardTodoTitle({
  //       todoId: itemValue.id,
  //       title: titleValue.title,
  //       sectionId:itemValue.sectionId,
  //     })
  //    );
  // };

  const handleInputChangeDescription = (e) => {

    const {value} = e.target;
      console.log( value, 'name value')
      setDescValue({...descValue, [value]: value})

    //     dispatch(
    //         updateWorkBoardTodoDesc({
    //            todoId: itemValue.id, 
    //            description:descValue,
    //     })
    //  );
    // let tempvalue = e.target.value;
    // console.log(tempvalue,"kkkk");
    // setDescValue({ ...descValue, description:tempvalue})
    // dispatch(
    //   updateWorkBoardTodoDesc({
    //      todoId: itemValue.id, 
    //      description:descValue.description,
    //     })
    //     );
  };

  // useEffect(() => {
  //   if (tilteDebounce) handleInputChangeTitle(tilteDebounce);
  // }, []);

  // useEffect(() => {
  //   if (descriptionDebounce) handleInputChangeDescription(descriptionDebounce);
  // }, []);

  return (
    <>
    <tr>
      <td>
        <input
          name="title"
          defaultValue={titleValue.title}
          onChange={(e) => handleInputChangeTitle(e)}
        />
      </td>
      <td>
        <input
          className="w-full"
          name="workBoardSection"
          value={itemValue.workBoardSection}
        
        />
      </td>
      <td>
        <input
          name="description"
          //value={descValue.description}
          defaultValue={descValue.description}
          onChange={(e)=>handleInputChangeDescription(e)}
        />
      </td>

      
      <td
        //onChange={handleInputChange}
       > 
      {itemValue.labels.map((label) => <Tag color={label.colorCode} className="!h-5" onClick={() => showLabelModal()}/>)}
      </td>

      <td
        //onChange={handleInputChange}
       >
        {/* {moment((createDate)=>createDate.format("DD MMM YYYY"))}  */}
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
