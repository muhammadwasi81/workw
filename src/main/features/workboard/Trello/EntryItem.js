import React, { useEffect, useState, useContext } from "react";
import { Tag } from "antd";
import LabelModal from "../Modal/LabelModal/LabelModal";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../../../../utils/Shared/helper/use-debounce";
import moment from "moment";

import {
  updateWorkBoardTodoTitle,
  updateWorkBoardTodoDesc,
} from "../store/action";

const TableEntryItem = ({ index, accounts, handleChange, itemValue }) => {
  let date = itemValue.createDate;

  console.log(itemValue, "itemValue");
  const dispatch = useDispatch();
  const [titleValue, setTitle] = useState("");
  const [descValue, setDescValue] = useState("");
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);
  const tilteDebounce = useDebounce(titleValue, 500);
  const descriptionDebounce = useDebounce(descValue, 500);

  const showLabelModal = () => {
    setIsLabelModalVisible(!isLabelModalVisible);
  };

  useEffect(() => {
    if (tilteDebounce) handleInputChangeTitle(tilteDebounce);
  }, [tilteDebounce]);

  const handleInputChangeTitle = (title) => {
    dispatch(
      updateWorkBoardTodoTitle({
        todoId: itemValue.id,
        title: titleValue,
      })
    );
  };

  useEffect(() => {
    if (descriptionDebounce) handleInputChangeDescription(descriptionDebounce);
  }, [descriptionDebounce]);

  const handleInputChangeDescription = (description) => {
    dispatch(
      updateWorkBoardTodoDesc({
        todoId: itemValue.id,
        description: descValue,
      })
    );
  };

  return (
    <>
      <tr>
        <td>
          <input
            defaultValue={itemValue.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </td>
        <td>{itemValue.workBoardSection}</td>
        <td>
          <input
            defaultValue={itemValue.description}
            onChange={(e) => setDescValue(e.target.value)}
          />
        </td>

        <td>
          {itemValue.labels.map((label) => (
            <Tag
              color={label.colorCode}
              className="!h-5"
              onClick={() => showLabelModal()}
            />
          ))}
        </td>

        <td>{moment(date).format("DD MMM YYYY")}</td>
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
