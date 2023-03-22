import React from "react";
import { useSelector } from "react-redux";
import MinimizedItem from "./minimizedItem";
import './style.css';

function MinimizedDocuments() {
    const documents = useSelector((state) => state.documentSlice.minimzedDocuments);
    return (
        <div className="minimized-document-container" >
            {
                documents.map((item)=>{
                    return(
                        <MinimizedItem item={item} />
                    )
                })
            }
        </div>
    )
}
export default MinimizedDocuments;