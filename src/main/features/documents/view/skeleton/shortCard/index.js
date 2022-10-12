import React from "react";
import './style.css';
import pdfIcon from '../../../../../../content/NewContent/Documents/file/PDF_DOC.svg';
import menuIcon from '../../../../../../content/NewContent/Documents/3dots.svg';
import favorateIcon from '../../../../../../content/NewContent/Documents/favorate.svg';
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";
import { Skeleton, Space } from "antd";

const SclknShortCard = ({
    icon,
    name,
    description
}) => {
    return (
        <div className="d_ShortCard" >
            <div className="d_ShortCard_Child1" >
                <img
                    alt=""
                    src={favorateIcon}
                />
                <img
                    alt=""
                    src={menuIcon}
                />
            </div>
            <div className="d_ShortCard_Child2">
                <Skeleton.Image active={true} block={true} className="ant-skeleton-active" />
            </div>
            <div className="d_ShortCard_Child3">
                <div></div>
                <div>
                    <Skeleton.Avatar active={true}className="ant-skeleton-active mb-2" size={"small"} />
                </div>
            </div>
        </div>
    );
};

export default SclknShortCard;
