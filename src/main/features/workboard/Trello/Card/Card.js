import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  addListCardMembers,
  changeListCardText,
  deleteListCard,
  handleCardDetail,
  openMembersModal,
  openSectionDetail,
} from "../../store/slice";
import CardEditor from "./CardEditor";
import "./card.css";

import EditDropDown from "../MenuDropDown/EditDropDown";
import MemberModal from "../../Modal/MemberModal";
import EditMembers from "../EditMembers/EditMembers";
import CardDetailModal from "../Modal/CardDetailModal";
import { EyeOutlined } from "@ant-design/icons";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import CheckDate from "../../UI/CheckDate";
import DateModal from "../../Modal/DateModal";
import {
  getWorkBoardTodoById,
  updateWorkBoardTodoTitle,
} from "../../store/action";

function Card(props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const { sectionId, id, index, text: todoText, members, todoData } = props;
  const dispatch = useDispatch();

  const startEditing = () => {
    setEditing(true);
    setText(text);
  };

  const endEditing = () => {
    setEditing(false);
  };

  const editCard = async (text) => {
    endEditing();
    dispatch(updateWorkBoardTodoTitle({ todoId: id, title: text }));
  };

  const deleteCard = async () => {
    if (window.confirm("Are you sure to delete this card?")) {
    }
  };
  const openDetail = () => {
    dispatch(getWorkBoardTodoById(id));
  };

  // console.log("todoData", todoData);

  if (!editing) {
    return (
      <>
        <Draggable draggableId={id} index={index}>
          {(provided, _snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="Card items-center relative bg-white m-[5px] p-[5px] rounded-sm border shadow-sm text-sm break-words m-h[18px] !cursor-pointer"
              // onClick={(e) => {
              //   openDetail(); 
              // }}
             >
              <div className="flex mb-3 group">
                <div
                  className="w-full flex flex-col group"
                  onClick={(e) => {
                    openDetail();
                  }}
                 >
                  {todoText}
                  {todoData && todoData.image && (
                    <img
                      src={todoData && todoData.image}
                      alt=""
                      className="pt-2"
                    />
                  )}

                  {todoData && todoData.labels && todoData.labels.length > 0 && (
                    <div className="flex gap-1 mt-2 w-fit hover:brightness-75 flex-wrap">
                      {todoData.labels.map((label) => (
                        <span
                          style={{
                            background: label.colorCode,
                          }}
                          className="w-[40px] h-[8px] rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <EditDropDown
                  className={"edit-icon"}
                   startEditing={startEditing}
                   // deleteList={deleteList}
                   sectionId={sectionId}
                   todoId={id}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {todoData && todoData.dueDate && todoData.dueDate.length > 0 && (
                    // <div>{todoData.dueDate}</div>
                    <CheckDate isOutsideRender={true} todoData={todoData} />
                  )}
                </div>
                {members && members.length > 0 && (
                  <div className="flex">
                    {members.map((mem) => (
                      <Avatar
                        name={mem.name}
                        src={mem.image}
                        round={true}
                        width={"30px"}
                        height={"30px"}
                        isZoom={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </Draggable>
      </>
    );
  }

  return (
    <CardEditor
      text={todoText}
      onSave={editCard}
      onDelete={deleteCard}
      onCancel={endEditing}
    />
  );
}

export default Card;
