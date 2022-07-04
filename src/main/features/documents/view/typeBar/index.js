import React from "react";
import FileTypeItem from "./fileTypeItem";
import {fileTypes} from "../../constant/index";
import './style.css';

const TypeBar = () => {
  return (
    <div className="fileTypeCont" >
     {
       fileTypes.map(({title, description, icon})=>(
         <FileTypeItem 
         name={title}
         description={description}
         icon={icon}
         />
       ))
     }
    </div>
  );
};

export default TypeBar;
