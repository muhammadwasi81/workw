import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createGuid } from "../../../../../utils/base.js";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon/index.js";
import BreadCumbs from "../components/breadcumb/index.js";
import PreviewModal from "../components/modal/index.js";
import ShortCard from "../components/shortCard/index.js";
import DocSceleton from "../skeleton/index.js";
import './style.css';

const DocumentShortCards = (props) => {
  const breadCumbsState = useSelector(state => state.documentSlice.breadCumbPath);
  const loader = useSelector(state => state.documentSlice.listLoader);
  const [previewPath, setPreviewPath] = useState(false);
  const listData = useSelector(state => state.documentSlice.listData);

  const handlePreview = (item) => {
    setPreviewPath(item)
  }
  const handleClose = (item) => {
    setPreviewPath(null)
  }
  return (
    <>
      <BreadCumbs
        data={breadCumbsState}
      />
      <div className="d_AllShortCard" >
        <DocSceleton type="short" isActive={loader} />
        {
          listData.map((item, index) => (
            <ShortCard
              data={item}
              handlePreview={handlePreview}
              key={createGuid()}
            />
          ))
        }
        <PreviewModal
          previewItem={previewPath}
          handleClose={handleClose} />
      </div>
      {
        listData.length === 0 && !loader &&
        <NoDataFound />
      }
    </>
  );
};

export default DocumentShortCards;
