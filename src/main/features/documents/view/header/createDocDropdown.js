import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { documentDictionaryList } from "../../localization/index";
import milepadIcon from "../../../../../content/NewContent/Documents/file/milepad.svg";
import milegridIcon from "../../../../../content/NewContent/Documents/file/milegrid.svg";
import mileboardIcon from "../../../../../content/NewContent/Documents/file/mileboard.svg";
import mileshowIcon from "../../../../../content/NewContent/Documents/file/mileshow.svg";
import documentIcon from "../../../../../content/NewContent/Documents/file/document.svg";
import folderIcon from "../../../../../content/NewContent/Documents/file/folder.svg";
import { Button, Dropdown, Menu } from "antd";
import { useDispatch } from "react-redux";
import { handleOpenDocComposer } from "../../store/slice";

const CreateDocDropdown = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { documentDictionary } = documentDictionaryList[userLanguage];
  const dispatch = useDispatch();
  const handleChange = (value) => {
    let { key } = value;
    dispatch(handleOpenDocComposer(key));
  };
  const CreateOptions = [
    {
      label: documentDictionary.NewFolder,
      key: "folder",
      icon: <img width="17px" alt="" src={folderIcon} />,
      onClick: handleChange,
    },
    {
      label: documentDictionary.UploadDocuments,
      key: "upload",
      icon: <img width="17px" alt="" src={documentIcon} />,
      onClick: handleChange,
    },
    {
      label: documentDictionary.AddMileBoard,
      key: "mileboard",
      icon: <img width="17px" alt="" src={mileboardIcon} />,
      onClick: handleChange,
    },
    {
      label: documentDictionary.AddMilePad,
      key: "milepad",
      icon: <img width="17px" alt="" src={milepadIcon} />,
      onClick: handleChange,
    },
    {
      label: documentDictionary.AddMileGrid,
      key: "milegrid",
      icon: <img width="17px" alt="" src={milegridIcon} />,
      onClick: handleChange,
    },
    {
      label: documentDictionary.AddMileShow,
      key: "mileshow",
      icon: <img width="17px" alt="" src={mileshowIcon} />,
      onClick: handleChange,
    },
  ];
  return (
    <Dropdown
      overlay={<Menu items={CreateOptions} onChange={(e) => console.log(e)} />}
      trigger={["click"]}
    >
      <Button className="headerBtn">{documentDictionary.CreateDocument}</Button>
    </Dropdown>
  );
};

export default CreateDocDropdown;
