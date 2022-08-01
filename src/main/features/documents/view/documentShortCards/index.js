import React, { useState } from "react";
import { useSelector } from "react-redux";
import BreadCumbs from "../components/breadcumb/index.js";
import PreviewModal from "../components/modal/index.js";
import ShortCard from "../components/shortCard/index.js";
import DocSceleton from "../skeleton/index.js";
import './style.css';

const DocumentShortCards = (props) => {
  const breadCumbsState = useSelector(state => state.documentSlice.breadCumbPath);
  // const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [previewPath, setPreviewPath] = useState(false);
  const handlePreview = (item) => {
    setPreviewPath(item)
  }
  const handleClose = (item) => {
    setPreviewPath(null)
  }
  return (
    <>
      {/* <DocSceleton /> */}
      <BreadCumbs
        data={breadCumbsState}
      />
      <div className="d_AllShortCard" >
        {
          props.data.map((item) => (
            <ShortCard
              data={item}
              handlePreview={handlePreview}
            />
          ))
        }
        <PreviewModal
         previewItem={previewPath}
         handleClose={handleClose} />
         {/* {
          previewPath &&  <iframe src={previewPath?.path} title="description"
          width='500px'
          height='500px' frameBorder='0'></iframe>
         } */}
      </div>
    </>
  );
};

export default DocumentShortCards;
