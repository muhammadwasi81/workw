import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { closeFullImage } from "../../../store/appReducer/newStickySlice";
import classes from "./OpenImage.module.css";

const OpenImage = () => {
  const openImgSrc = useSelector((state) => state.newStickySlice.openImageSrc);

  const dispatch = useDispatch();

  const closeImg = () => {
    dispatch(closeFullImage());
  };

  return (
    <div className={classes.imageContainer}>
      <div className={classes.icon} onClick={closeImg}>
        <AiOutlineClose />
      </div>
      <img src={openImgSrc} alt="openImg-icon" />
    </div>
  );
};

export default OpenImage;
