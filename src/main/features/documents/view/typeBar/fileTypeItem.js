import React from "react";

const FileTypeItem = ({
    icon,
    name,
    description
}) => {
    return (
        <div className="fileTypeItem" >
            <div className="" >
                <div>
                    <img
                        alt=""
                        src={icon}
                    />
                </div>
                <div>
                    {name}
                </div>
            </div>
            <div className="desc" >
                <div>{description}</div>
            </div>
        </div>
    );
};

export default FileTypeItem;
