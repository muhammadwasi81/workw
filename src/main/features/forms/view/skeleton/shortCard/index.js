import React from "react";
import './style.css';
import pdfIcon from '../../../../../../content/NewContent/Documents/file/PDF_DOC.svg';
import menuIcon from '../../../../../../content/NewContent/Documents/3dots.svg';
import favorateIcon from '../../../../../../content/NewContent/Documents/favorate.svg';
import Avatar from "../../../../../sharedComponents/Avatar/avatarOLD";

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
                <img
                    alt=""
                    src={pdfIcon}
                />
            </div>
            <div className="d_ShortCard_Child3">
                <div></div>
                <div>
                    <Avatar
                        src={
                            "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg"
                        }
                        name={""}
                        size={20}
                        round={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default SclknShortCard;
