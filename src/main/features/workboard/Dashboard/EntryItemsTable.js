import React, { useEffect, useState, useContext } from "react";
import {Tag } from "antd";
import LabelModal from "../Modal/LabelModal/LabelModal";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import Avatar from "../../../sharedComponents/Avatar/avatar";
import moment from "moment";
import { jsonToFormData } from "../../../../utils/base";
import { updateWorkBoardTodoDesc, updateWorkBoard } from "../store/action";


const EntryItemTable = ({
  index,
  accounts,
  handleChange,
   itemValue,
}) => {

  console.log(itemValue.id,"todoDetailtodoDetailgggg");
  let date = itemValue.createDate;

  const dispatch = useDispatch();
  const [titleValue,setTitle] = useState("");
  const [descValue,setDescValue] = useState("");

  const tilteDebounce = useDebounce(titleValue, 500);
  const descriptionDebounce = useDebounce(descValue, 500);

  useEffect(() => {
    if (tilteDebounce) handleInputChangeTitle(tilteDebounce);
  }, [tilteDebounce]);
    const handleInputChangeTitle = (title) => {
      console.log(title,"titlee");
      const payloadData = {
        id: itemValue.id,

        name : title,
        description:itemValue.description,
      }
      let tempObj = jsonToFormData(payloadData)

      //console.log("payload data",tempObj);
        dispatch(updateWorkBoard(tempObj))
    }
    
    useEffect(() => {
      if (descriptionDebounce) handleInputChangeDescription(descriptionDebounce);
    }, [descriptionDebounce]);
  
  const handleInputChangeDescription = (description) => {
    console.log(description,"description");
    const payloadData = {
      id: itemValue.id,
      name:itemValue.name,
      description : description,
    }
      let tempObj = jsonToFormData(payloadData)
        dispatch(updateWorkBoard((tempObj)));
  };

 
  

  return (
    <>
    <tr>
      <td>
        <input
          defaultValue={itemValue.name}
          onChange={(e) =>setTitle(e.target.value)}
        />
      </td>
      <td>
        <input
       
          defaultValue={itemValue.description}
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
