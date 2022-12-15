import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CardWrapper } from "../../../../layout/GridStyle.js";
import { NoDataFound } from "../../../../sharedComponents/NoDataIcon/index.js";
import BreadCumbs from "../components/breadcumb/index.js";
import DetailCard from "../components/detailCard/index.js";
import DocFullCard from "../components/fullCard/index.js";
import PreviewModal from "../components/modal/index.js";
import ShortCard from "../components/shortCard/index.js";
import DetailedView from "../documentDetailView/index.js";
import DocSceleton from "../skeleton/index.js";
import './style.css';

const DocumentDetailCards = (props) => {
  const [detailId, setDetailId] = useState(false);
  const breadCumbsState = useSelector(state => state.documentSlice.breadCumbPath);
  const loader = useSelector(state => state.documentSlice.listLoader);
  const [previewPath, setPreviewPath] = useState(false);

  const handlePreview = (item) => {
    setPreviewPath(item)
  }
  const handleClose = (item) => {
    setPreviewPath(null)
  }
  const onClose = () => {
    setDetailId(null);
  };
  return (
    <>
      {/* <DocSceleton /> */}
      <CardWrapper>
        {
          props.data.map((item, index) => (
            <DocFullCard 
            data={item} 
            handleClickCard={(id) => setDetailId(id)} 
            handlePreview={handlePreview} />
          ))
        }
      </CardWrapper>
      {
        props.data.length === 0 && !loader &&
        <NoDataFound />
      }
      <DetailedView onClose={onClose} id={detailId} />
      <PreviewModal
          previewItem={previewPath}
          handleClose={handleClose} />
    </>
  );
};

export default DocumentDetailCards;