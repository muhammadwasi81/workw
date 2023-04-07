import React, { useState } from "react";
import ZoomImage from "../ZoomImage";
import { getNameForImage, STRINGS } from "../../../utils/base";
import { Badge } from "antd";
import propTypes from "prop-types";

export default function Avatar({
  src = "",
  size,
  name = "",
  active,
  width,
  height,
  round,
  position,
  isZoom = true,
  id,
  userId,
  style,
  status,
  customClass,
}) {
  const handleRoute = () => {
    window.location.href = `${STRINGS.ROUTES.USER.TIMELINE.DEFAULT}/${id}`;
  };

  let profileId = userId
  console.log(profileId, "PROFILE ID")


  function color(val) {
    if (val === 0) {
      return 'gray'
    }
    if ( val === 1 ) {
      return 'green'
    } 
    if ( val === 2 ) {
      return 'yellow'
    } 
    if ( val === 3 ) {
      return 'blue'
    } 
    if ( val === 4 ) {
      return 'black'
    } 
    if ( val === 5 ) {
      return 'pink'
    }
  } 

  try {
    return (
      <Badge 
        className='statusIcon'
        dot={true}
        color={color(status)}
      >
        <div
          onClick={id !== undefined ? handleRoute : null}
          className={`avatar ${round && "round"} ${customClass}`}
          style={{
            width: size !== undefined ? size : width,
            minWidth: size !== undefined ? size : width,
            height: size !== undefined ? size : height,
            maxHeight: size !== undefined ? size : height,
            position: position !== undefined ? "inherit" : "relative",
          }}
        >
          {src ? (
            !isZoom ? (
              <ZoomImage comp={src} stl={`zoomImg`} />
            ) : (
              <img alt="#" src={src} style={style} className="object-cover" />
            )
          ) : (
            getNameForImage(name)
          )}

          {active && <div className="u-active-s" />}
        </div>
      </Badge>
    );
  } catch (e) {
    return (
      <div
        className={`avatar ${round ? "round" : ""}`}
        style={{
          width: width,
          minWidth: width,
          height: height,
          maxHeight: height,
        }}
      >
        EX
      </div>
    );
  }
}

Avatar.propTypes = {
  src: propTypes.string,
  size: propTypes.number,
  name: propTypes.string,
  active: propTypes.bool,
  width: propTypes.number,
  height: propTypes.number,
  round: propTypes.bool,
  position: propTypes.string,
  isZoom: propTypes.bool,
  id: propTypes.string,
  style: propTypes.object,
  counter: propTypes.number,
  customClass: propTypes.string,
};
