import React from 'react';
import ZoomImage from '../ZoomImage/';
import { getNameForImage, STRINGS } from "../../../utils/base";
import { Badge } from 'antd';

export default function Avatar({ src, size, name, active , width, height, round, position, isZoom = true, id, style, counter }) {
    const handleRoute = () => {
        window.location.href = `${STRINGS.ROUTES.USER.TIMELINE.DEFAULT}/${id}`
    };

    try {
        return (
            <Badge count={counter}>
                <div onClick={id !== undefined ? handleRoute : null} className={`avatar ${round && 'round'}`} style={{
                    width: size !== undefined ? size : width,
                    minWidth: size !== undefined ? size : width,
                    height: size !== undefined ? size : height,
                    maxHeight: size !== undefined ? size : height,
                    position: position !== undefined ? 'inherit' : 'relative'
                }}>
                    {src ?
                        !isZoom ?
                            <ZoomImage comp={src} stl={`zoomImg`} />
                            : <img alt="#" src={src} style={style} />
                        : getNameForImage(name)}
                    {active && <div className="u-active-s" />}
                </div>
            </Badge>
        );
    } catch (e) {
        return (
            <div className={`avatar ${round ? 'round' : ''}`}
                style={{ width: width, minWidth: width, height: height, maxHeight: height }}>EX</div>
        )
    }
}
