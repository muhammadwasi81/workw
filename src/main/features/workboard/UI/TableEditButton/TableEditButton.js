import { Input } from "antd";
import React, { useState, useContext } from "react";
import EditButton from "./EditButton";
import {LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import {WorkBoardDictionary } from "../../localization/index";

function TableTodo(props) {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { WorkBoardDictionaryList, Direction } = WorkBoardDictionary[
    userLanguage
  ];
  const { labels, placeholder } = WorkBoardDictionaryList;
  const [text, setText] = useState(props.text || "");

  const { onSave, onCancel, onDelete, adding } = props;
  const handleChangeText = (event) => {
    setText(event.target.value);
  };
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      props.onSave(text);
    }
  };
  return (
    <div className="Edit-Card min-h-[50px] pl-[8px] pr-[15px]">
      <div className="Card">
        <Input
          autoFocus
          className="Edit-Card-Textarea w-full border-none outline-none text-base"
          placeholder="Enter the text for this card..."
          value={text}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        />
      </div>
      
      <EditButton
        handleSave={() => onSave(text)}
        saveLabel={adding ? labels.addCard : labels.save}
      />
    </div>
  );
}

export default TableTodo;
